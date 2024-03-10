import { headers } from 'next/headers';
import Merchant from '~/app/api/merchant/logic';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import DatauriParser from 'datauri/parser';
import User from '~/app/api/user/logic';
import { Transaction } from './payment/transaction';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default class Util {
  public static getSubdomain = (url: string) => {
    const strToCompare = url
      .replace('www.', '')
      .replace('https://', '')
      .replace('http://', '');
    const baseUrl = `.${process.env.BASE_URL ?? ''}`;
    const urlParts = strToCompare.split(baseUrl);
    return urlParts[0]!;
  };

  public static getRouteType() {
    const headersList = headers();
    const hostname = headersList.get('host');
    let slug = Util.getSubdomain(hostname ?? '')!;

    const adminSlug = process.env.ADMIN_SLUG ?? '';
    const slugParts = slug.split('.');
    if (slugParts.length === 2 && slugParts[0] === adminSlug) {
      slug = slugParts[1]!;
      return { isAdminLogin: true, slug };
    }
    return { isAdminLogin: false, slug };
  }

  public static getMerchantDataBySubdomain = async () => {
    const { isAdminLogin, slug } = Util.getRouteType();

    const merchant = new Merchant();
    const merchantData = await merchant.getOne({ slug });
    return { isAdminLogin, merchantData, slug };
  };

  public static shuffleArray<T>(array: T[]): T[] {
    // Filter out undefined elements from the original array
    const filteredArray = array.filter((item): item is T => item !== undefined);

    // Create a copy of the filtered array
    const shuffledArray = filteredArray.slice();

    // Fisher-Yates algorithm for shuffling
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const jj = shuffledArray[j] as T;
      const ii = shuffledArray[i] as T;

      [shuffledArray[i] as T, shuffledArray[j] as T] = [jj, ii];
    }

    return shuffledArray;
  }

  public static formatPhoneNo(phoneNo: string) {
    if (!phoneNo) return '';
    let index = 1;
    if (phoneNo.startsWith('+234')) {
      index = 3;
    } else if (phoneNo.startsWith('234')) {
      index = 2;
    }

    const rest = phoneNo.slice(index);
    return `(234)${rest}`;
  }

  private checkFileType = (blob: Blob) => {
    const allowedTypes = /jpg|jpeg|png|webp/;
    console.log(
      'is allowed',
      allowedTypes.test(path.extname(blob.name).toLowerCase())
    );

    if (!allowedTypes.test(path.extname(blob.name).toLowerCase())) {
      throw new Error('Please upload either a jpeg, jpg or a pn file online');
    }
  };

  public async deleteUpload(data: { uploadId?: string; imageUrl: string }) {
    let id = data.uploadId;

    if (!id && data.imageUrl) {
      const entries = data.imageUrl.split('/');
      const lastEntry = entries[entries.length - 1];
      const [uploadId] = lastEntry?.split('.') ?? '';
      id = uploadId;
    }

    if (!id) return;

    await cloudinary.uploader.destroy('id');
  }

  public async upload(file: File, folder = '') {
    const parser = new DatauriParser();
    console.log('file', file);
    this.checkFileType(file);
    const blobBuffer = Buffer.from(await file.arrayBuffer());

    const base64Image = parser.format(
      path.extname(file.name).toString(),
      blobBuffer
    );

    if (!base64Image.content) return;

    let response;

    try {
      response = await cloudinary.uploader.upload(base64Image.content, {
        folder,
      });
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      throw new Error(errorMessage);
    }

    console.log('response', response);

    return {
      uploadId: response.public_id,
      url: response.url,
    };
  }

  public async verifyTransaction(
    reference: string | undefined,
    email: string | undefined,
    serviceId: string | undefined
  ) {
    const { slug } = Util.getRouteType();
    const merchant = new Merchant();
    const merchantData = await merchant.getOne({ slug });
    const user = new User();
    const userData = await user.getOne({ email });

    if (reference && email && serviceId && merchantData?.id) {
      if (userData?.id) {
        const transaction = new Transaction();
        const subscriptionData = {
          merchantId: merchantData.id,
          serviceId,
        };
        const verification = await transaction.verify(
          userData.id,
          reference,
          subscriptionData
        );
        return {
          confirmation: verification.status,
          userId: userData.id,
        };
      }
    }

    return { confirmation: false, userId: userData?.id };
  }
}
