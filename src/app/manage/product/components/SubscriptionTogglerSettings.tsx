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
  product?: MerchantServiceType;
  data: CreateMerchantServiceParamType;
  setData: Dispatch<SetStateAction<CreateMerchantServiceParamType>>;
};
const SubscriptionTogglerSettings = (props: Props) => {
  const subscriptions =
    props.product?.subscriptionTypes?.map(s => s.name) ?? [];

  //   const all_enabled = !!(subscriptions?.length
  //     ? subscriptions?.every(s =>
  //         ['monthly', 'quarterly', 'annually'].includes(s)
  //       )
  //     : false);
  const monthly_enabled = !!subscriptions?.includes('monthly');
  const quarterly_enabled = !!subscriptions?.includes('quarterly');
  const yearly_enabled = !!subscriptions?.includes('annually');

  const [states, setStates] = useState<
    Record<'all' | 'monthly' | 'quarterly' | 'annually', boolean>
  >({
    all: monthly_enabled && quarterly_enabled && yearly_enabled,
    monthly: monthly_enabled,
    quarterly: quarterly_enabled,
    annually: yearly_enabled,
  });

  useEffect(() => {
    const newData = { ...props.data };
    const subscriptionData = [];
    for (const [k, v] of Object.entries(states)) {
      if (k === 'all') continue;
      if (v) {
        subscriptionData.push(k);
      }
    }
    newData.subscriptions = subscriptionData;
    props.setData(newData);
  }, [states]);

  return (
    <div>
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
                annually: val,
              }));
            }}
          />
          <span className="text-xs">
            {states.all ? 'Disable' : 'Enable'} all subscriptions
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
            {states.monthly ? 'Disable' : 'Enable'} monthly subscriptions
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
            {states.quarterly ? 'Disable' : 'Enable'} quarterly subscriptions
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
            {states.annually ? 'Disable' : 'Enable'} annual subscriptions
          </span>
        </div>
      </div>
      <p className="text-[10px] mt-5">*Subscriptions are disabled by default</p>
    </div>
  );
};

export default SubscriptionTogglerSettings;
