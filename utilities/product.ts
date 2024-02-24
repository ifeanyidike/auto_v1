import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import { type CreateMerchantServiceParamType } from '~/types/utils';

export const payment_modes = [
  {
    value: 'FIXED',
    label: 'Fixed',
  },
  {
    value: 'BRAND',
    label: 'By Brand',
  },
  {
    value: 'SUV_SEDAN',
    label: 'By SUV and Sedan',
  },
];

export const service_types = [
  {
    value: 'REPAIR',
    label: 'Repairs',
  },
  {
    value: 'SERVICE',
    label: 'Servicing',
  },
];

export const services = [
  {
    value: 'Oil Change',
    label: 'Oil Change',
  },
  {
    value: 'Electrical Repairs',
    label: 'Electrical Repairs',
  },
  {
    value: 'Break Repairs',
    label: 'Break Repairs',
  },
  {
    value: 'Car radiator',
    label: 'Car radiator',
  },
];

export const suv_sedan_data = [
  {
    value: 'SUV',
    label: 'Sport Utility Vehicles (SUVs)',
  },
  {
    value: 'SEDAN',
    label: 'Sedan',
  },
];

export const brand_data = [
  {
    value: 'Toyota Camry',
    label: 'Toyota Camry',
  },
  {
    value: 'Toyota Corolla',
    label: 'Toyota Corolla',
  },
  {
    value: 'Lexus 350',
    label: 'Lexus 350',
  },
  {
    value: 'Honda Accord',
    label: 'Honda Accord',
  },
  {
    value: 'Mercedes C-Class',
    label: 'Mercedes C-Class',
  },
];

export const keypoints_data = [
  {
    value: 'Premium Diagnostic Checks',
    label: 'Premium Diagnostic Checks',
  },
  {
    value: 'The Widest Range Of Vehicle',
    label: 'The Widest Range Of Vehicle',
  },
  {
    value: 'In-Depth System Analysis',
    label: 'In-Depth System Analysis',
  },
  {
    value: 'The Highest Level Of Accuracy',
    label: 'The Highest Level Of Accuracy',
  },
];

export const getFAQKeyPointsNumCompleted = (
  data: CreateMerchantServiceParamType
) => {
  const { faq, keypoints } = data.faq_keypoints || {};
  if (!faq && !keypoints) return 0;
  let count = 0;
  if (keypoints?.length) {
    count++;
  }

  if (faq?.length) {
    const hasComplete = faq?.some(f => f.answer && f.question);
    if (hasComplete) count++;
  }
  return count;
};

export const disableSave = (
  product: MerchantServiceType,
  data: CreateMerchantServiceParamType
) => {
  const desc_equal = data.description.description === product?.description;
  const hasImg = !data.image.file && product?.imgUrl;
  const equal_service_name =
    data.product_type.service_name === product?.service?.title;
  const equal_service_type =
    data.product_type.service_type === product?.service?.type;
  const equalKp =
    product?.keyPoints.length === data.faq_keypoints.keypoints.length &&
    product.keyPoints?.every(
      kp => data.faq_keypoints.keypoints?.some(k => kp.point === k)
    );
  const equalFAQ =
    product?.faqs.length === data.faq_keypoints.faq.length &&
    product.faqs?.every(
      faq =>
        data.faq_keypoints.faq?.some(
          f => faq.question === f.question && faq.answer === f.answer
        )
    );

  const equalPricingMode = product?.pricingMode === data.pricing?.mode;
  const equalAmount = product?.pricing?.every(
    price =>
      data.pricing?.data?.some(
        p => Number(p.amount) === Number(price.amount) && p.type === price.type
      )
  );

  let equalDiscounts = false;
  if (product?.discounts?.length) {
    equalDiscounts = product?.discounts?.every(
      discount =>
        data.pricing?.discounts?.some(
          d =>
            d.type === discount.type &&
            d.code === discount.code &&
            d.value === discount.value
        )
    );
  } else {
    equalDiscounts = !data.pricing?.discounts?.some(d => d.code || d.value);
  }

  let equalSubscriptions = false;
  if (product?.subscriptionTypes?.length) {
    equalSubscriptions = product?.subscriptionTypes?.every(
      s => data.subscriptions?.includes(s.name)
    );
  } else {
    equalSubscriptions = !data.subscriptions?.length;
  }

  return (
    desc_equal &&
    hasImg &&
    equal_service_name &&
    equal_service_type &&
    equalKp &&
    equalFAQ &&
    equalPricingMode &&
    equalAmount &&
    equalDiscounts &&
    equalSubscriptions
  );
};

export const disableDraftSave = (
  product: MerchantServiceType | null | undefined,
  data: CreateMerchantServiceParamType
) => {
  if (!product) return false;
  return disableSave(product, data);
};

export const disablePublish = (
  product: MerchantServiceType | null | undefined,
  data: CreateMerchantServiceParamType
) => {
  if (!product) return false;
  return disableSave(product, data);
};

export const getPricingNumCompleted = (
  data: CreateMerchantServiceParamType
) => {
  const { mode, data: pricingData } = data.pricing;
  if (!mode) return 0;

  if (mode === 'FIXED' && pricingData?.[0]?.amount) return 2;

  if (mode === 'SUV_SEDAN') {
    const complete = pricingData.every(d => d.amount && d.type);
    if (complete) return 2;
  }

  const exist = pricingData?.some(d => d.amount && d.type);
  if (exist) return 2;

  return 1;
};

export const getDiscountNumCompleted = (
  data: CreateMerchantServiceParamType
) => {
  let count = 0;
  for (const discount of data.pricing.discounts) {
    if (discount.code && discount.type && discount.value) {
      count++;
    }
  }
  return count;
};

export const createService = async (
  merchantId: string | undefined,
  data: CreateMerchantServiceParamType,
  setSaving: (e: boolean) => void,
  product: MerchantServiceType | null | undefined = null
) => {
  if (!merchantId) return;
  const faqs = data.faq_keypoints?.faq.map(faq => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));
  data.faq_keypoints.faq = faqs;
  try {
    setSaving(true);
    await axios.post(
      `/api/merchant_service/form-data`,
      {
        merchantId,
        description: data.description.description,
        product_type: JSON.stringify(data.product_type),
        subscriptions: JSON.stringify(data.subscriptions || []),
        faq_keypoints: JSON.stringify(data.faq_keypoints),
        pricing: JSON.stringify(data.pricing),
        isDraft: product?.isDraft,
        existingProductId: product?.id,
        image: data.image.file,
        mode: 'publish',
        ...(product?.imgUrl && { imageUrl: product?.imgUrl }),
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    setSaving(false);
    return enqueueSnackbar('Product successfully saved!', {
      variant: 'success',
    });
  } catch (error) {
    const errData = error as {
      message: string;
      response: { data: { error: string } };
    };

    const errorMessage = errData.response.data?.error;
    if (errorMessage) {
      console.log('Error:', errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return;
    }
    console.log('error', errData.response.data);
  } finally {
    setSaving(false);
  }
};

export const saveServiceAsDraft = async (
  merchantId: string | undefined,
  data: CreateMerchantServiceParamType,
  setSavingDraft: (e: boolean) => void,
  product: MerchantServiceType | null | undefined = null
) => {
  if (!merchantId) return;
  const faqs = data.faq_keypoints?.faq.map(faq => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));
  data.faq_keypoints.faq = faqs;

  try {
    setSavingDraft(true);
    await axios.post(
      `/api/merchant_service/form-data`,
      {
        merchantId: merchantId,
        description: data.description.description,
        product_type: JSON.stringify(data.product_type),
        faq_keypoints: JSON.stringify(data.faq_keypoints),
        pricing: JSON.stringify(data.pricing),
        subscriptions: JSON.stringify(data.subscriptions || []),
        ...(product?.imgUrl && { imageUrl: product?.imgUrl }),
        ...(product?.isDraft !== undefined && {
          isDraft: product?.isDraft,
        }),
        ...(product?.id && { existingProductId: product?.id }),
        image: data.image.file,
        mode: 'draft',
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    setSavingDraft(false);
    return enqueueSnackbar('Product successfully saved as draft!', {
      variant: 'success',
    });
  } catch (error) {
    const errData = error as {
      message: string;
      response: { data: { error: string } };
    };

    const errorMessage = errData.response.data?.error;
    if (errorMessage) {
      console.log('Error:', errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
      return;
    }
    console.log('error', errData.response.data);
  } finally {
    setSavingDraft(false);
  }
};

export const handleSelectMode = (
  state_data: CreateMerchantServiceParamType,
  setData: (e: CreateMerchantServiceParamType) => void,
  value: string,
  pricingData: MerchantServiceType['pricing'] | null = null
) => {
  const newData = { ...state_data };
  newData.pricing.mode = value as 'FIXED' | 'BRAND' | 'SUV_SEDAN';
  const pricing_data = pricingData?.map(({ id, type, amount }) => ({
    id,
    type,
    amount,
  }));

  if (value === 'SUV_SEDAN') {
    const data = pricingData?.length
      ? pricing_data
      : [
          {
            type: 'SUV',
            id: globalThis.crypto.randomUUID(),
          },
          {
            type: 'SEDAN',
            id: globalThis.crypto.randomUUID(),
          },
        ];
    newData.pricing.data =
      data as CreateMerchantServiceParamType['pricing']['data'];
  } else if (value === 'BRAND') {
    const data = pricingData?.length
      ? pricingData.map(({ id, type, amount }) => ({ id, type, amount }))
      : [{ id: globalThis.crypto.randomUUID() }];

    newData.pricing.data =
      data as CreateMerchantServiceParamType['pricing']['data'];
  }

  setData(newData);
};
