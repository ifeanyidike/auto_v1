/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { headers } from 'next/headers';
import Merchant from '~/app/api/merchant/logic';

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
}
