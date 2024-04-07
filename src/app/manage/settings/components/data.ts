import { type MerchantType } from '~/app/api/merchant/logic';

export const getAmountAfterDiscount = (
  initialAmount: number,
  data: Record<'type' | 'value', string>
) => {
  if (data?.type === 'percentage') {
    return initialAmount * (1 - parseFloat(data.value) / 100) * 100;
  }
  return Math.max(0, (initialAmount - parseFloat(data!.value)) * 100);
};

export const getBrandAmount = (
  s: MerchantType['services'][0],
  p: MerchantType['discounts'][0]['plans'][0]
) => {
  if (p.autoBrand === 'FIXED') {
    return s.servicePricing.find(a => a.mode === 'FIXED')?.amount;
  }
  return s.servicePricing.find(a => a.type === p.autoBrand)?.amount;
};
