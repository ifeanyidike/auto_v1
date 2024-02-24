'use client';
import { enqueueSnackbar } from 'notistack';
import React, { type Dispatch, type SetStateAction } from 'react';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import TextInput from '~/components/TextInput';
import { type CreateMerchantServiceParamType } from '~/types/utils';

type Props = {
  product?: MerchantServiceType;
  item: CreateMerchantServiceParamType['pricing']['discounts'][0];
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};

const DiscountView = (props: Props) => {
  const discountIndex = props.data.pricing.discounts?.findIndex(
    d => d.id === props.item.id
  );

  return (
    <div className="text-sm flex flex-col gap-1 pb-8 last:pb-0 last:border-b-0 border-b border-stone-200">
      <div className="w-full">
        <label className="text-xs mb-2 font-medium" htmlFor="discount_type">
          Type
        </label>
        <TextInput
          customStyle="text-xs capitalize"
          name="discount_type"
          defaultValue={props.item.type}
          isDisabled={true}
        />
      </div>

      <div className="w-full">
        <label className="text-xs mb-2 font-medium" htmlFor="discount_code">
          Code
        </label>

        <TextInput
          customStyle="text-xs"
          name="discount_code"
          placeholder="Please enter the code for this discount"
          defaultValue={props.item?.code.toString() ?? ''}
          getValue={code => {
            const newData = { ...props.data };

            if (!newData.pricing.discounts) {
              newData.pricing.discounts = [];
            }

            if (discountIndex === -1) {
              newData.pricing.discounts = [
                ...(newData.pricing.discounts || []),
                {
                  ...props.item,
                  code,
                },
              ];
            } else {
              newData.pricing.discounts[discountIndex]!.code = code;
            }
            props.setData(newData);
          }}
        />
      </div>

      <div className="w-full">
        <label className="text-xs mb-2 font-medium" htmlFor="discount_value">
          Value
        </label>

        <TextInput
          customStyle="text-xs"
          customPrefixStyle="text-xs !min-w-[75px]"
          customSuffixStyle="!min-w-[40px]"
          prefixSign="Percentage discount"
          suffixSign="%"
          max={100}
          min={1}
          type="number"
          name="discount_value"
          placeholder="Please enter the value for this discount"
          defaultValue={props.item?.value.toString() ?? ''}
          getValue={valueString => {
            let v: number | undefined = parseInt(valueString);
            if (isNaN(v)) {
              enqueueSnackbar('Please enter a number', {
                variant: 'error',
              });
              v = undefined;
            } else if (v < 1) {
              enqueueSnackbar('Please enter a number greater than 0', {
                variant: 'error',
              });
              v = undefined;
            }
            const value = !v ? '' : v.toString();

            const newData = { ...props.data };

            if (!newData.pricing.discounts) {
              newData.pricing.discounts = [];
            }

            if (discountIndex === -1) {
              newData.pricing.discounts = [
                ...(newData.pricing.discounts || []),
                {
                  ...props.item,
                  value,
                },
              ];
            } else {
              newData.pricing.discounts[discountIndex]!.value = value;
            }
            props.setData(newData);
          }}
        />
      </div>
    </div>
  );
};

export default DiscountView;
