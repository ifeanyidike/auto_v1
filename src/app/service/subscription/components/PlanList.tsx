'use client';
import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import { robotoMono } from '~/font';
import {
  monthly,
  quarterly,
  biannually,
  annually,
  type ServicePricing,
} from './data';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';

const planText = {
  monthly,
  quarterly,
  biannually,
  annually,
};

type UniquePlans = {
  id: string;
  interval: string;
  amount: any;
  discount: string | undefined;
};
// 'SUV_SEDAN' | 'BRAND' | 'FIXED'

type Props = {
  // plans: Plan[];
  selectedPrice: ServicePricing;
  service: MerchantServiceType;
};
const PlanList = (props: Props) => {
  const uniquePlans: UniquePlans[] = [];

  for (let p of props.service?.subscriptionPlans || []) {
    const seenPlan = uniquePlans.some(plan => plan.interval === p.interval);

    if (seenPlan) {
      continue;
    }

    uniquePlans.push({
      id: p.id,
      interval: p.interval,
      amount: Number(props.selectedPrice.amount),
      discount: props.service?.discounts?.find(d => d.type === p.interval)
        ?.value,
    });
  }

  const customOrder = ['monthly', 'quarterly', 'biannually', 'annually'];

  let sortedUniquePlans: UniquePlans[] = uniquePlans.sort((a, b) => {
    return customOrder.indexOf(a.interval) - customOrder.indexOf(b.interval);
  });

  return (
    <div>
      <p
        className={`${robotoMono.className} font-mono text-center mt-16 text-3xl`}
      >
        Choose the plan that works for you!
      </p>
      <div className="flex flex-wrap gap-4 items-center justify-center my-20">
        {sortedUniquePlans.map(p => {
          return (
            <div key={p.id} className="flex">
              <SubscriptionCard
                interval={p.interval}
                amount={
                  p.discount
                    ? p.amount * (1 - parseFloat(p.discount) / 100)
                    : p.amount
                }
                originalAmount={p.amount}
                discount={p.discount}
                focal={p.interval === 'quarterly'}
                planCode={
                  props.service?.subscriptionPlans?.find(p => {
                    if (!props.selectedPrice?.type) return true;
                    return props.selectedPrice.type === p.autoBrand;
                  })?.code!
                }
                data={
                  planText[
                    p.interval as
                      | 'monthly'
                      | 'quarterly'
                      | 'biannually'
                      | 'annually'
                  ]
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanList;
