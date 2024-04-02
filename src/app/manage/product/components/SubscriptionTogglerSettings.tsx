'use client';
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import Toggler from '~/components/Toggler';
import { type CreateMerchantServiceParamType } from '~/types/utils';

type Props = {
  product?: MerchantServiceType | null;
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};
const SubscriptionTogglerSettings = (props: Props) => {
  const subscriptions =
    props.product?.subscriptionPlans?.map(s => s.interval) ?? [];

  const monthly = !!subscriptions?.includes('monthly');
  const quarterly = !!subscriptions?.includes('quarterly');
  const biannually = !!subscriptions?.includes('biannually');
  const annually = !!subscriptions?.includes('annually');

  const all = monthly && quarterly && biannually && annually;

  const [states, setStates] = useState<
    Record<'all' | 'monthly' | 'quarterly' | 'biannually' | 'annually', boolean>
  >({ all, monthly, quarterly, biannually, annually });

  useEffect(() => {
    const newData = { ...props.data };
    const subscriptionData = [];
    for (const [k, v] of Object.entries(states)) {
      if (k === 'all') continue;
      if (v) {
        subscriptionData.push(k);
      }
    }
    newData.subscriptions = [...new Set(subscriptionData)];
    props.setData(newData);
  }, [states]);

  return (
    <div>
      <input
        type="hidden"
        name="subscriptions"
        value={JSON.stringify(props.data.subscriptions)}
      />
      <div className="flex flex-col gap-6 ml-4">
        <div className="flex items-center gap-4">
          <Toggler
            value={states.all}
            setToggled={() => {
              const val = !states.all;
              setStates(prevStates => ({
                ...prevStates,
                all: val,
                monthly: val,
                quarterly: val,
                biannually: val,
                annually: val,
              }));
            }}
          />
          <span className="text-xs">
            {states.all ? 'Disable' : 'Enable'} all subscription plans
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Toggler
            value={states.monthly}
            setToggled={() => {
              const val = !states.monthly;
              setStates(prevStates => ({
                ...prevStates,
                monthly: !states.monthly,
                ...(!val && { all: val }),
              }));
            }}
          />
          <span className="text-xs">
            {states.monthly ? 'Disable' : 'Enable'} monthly subscription plans
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Toggler
            value={states.quarterly}
            setToggled={() => {
              const val = !states.quarterly;
              setStates(prevStates => ({
                ...prevStates,
                quarterly: !states.quarterly,
                ...(!val && { all: val }),
              }));
            }}
          />
          <span className="text-xs">
            {states.quarterly ? 'Disable' : 'Enable'} quarterly subscription
            plans
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Toggler
            value={states.biannually}
            setToggled={() => {
              const val = !states.biannually;
              setStates(prevStates => ({
                ...prevStates,
                biannually: !states.biannually,
                ...(!val && { all: val }),
              }));
            }}
          />
          <span className="text-xs">
            {states.biannually ? 'Disable' : 'Enable'} biannual subscription
            plans
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Toggler
            value={states.annually}
            setToggled={() => {
              const val = !states.annually;
              setStates(prevStates => ({
                ...prevStates,
                annually: !states.annually,
                ...(!val && { all: val }),
              }));
            }}
          />
          <span className="text-xs">
            {states.annually ? 'Disable' : 'Enable'} annual subscription plans
          </span>
        </div>
      </div>
      <p className="text-[10px] mt-5">*Subscriptions are disabled by default</p>
    </div>
  );
};

export default SubscriptionTogglerSettings;
