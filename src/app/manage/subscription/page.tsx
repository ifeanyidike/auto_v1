import React from 'react';
import Auth0 from '~/server/auth0';
import SubscriptionList from './SubscriptionList';

const Subscription = async () => {
  return (
    <div
      className={`h-[300px] w-full flex-1 flex flex-col text-inherit rounded-xl px-8`}
    >
      <h5 className={`font-semibold text-xl p-2 mb-2`}>Subscriptions</h5>

      <SubscriptionList />
    </div>
  );
};

export default Auth0.ProtectedPage(Subscription, {
  returnTo: '/manage/subscription',
});
