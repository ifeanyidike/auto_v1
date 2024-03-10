import React, { useState } from 'react';
import CloseIcon from '~/commons/icons/CloseIcon';
import SubscriptionList from './SubscriptionList';
import { type PlanByMerchant } from '~/app/api/subscription_plan/logic';
import { type SubscriptionItem } from '~/app/api/subscription/logic';
import { dmSans } from '~/font';

type Props = {
  item: PlanByMerchant;
  onClose: () => void;
};

const PlanDetail = (props: Props) => {
  const [closing, setClosing] = useState(false);

  React.useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      props.onClose();
      setClosing(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [closing]);

  return (
    <div
      className={`${
        !closing ? 'animate-slideIn' : 'animate-slideOut'
      } w-[70%] bg-gray-50 fixed right-0 top-[75px] h-[90.5%] z-[51] rounded-l-3xl px-14 py-4 max-md:w-full opacity-0 transition-opacity duration-200 ease-in-out ${
        props.item ? 'opacity-100' : ''
      } shadow-right-bottom-md shadow-black`}
    >
      {' '}
      <div
        className="absolute right-10 cursor-pointer"
        onClick={() => setClosing(true)}
      >
        <CloseIcon />
      </div>
      <div className="text-center mb-4 h-14">
        <h2 className={` text-xl ${dmSans.className}`}>
          Subscription details for plan {props.item.code}
        </h2>
      </div>
      <SubscriptionList
        subscriptions={props.item.subscription as unknown as SubscriptionItem[]}
      />
    </div>
  );
};

export default PlanDetail;
