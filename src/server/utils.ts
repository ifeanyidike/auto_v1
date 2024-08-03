import { headers } from 'next/headers';
import Merchant from '~/app/api/merchant/logic';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import DatauriParser from 'datauri/parser';
import { type SubscriptionItem } from '~/app/api/subscription/logic';
import { type BookingItem } from '~/app/api/booking/logic';
import { monthNames } from 'utilities/common';
import CryptoJS from 'crypto-js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default class Util {
  public static getServerSubdomain = (url: string) => {
    const strToCompare = url
      .replace('www.', '')
      .replace('https://', '')
      .replace('http://', '');

    let baseUrl = `.${process.env.BASE_URL ?? ''}`;
    if (strToCompare === 'localhost:3000' || strToCompare === 'moxxil.com') {
      baseUrl = strToCompare;
    }

    const urlParts = strToCompare.split(baseUrl);
    return urlParts[0]!;
  };

  public static getRouteType() {
    const headersList = headers();

    const next_url = headersList.get('next-url');
    const hostname = headersList.get('host');
    let slug = Util.getServerSubdomain(hostname ?? '')!;

    const adminSlug = process.env.ADMIN_SLUG ?? '';
    const slugParts = slug.split('.');
    if (slugParts.length === 2 && slugParts[1] === adminSlug) {
      slug = slugParts[0]!;
      return { isAdminLogin: true, slug };
    }
    return { isAdminLogin: false, slug, next_url };
  }

  public static getMerchantDataBySubdomain = async () => {
    const { isAdminLogin, slug, next_url } = Util.getRouteType();

    const merchant = new Merchant();
    const merchantData = await merchant.getOne({ slug });
    return { isAdminLogin, merchantData, slug, next_url };
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

  public async uploadOrUpdate(
    file: File,
    folder = '',
    existingImage: Record<'id' | 'url', string | null | undefined> | null
  ) {
    const uploadedImage = await this.upload(file, folder);
    if (!uploadedImage) {
      throw new Error('An error occurred in uploading image.');
    }

    if (existingImage?.url) {
      const imageId = existingImage?.id;
      const imageUrl = existingImage?.url;

      const uploadId = existingImage?.id ? `${folder}/${imageId}` : imageUrl;

      await this.deleteUpload({ uploadId: uploadId, imageUrl });
    }
    return uploadedImage;
  }

  public static sortTransactionsByDate(
    subscriptions: SubscriptionItem[],
    bookings: BookingItem[]
  ) {
    // const formatted_subscriptions = subscriptions.flatMap(sub => {
    //   const { title, type } = sub.merchantService.service || {};
    //   const { firstName, lastName, email, imgUrl } = sub.user || {};
    //   const name = firstName || '' + lastName || '';
    //   return sub.fufillments?.map(f => ({
    //     id: f.id,
    //     serviceName: title!,
    //     serviceType: type!,
    //     imgUrl: imgUrl!,
    //     userName: name || email!,
    //     email: email,
    //     amount: f.amountPaid.toNumber(),
    //     type: 'subscription',
    //     status: f.isFulfilled
    //       ? 'Fulfilled'
    //       : f.isPaid
    //         ? 'Paid Not Fulfilled'
    //         : 'Not Paid',
    //     date: f.createdAt,
    //   }));
    // });
    const formatted_subscriptions = subscriptions.flatMap(sub => {
      const { title = '', type = '' } = sub.merchantService.service || {};
      const {
        firstName = '',
        lastName = '',
        email = '',
        imgUrl = '',
      } = sub.user || {};
      const name = `${firstName} ${lastName}`.trim() || email;
      return sub.fufillments?.map(f => ({
        id: f.id,
        serviceName: title,
        serviceType: type,
        imgUrl: imgUrl,
        userName: name,
        email: email,
        amount: f.amountPaid.toNumber(),
        type: 'subscription',
        status: f.isFulfilled
          ? 'Fulfilled'
          : f.isPaid
            ? 'Paid Not Fulfilled'
            : 'Not Paid',
        date: f.createdAt,
      }));
    });

    // const formatted_bookings = bookings.map(b => {
    //   const { title, type } = b.merchantService.service || {};
    //   const { firstName, lastName, email, imgUrl } = b.user || {};
    //   const name = firstName || '' + lastName || '';

    //   return {
    //     id: b.id,
    //     serviceName: title!,
    //     serviceType: type!,
    //     imgUrl: imgUrl!,
    //     userName: name || email!,
    //     email: email,
    //     amount: b.amount,
    //     type: 'booking',
    //     status: b.isFullfilled
    //       ? 'Fulfilled'
    //       : b.isPaid
    //         ? 'Paid Not Fulfilled'
    //         : 'Not Paid',
    //     date: b.createdAt,
    //   };
    // });
    const formatted_bookings = bookings.flatMap(sub => {
      const { title = '', type = '' } = sub.merchantService.service || {};
      const {
        firstName = '',
        lastName = '',
        email = '',
        imgUrl = '',
      } = sub.user || {};
      const name = `${firstName} ${lastName}`.trim() || email;
      return {
        id: sub.id,
        serviceName: title,
        serviceType: type,
        imgUrl: imgUrl,
        userName: name,
        email: email,
        amount: sub.amount,
        type: 'bookings',
        status: sub.isFullfilled
          ? 'Fulfilled'
          : sub.isPaid
            ? 'Paid Not Fulfilled'
            : 'Not Paid',
        date: sub.createdAt,
      };
    });

    return [...formatted_subscriptions, ...formatted_bookings].sort(
      (a, b) => +new Date(b.date) - +new Date(a.date)
    );
  }

  public static organizeBookingByMonth(bookings: BookingItem[]) {
    const aggr = bookings.reduce(
      (acc, curr) => {
        const date = new Date(curr.createdAt);
        const month = monthNames[date.getMonth()]!;

        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += 1;
        return acc;
      },
      {} as { [k: string]: number }
    );
    return Object.fromEntries(
      Object.entries(aggr).sort(
        ([monthA], [monthB]) =>
          monthNames.indexOf(monthA) - monthNames.indexOf(monthB)
      )
    );
  }

  public static organizeSubscriptionByMonth(subscriptions: SubscriptionItem[]) {
    const aggr = subscriptions.reduce(
      (acc, curr) => {
        const date = new Date(curr.createdAt);
        const month = monthNames[date.getMonth()]!;

        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += 1;
        return acc;
      },
      {} as { [k: string]: number }
    );
    return Object.fromEntries(
      Object.entries(aggr).sort(
        ([monthA], [monthB]) =>
          monthNames.indexOf(monthA) - monthNames.indexOf(monthB)
      )
    );
  }

  public static organizeSubscriptionByServiceName(
    subscriptions: SubscriptionItem[]
  ) {
    const aggr = subscriptions.reduce(
      (acc, curr) => {
        const key = curr.merchantService.service?.title!;

        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += 1;
        return acc;
      },
      {} as { [k: string]: number }
    );
    return aggr;
  }

  public encryptSecret(secret: string) {
    const key = process.env.SECRET_ENCRYPTION_KEY ?? '';
    return CryptoJS.AES.encrypt(secret, key).toString();
  }

  public decryptSecret(encryptedSecret: string | null | undefined) {
    if (!encryptedSecret) return '';
    const key = process.env.SECRET_ENCRYPTION_KEY ?? '';
    var bytes = CryptoJS.AES.decrypt(encryptedSecret, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
