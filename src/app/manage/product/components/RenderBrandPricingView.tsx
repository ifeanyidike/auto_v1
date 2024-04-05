'use client';
import React, { type Dispatch, type SetStateAction } from 'react';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import CloseIcon from '~/commons/icons/CloseIcon';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import BrandPricingItem from '../../components/BrandPricingItem';
import { brand_data } from 'utilities/product';
import PlusIcon from '~/commons/icons/PlusIcon';

type Props = {
  product?: MerchantServiceType | null;
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};
const RenderBrandPricingView = (props: Props) => {
  return (
    <div className="flex flex-col gap-6 mt-4 relative">
      <input
        type="hidden"
        name="pricing"
        value={JSON.stringify(props.data.pricing.data)}
      />
      {props.data.pricing.data?.map((item, index) => {
        return (
          <div key={item.id}>
            <button
              onClick={() => {
                const newData = { ...props.data };
                const filtered = newData.pricing.data.filter(
                  d => d.id !== item.id
                );
                newData.pricing.data = filtered;

                props.setData(newData);
              }}
              className={`${index === 0 && 'hidden'} absolute top-0 right-0`}
            >
              <CloseIcon classNames="h-4 w-4" />
            </button>
            <BrandPricingItem
              id={item.id!}
              data={props.data}
              setData={props.setData}
              currItem={item}
              listItems={brand_data.filter(s => {
                const values = props.data.pricing.data.map(d => d.type);
                return !values.includes(s.value);
              })}
              defaultList={
                props.product
                  ? brand_data.filter(s => s.value === item.type)
                  : []
              }
            />
          </div>
        );
      })}

      <button
        onClick={() => {
          const newData = { ...props.data };
          newData.pricing.data.push({
            id: globalThis.crypto.randomUUID(),
          });
          props.setData(newData);
        }}
        className="ml-auto hover-target flex justify-between items-center hover:w-[150px] transition ease-in-out duration-300 bg-stone-200 p-2 rounded-md relative"
      >
        <span className="hide absolute right-2 -top-2 p-2 text-sm font-medium rounded mt-2">
          Add more items
        </span>
        <PlusIcon classNames="h-5 w-5" />
      </button>
    </div>
  );
};

export default RenderBrandPricingView;
