'use client';
import React, { type Dispatch, type SetStateAction } from 'react';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import BrandPricingItem from '../../components/BrandPricingItem';
import { suv_sedan_data } from 'utilities/product';

type Props = {
  product?: MerchantServiceType | null;
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};
const RenderSuvSedanPricingView = (props: Props) => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      <input
        type="hidden"
        name="pricing"
        value={JSON.stringify(props.data.pricing.data)}
      />
      {props.data.pricing.data?.map(item => {
        return (
          <BrandPricingItem
            key={item.id}
            id={item.id!}
            data={props.data}
            setData={props.setData}
            currItem={item}
            listItems={suv_sedan_data.filter(s => {
              const values = props.data.pricing.data.map(d => d.type);
              return !values.includes(s.value);
            })}
            defaultList={
              props.product
                ? suv_sedan_data.filter(s => s.value === item.type)
                : []
            }
          />
        );
      })}
    </div>
  );
};

export default RenderSuvSedanPricingView;
