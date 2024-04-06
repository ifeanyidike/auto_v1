import { type CreateMerchantServiceParamType } from '~/types/utils';

export const initProductData: CreateMerchantServiceParamType = {
  product_type: {} as CreateMerchantServiceParamType['product_type'],
  image: {} as CreateMerchantServiceParamType['image'],
  description: {} as CreateMerchantServiceParamType['description'],
  pricing: {
    discounts: [
      {
        id: globalThis.crypto.randomUUID(),
        code: '',
        type: 'monthly',
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: '',
        type: 'quarterly',
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: '',
        type: 'biannually',
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: '',
        type: 'annually',
      },
    ],
  } as CreateMerchantServiceParamType['pricing'],
  subscriptions: [],
  faq_keypoints: {
    faq: [
      {
        id: globalThis.crypto.randomUUID(),
        question: '',
        answer: '',
      },
    ],
    keypoints: [],
  } as CreateMerchantServiceParamType['faq_keypoints'],
};

export const ALLOWED_URLs = ['register-merchant', 'demo', ''];

export const getShortFormattedDate = () => {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
  return `${firstDayOfYear.getFullYear()}-${(firstDayOfYear.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${firstDayOfYear.getDate().toString().padStart(2, '0')}`;
};

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
