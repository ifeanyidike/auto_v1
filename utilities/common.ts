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
        value: '',
        type: 'monthly',
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: '',
        value: '',
        type: 'quarterly',
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: '',
        value: '',
        type: 'biannually',
      },
      {
        id: globalThis.crypto.randomUUID(),
        code: '',
        value: '',
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
