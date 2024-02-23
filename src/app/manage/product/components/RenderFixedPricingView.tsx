'use client';
import { enqueueSnackbar } from 'notistack';
import React, { type Dispatch, type SetStateAction } from 'react';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import TextInput from '~/components/TextInput';
import { type CreateMerchantServiceParamType } from '~/types/utils';

type Props = {
  product?: MerchantServiceType;
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};
const RenderFixedPricingView = (props: Props) => {
  return (
    <div>
      <label className="text-sm mb-2 font-semibold" htmlFor="amount">
        Amount
      </label>
      <TextInput
        customStyle="text-xs"
        prefixSign="₦"
        name="amount"
        placeholder="Please enter amount for this product"
        defaultValue={
          props.product?.pricingMode === 'FIXED'
            ? Number(props.product?.pricing?.[0]?.amount).toString() ?? ''
            : ''
        }
        getValue={amountString => {
          let amount: number | undefined = parseFloat(amountString);
          if (isNaN(amount)) {
            enqueueSnackbar('Please enter a number', {
              variant: 'error',
            });
            amount = undefined;
          }
          const newData = { ...props.data };
          newData.pricing.data = [
            {
              amount,
            },
          ];

          console.log('newData', newData);
          props.setData(newData);
        }}
      />
    </div>
  );
};

export default RenderFixedPricingView;
