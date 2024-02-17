import { type CreateMerchantServiceParamType } from '~/types/utils';

export const initProductData: CreateMerchantServiceParamType = {
  product_type: {} as CreateMerchantServiceParamType['product_type'],
  image: {} as CreateMerchantServiceParamType['image'],
  description: {} as CreateMerchantServiceParamType['description'],
  pricing: {} as CreateMerchantServiceParamType['pricing'],
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
