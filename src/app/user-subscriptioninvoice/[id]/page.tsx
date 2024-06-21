import React from 'react';
import Auth0 from '~/server/auth0';
import { notFound } from 'next/navigation';
import TopMenu from '../../manage/components/TopMenu';
import Subscription from '~/app/api/subscription/logic';
import BackToPage from '../../manage/components/BackToPage';
import UserSubscriptionInvoice from './UserSubscriptionInvoice';
import ProtectedPage from '~/server/protectedPage';

const Invoice = async () => {
  const user = await Auth0.findOrCreateAuth0User();

  const userId = user?.id;
  if (!userId) {
    return notFound();
  }

  const subscription = new Subscription();

  const subscriptions = await subscription.findByUser(userId);

  return (
    <div className={`w-full bg-white flex flex-col text-inherit mb-11 z-10`}>
      <TopMenu
        showToggle
        component={
          <div className="flex justify-between items-center w-full">
            <BackToPage
              toHref="/manage/"
              prevTitle="home"
              currTitle="Profile Page"
            />
          </div>
        }
      />

      <div className="w-full bg-gray-400">
        <div className="w-full flex justify-center mx-auto">
          {subscriptions && (
            <UserSubscriptionInvoice  />
          )}
        </div>
      </div>
    </div>
  );
};
export default ProtectedPage(Invoice, {
  returnTo: `/user_profile`,
});
