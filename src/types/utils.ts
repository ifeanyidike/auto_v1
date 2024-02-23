import { type Prisma } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';

export type CreateMerchantServiceParamType = {
  product_type: {
    service_type: string;
    service_name: string;
  };
  image: { file: File };
  pricing: {
    mode: 'FIXED' | 'BRAND' | 'SUV_SEDAN';
    data: {
      id?: string;
      type?: string;
      amount?: number;
    }[];
    discounts: {
      id: string;
      type: 'monthly' | 'quarterly' | 'annually';
      code: string;
      value: string;
    }[];
  };
  subscriptions: string[];
  description: {
    description: string;
  };
  faq_keypoints: {
    keypoints: string[];
    faq: {
      question: string;
      answer: string;
      id: string;
      isDefault?: boolean;
    }[];
  };
};

export type NewServicePricing = Omit<
  Prisma.ServicePricingGetPayload<
    Prisma.ServicePricingDefaultArgs<DefaultArgs>
  >,
  'amount'
> & {
  amount: number;
};

export type NewMerchantServiceType = Omit<MerchantServiceType, 'pricing'> & {
  pricing: NewServicePricing[] | null;
};
