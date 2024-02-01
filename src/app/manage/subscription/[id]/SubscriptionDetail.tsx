'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubscriptionData } from '~/components/Data';

const SubscriptionDetail = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('_id');
  const subscription = SubscriptionData.find(
    item => String(item._id) === String(id)
  );
  return (
    <div>
      {subscription ? (
        <div
          className={`flex items-center w-300 gap-4 text-xs hover:bg-slate-100 cursor-pointer min-w-max relative rounded-b-xl`}
        >
          <h2 className="text-[30px] flex items-center w-auto h-auto gap-4 bg-white p-4">
            {subscription.name}
          </h2>

          <div className="flex  text-30px flex-col p-4  bg-white">
            <div> Subscription Duration is Monthly</div>
            <div> The list of subscritions are Monthly</div>
            <div> The subscription was made on 11/11/2023 </div>
            <div> At Exactly 11:25:00 AM</div>
            <div>The subscription is completed</div>
          </div>
        </div>
      ) : (
        <div>Loding ...</div>
      )}
    </div>
  );
};

export default SubscriptionDetail;
