import { enqueueSnackbar } from 'notistack';
import React, { type Dispatch, type SetStateAction } from 'react';
import { type SingleValue } from 'react-select';
import Select from '~/components/Select';
import TextInput from '~/components/TextInput';
import { type CreateMerchantServiceParamType } from '~/types/utils';

type Props = {
  id: string;
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
  currItem: CreateMerchantServiceParamType['pricing']['data'][0];
  listItems: Record<'value' | 'label', string>[];
  defaultList: Record<'value' | 'label', string>[];
};

const BrandPricingItem = (props: Props) => {
  const mode = props.data.pricing.mode as 'BRAND' | 'SUV_SEDAN';
  const brandIndex = props.data.pricing.data?.findIndex(d => d.id === props.id);
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full">
        <label className="text-xs mb-2" htmlFor="question">
          Auto Type
        </label>
        {mode === 'SUV_SEDAN' ? (
          <TextInput
            customStyle="text-xs"
            name="auto_type"
            defaultValue={props.currItem.type}
            isDisabled={true}
          />
        ) : (
          <Select
            name="auto_type"
            placeholder="Auto type"
            isCreateable={mode === 'BRAND'}
            data={props.listItems}
            defaultValue={props.listItems.filter(
              m => m.value === props.currItem.type
            )}
            getValue={e => {
              const value = (
                e as SingleValue<Record<'label' | 'value', string>>
              )?.value;
              if (!value) return;

              const newData = { ...props.data };

              if (!newData.pricing.data) {
                newData.pricing.data = [];
              }

              if (brandIndex === -1) {
                newData.pricing.data = [
                  ...(newData.pricing.data || []),
                  {
                    id: props.id,
                    type: value,
                  },
                ];
              } else {
                newData.pricing.data[brandIndex]!.type = value;
              }
              props.setData(newData);
            }}
          />
        )}
      </div>
      <div className="w-full">
        <label className="text-xs mb-2" htmlFor="answer">
          Amount
        </label>

        <TextInput
          customStyle="text-xs"
          prefixSign="₦"
          placeholder="Please enter amount for this product"
          defaultValue={props.currItem.amount?.toString() ?? ''}
          getValue={amountString => {
            let amount: number | undefined = parseFloat(amountString);
            if (isNaN(amount)) {
              enqueueSnackbar('Please enter a number', {
                variant: 'error',
              });
              amount = undefined;
            }
            const newData = { ...props.data };

            if (!newData.pricing.data) {
              newData.pricing.data = [];
            }

            if (brandIndex === -1) {
              newData.pricing.data = [
                ...(newData.pricing.data || []),
                {
                  id: props.id,
                  amount,
                },
              ];
            } else {
              newData.pricing.data[brandIndex]!.amount = amount;
            }
            props.setData(newData);
          }}
        />
      </div>
    </div>
  );
};

export default BrandPricingItem;
