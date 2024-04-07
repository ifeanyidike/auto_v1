import React, { useState } from 'react';
import { type ServicePricing } from './data';
import Button from '~/components/Button';
import RadioCheckbox from '~/components/RadioCheckBox';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import { dmSans } from '~/font';

type Props = {
  subscriptions: MerchantServiceType['subscriptions'];
  pricingList: ServicePricing[];
  setSelectedPriceType: React.Dispatch<
    React.SetStateAction<ServicePricing | undefined>
  >;
};
const SelectPlanType = (props: Props) => {
  const [tempPricingData, setTempPricingData] = useState<
    ServicePricing | undefined
  >();
  return (
    <div className="">
      <div className={`text-3xl mt-20 mb-8 text-center ${dmSans.className}`}>
        Choose the auto brand you wish to subscribe.
      </div>

      <div className="flex flex-col gap-3 items-center max-h-80 pt-16 mb-16 overflow-auto">
        {props.pricingList.map(p => (
          <div
            className="flex items-center gap-4 uppercase text-xs px-5 py-2 bg-gray-300 min-w-[600px] max-md:min-w-[500px] max-sm:min-w-[300px] flex-grow rounded-full text-content-normal font-medium"
            key={p.id}
          >
            <RadioCheckbox
              getValue={state => {
                if (state) {
                  setTempPricingData(p);
                }
              }}
              value={tempPricingData?.id === p.id}
            />{' '}
            <p>{p.type}</p>{' '}
            <span className="ml-auto">Basic Priicing: {`₦${p.amount}`}</span>
          </div>
        ))}
      </div>

      <div className="mb-14 text-center">
        <Button
          width="w-72"
          hasGradient={false}
          hasShadow={false}
          bgColor="bg-dark"
          onClick={() => {
            props.setSelectedPriceType(tempPricingData);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SelectPlanType;
