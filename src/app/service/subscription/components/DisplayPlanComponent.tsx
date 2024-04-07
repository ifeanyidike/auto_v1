'use client';
import React, { useState } from 'react';
import PricingType from './PricingType';
import PlanList from './PlanList';
import { type ServicePricing } from './data';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';

type Props = {
  service: MerchantServiceType;
  subscriptions: MerchantServiceType['subscriptions'];
};
const DisplayPlanComponent = (props: Props) => {
  const [selectedPrice, setSelectedPriceType] = useState<
    ServicePricing | undefined
  >();

  const pricingList =
    props.service?.servicePricing?.filter(
      p => !props.subscriptions?.some(sub => p.type === sub.plan?.autoBrand)
    ) || [];

  return (
    <div>
      {!selectedPrice ? (
        <PricingType
          pricingList={pricingList}
          setSelectedPriceType={setSelectedPriceType}
          subscriptions={props.subscriptions}
        />
      ) : (
        <PlanList service={props.service} selectedPrice={selectedPrice} />
      )}
    </div>
  );
};

export default DisplayPlanComponent;
