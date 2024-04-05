'use server';

import { z } from 'zod';
import FAQ from '~/app/api/faq/logic';
import Merchant from '~/app/api/merchant/logic';
import MerchantService from '~/app/api/merchant_service/logic';
import ServiceKeypoint from '~/app/api/service_keypoint/logic';
import ServicePricing from '~/app/api/service_pricing/logic';
import SubscriptionPlan from '~/app/api/subscription_plan/logic';
import { Plan } from '~/server/payment/plan';
import Util from '~/server/utils';
import {
  type SubscriptionPlanDuration,
  type PlanParams,
} from '~/types/payment';

const faqSchema = z
  .object({
    question: z.string({
      required_error: 'FAQ question is required',
      invalid_type_error: 'FAQ question must be a string',
    }),
    answer: z.string({
      required_error: 'FAQ answer is required',
      invalid_type_error: 'FAQ answer must be a string',
    }),
  })
  .array()
  .min(3, { message: 'At least 3 frequently asked questions are required.' });

const pricingSchema = z
  .object({
    type: z.string().optional(),
    amount: z.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    }),
  })
  .array()
  .nonempty({ message: 'Pricing must be provided' });

const discountSchema = z
  .object({
    code: z.string({
      required_error: 'Discount code is required',
      invalid_type_error: 'Discount code must be a string',
    }),
    type: z.string({
      required_error: 'Discount type is required',
      invalid_type_error: 'Discount type must be a string',
    }),
  })
  .array()
  .optional();

const keypointSchema = z
  .string({
    required_error: 'Keypoints are required',
    invalid_type_error: 'Keypoints must be string',
  })
  .array()
  .min(3, { message: 'At least 3 keypoints are required.' });

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPE = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const productSchema = (isPublish = true) =>
  z.object({
    serviceType: z.string({
      required_error: 'Service type is required',
      invalid_type_error: 'Service type must be a string',
    }),
    serviceTitle: z.string({
      required_error: 'Service title is required',
      invalid_type_error: 'Service title must be a string',
    }),
    ...(isPublish && {
      description: z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
      }),
      paymentMode: z.string({
        required_error: 'Payment mode is required',
        invalid_type_error: 'Payment mode must be a string',
      }),
      subscriptions: z.string().array().optional(),
      faqs: faqSchema,
      keypoints: keypointSchema,
      discounts: discountSchema,
      pricing: pricingSchema,
    }),
  });

type UpdateDataParams = {
  discounts?: Record<'id' | 'code' | 'type', string>[];
  subscriptions: string[];
  serviceType: string;
  serviceTitle: string;
  paymentMode: string;
  description: string;
  pricing: {
    id: string;
    type: string;
    amount: number;
  }[];
  faqs: Record<'answer' | 'question', string>[];
  keypoints: string[];
  file?: File;
};

const getFormData = (formData: FormData) => {
  const data = {} as UpdateDataParams;
  const merchantId = formData.get('merchantId') as string;
  const serviceId = formData.get('serviceId') as string;

  data.subscriptions = JSON.parse(formData.get('subscriptions') as string);
  const discounts = formData.get('discounts') as string;
  if (discounts) {
    const discountData = JSON.parse(discounts) as Record<
      'id' | 'code' | 'type',
      string
    >[];

    data.discounts = discountData.filter(d => d.code);
  }
  const serviceType = formData.get('service_type') as string;
  if (serviceType) data.serviceType = serviceType;

  const serviceTitle = formData.get('service') as string;
  if (serviceTitle) data.serviceTitle = serviceTitle;

  const description = formData.get('description') as string;
  if (description) data.description = description;

  const paymentMode = formData.get('payment_mode') as string;
  if (paymentMode) data.paymentMode = paymentMode;

  const pricing = formData.get('pricing') as string;
  if (pricing) {
    const amountData = JSON.parse(pricing) as {
      id: string;
      type: string;
      amount: number;
    }[];
    data.pricing = amountData
      .filter(a => a.amount)
      .map(a => ({
        ...a,
        amount: Number(parseFloat(a.amount.toString())),
      }));
  } else {
    data.pricing = [];
  }

  const faqs = formData.get('faqs') as string;
  if (faqs) {
    const faqData = JSON.parse(faqs);
    data.faqs = (faqData as Record<'answer' | 'question', string>[])
      .filter(faq => faq.answer && faq.question)
      .map(({ question, answer }) => ({
        question,
        answer,
      }));
  }

  const keypoints = formData.get('keypoints') as string;
  if (keypoints) {
    data.keypoints = JSON.parse(keypoints);
  }

  const file = formData.get('product_image') as File;
  if (file?.size > 0) data.file = file;

  const isPublish = formData.has('publish');
  const isSafeDraft = formData.has('draft');

  return {
    data,
    ...(serviceId && { serviceId }),
    merchantId,
    isPublish,
    isSafeDraft,
  };
};

const handleImageUpload = async (
  productImage: File,
  existingImage: Record<'id' | 'url', string> | null
) => {
  if (productImage) {
    const util = new Util();
    const uploadedImage = await util.uploadOrUpdate(
      productImage,
      'products',
      existingImage
    );
    return {
      ...uploadedImage,
      id: uploadedImage.uploadId,
    };
  }
  return existingImage;
};

const handleGetExistingProduct = async (title: string) => {
  const serviceClient = new MerchantService();
  let existingProduct;
  if (title) {
    existingProduct = await serviceClient.getOne({ title });
  }
  let existingProductImage: Record<'id' | 'url', string> | null = null;
  if (existingProduct && existingProduct.imgUrl) {
    existingProductImage = {
      id: existingProduct.imageId!,
      url: existingProduct.imgUrl,
    };
  }

  return { existingProduct, existingProductImage };
};

function formatPlanData(data: UpdateDataParams) {
  const serviceName = data.serviceTitle;
  return data.pricing
    .flatMap(priceData => {
      if (!priceData.amount) return;
      return data.subscriptions.map(interval => {
        let amount = priceData.amount!;

        const name = `${serviceName} - ${priceData.type} - ${interval}`;
        return {
          interval,
          name,
          amount: Math.round(amount! * 100),
          autoBrand: priceData.type || 'FIXED',
        };
      });
    })
    .filter(Boolean) as PlanParams[];
}

async function handleSubscriptionPlans(
  data: UpdateDataParams,
  merchantServiceId: string | null = null
) {
  const plan = new Plan();
  const planData = formatPlanData(data);
  console.log('planData', planData);

  const planListItems = await plan.createOrUpdateMany(planData);

  const planList = planListItems.map(plan => ({
    interval: plan.interval,
    code: plan.plan_code,
    autoBrand: plan.autoBrand,
  }));

  if (!merchantServiceId) return planList;

  const subscription = new SubscriptionPlan();
  return await subscription.getOrCreateMany(merchantServiceId, planList);
}

type FormState = {
  error?: string | null;
  success?: boolean;
};

export async function save(prevState: FormState, formData: FormData) {
  console.log('formData', formData);
  const processedFormData = getFormData(formData);
  const data = processedFormData.data;
  const merchantId = processedFormData.merchantId;
  const merchantClient = new Merchant();
  const merchant = await merchantClient.getOne({ id: merchantId });
  if (!merchant?.apiKeys?.paystack) {
    return { error: 'You must set the paystack API secret to proceed!' };
  }

  let { existingProduct, existingProductImage } =
    await handleGetExistingProduct(data.serviceTitle);

  const validatedFields = productSchema(processedFormData.isPublish).safeParse({
    ...data,
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorValues = Object.values(errors);
    if (errorValues[0]?.length) {
      return {
        error: errorValues[0][0],
      };
    }
  }

  if (!existingProductImage?.url) {
    if (!data?.file?.size) return { error: 'File is required' };
    if (data.file.size > MAX_FILE_SIZE)
      return { error: 'Max file size is 5MB' };
    if (!ACCEPTED_IMAGE_TYPE.includes(data.file?.type))
      return { error: 'Only .jpg, .jpeg, .png, .webp formats are supported' };
  }

  const uploadData = await handleImageUpload(data.file!, existingProductImage);

  const faqClient = new FAQ();
  const faqs = await faqClient.getOrCreateMany(data.faqs);

  const KeyPoint = new ServiceKeypoint();
  const keypoints = await KeyPoint.getOrCreateMany(data.keypoints);

  const planList = await handleSubscriptionPlans(data, existingProduct?.id);

  const dataToSave = {
    imgUrl: uploadData?.url,
    imageId: uploadData?.id,
    description: data.description,
    isDraft: !processedFormData.isPublish,
    pricingMode: data.paymentMode,
  };

  const ServiceClient = new MerchantService();
  if (existingProduct) {
    let pricing: string[] = [];

    if (data.pricing?.length) {
      const servicePricing = new ServicePricing();
      pricing = await servicePricing.getOrCreateMany(
        {
          mode: data.paymentMode as 'FIXED' | 'BRAND' | 'SUV_SEDAN',
          data: data.pricing,
        },
        existingProduct.id
      );
    }

    await ServiceClient.update(
      existingProduct.id,
      dataToSave,
      keypoints,
      faqs,
      planList as string[],
      pricing
    );
    return { success: true, error: null };
  }
  const parentData = {
    type: data.serviceType,
    title: data.serviceTitle,
  };
  await ServiceClient.create(
    merchantId,
    parentData,
    dataToSave,
    keypoints,
    faqs,
    planList as { interval: SubscriptionPlanDuration; code: string }[],
    { mode: data.paymentMode, data: data.pricing }
  );

  return { success: true, error: null };
}
