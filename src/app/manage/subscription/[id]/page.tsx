import React from 'react';
import SubscriptionDetail from './SubscriptionDetail';

const SubscriberDetailPage = () => {
  return (
    <div>
      <h5
        className={`font-semibold w-[300px] h-auto bg-slate-100 text-center text-xl p-4 mb-2 rounded-b-xl text-black shadow-md`}
      >
        Subscription Detail
      </h5>
      <SubscriptionDetail />
    </div>
  );
};

export default SubscriberDetailPage;
