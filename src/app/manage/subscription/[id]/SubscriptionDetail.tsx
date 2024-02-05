'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SubscriptionData } from '~/components/Data';

const SubscriptionDetail = () => {
  const router = useRouter();

  const { id: subscriptionId } = useParams<{ id: string }>();

  const subscription = SubscriptionData.find(
    item => String(item._id) === String(subscriptionId)
  );
  return (
    <div className={`bg-gray-100 min-h-screen p-4`}>
      {subscription ? (
        <div
          className={`max-w-2xl mx-auto hover:bg-white p-6 rounded-lg shadow-md mt-8 bg-slate-100 cursor-pointer min-w-max relative rounded-b-xl`}
        >
          <h2 className="  text-2xl font-bold mb-4 text-[30px] flex items-center w-full h-auto gap-4 bg-white p-4">
            {subscription.name}
          </h2>

          <div className="flex  text-30px flex-col p-4 w-full gap-4 bg-white">
            <div className="text-gray-700">
              <span className="font-bold">Subscription Duration:</span>{' '}
              {subscription.duration}
            </div>
            <div className="text-gray-700">
              <span className="font-bold">Number of Subscriptions:</span>{' '}
              {subscription.qty}
            </div>
            <div className="text-gray-700">
              <span className="font-bold">Number of Subscriptions:</span>{' '}
              {subscription.service}
            </div>
            <div className="text-gray-700">
              <span className="font-bold">Time of Subscription:</span>{' '}
              {subscription.time}
            </div>
            <div className="text-gray-700">
              <span className="font-bold">Date of Subscription:</span>{' '}
              {subscription.date}
            </div>
            <div className="text-gray-700">
              <span className="font-bold">The Current Status:</span>{' '}
              {subscription.status}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700 mt-8">Loading...</div>
      )}
    </div>
  );
};

export default SubscriptionDetail;
