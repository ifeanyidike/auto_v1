'use client';
import React, { type Dispatch, type SetStateAction } from 'react';
import { type SingleValue } from 'react-select';
import { type MerchantType } from '~/app/api/merchant/logic';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import Select from '~/components/Select';
import TextInput from '~/components/TextInput';
import { type CreateMerchantServiceParamType } from '~/types/utils';

type Props = {
  merchant: MerchantType;
  product?: MerchantServiceType | null;
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
          Discount
        </label>
        <Select
          data={props.merchant.discounts.map(d => ({
            label: `${d.code} - ${d.type === 'fixed' ? '₦' : ''}${d.value}${
              d.type === 'percentage' ? '%' : ''
            }`,
            value: d.code,
          }))}
          getValue={d => {
            const discount = d as SingleValue<
              Record<'value' | 'label', string>
            >;
            const newData = { ...props.data };
            if (!newData.pricing.discounts) {
              newData.pricing.discounts = [];
            }

            if (discountIndex === -1) {
              newData.pricing.discounts = [
                ...(newData.pricing.discounts || []),
                {
                  ...props.item,
                  code: discount?.value!,
                },
              ];
            } else {
              newData.pricing.discounts[discountIndex]!.code = discount?.value!;
            }
            props.setData(newData);
          }}
        />
      </div>
    </div>
  );
};

export default DiscountView;
