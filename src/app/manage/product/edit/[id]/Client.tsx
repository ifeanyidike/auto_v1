'use client';
import React, { useEffect, useState } from 'react';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import EditProductView from '../../components/EditProductView';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import { initProductData } from 'utilities/common';
import { handleSelectMode } from 'utilities/product';

type Props = {
  merchantId: string | undefined;
  product?: MerchantServiceType | null;
  hasApiKey: boolean;
};

const Client = (props: Props) => {
  const [data, setData] =
    useState<CreateMerchantServiceParamType>(initProductData);
  useEffect(() => {
    if (!props.product) return;
    if (props.product) {
      if (props.product?.pricingMode) {
        const pricingData = props.product?.pricing;
        handleSelectMode(data, setData, props.product.pricingMode, pricingData);
      }

      const newData = { ...data };
      if (props.product?.description) {
        newData.description.description = props.product.description;
      }

      if (props.product?.service) {
        newData.product_type.service_name = props.product.service.title;
        newData.product_type.service_type = props.product.service.type;
      }

      if (props.product?.keyPoints?.length) {
        newData.faq_keypoints.keypoints = props.product.keyPoints.map(
          k => k.point
        );
      }

      if (props.product?.subscriptionPlans) {
        const intervals = props.product.subscriptionPlans.map(s => s.interval);

        newData.subscriptions = [...new Set(intervals)];
      }

      if (props.product?.discounts) {
        const newDiscountData = newData.pricing.discounts.map(d => {
          const savedDiscount = props.product?.discounts?.find(
            dis => dis.type === d.type
          );
          return {
            ...d,
            ...(savedDiscount && {
              code: savedDiscount.code,
              value: savedDiscount.value,
            }),
          };
        });
        newData.pricing.discounts = newDiscountData;
      }

      const faqs = props.product?.faqs;
      if (faqs?.length) {
        const faqData = faqs.map(faq => ({
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          isDefault: true,
        }));
        newData.faq_keypoints.faq = faqData;
      }
      setData(newData);
    } else {
      return setData({} as CreateMerchantServiceParamType);
    }
  }, []);

  return (
    <EditProductView
      product={props.product}
      merchantId={props.merchantId}
      data={data}
      setData={setData}
      hasApiKey={props.hasApiKey}
    />
  );
};

export default Client;
