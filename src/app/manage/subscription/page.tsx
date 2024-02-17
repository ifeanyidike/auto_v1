import React from 'react';
import Auth0 from '~/server/auth0';
import SubscriptionList from './SubscriptionList';
import TopMenu from '../components/TopMenu';
import BackToPage from '../components/BackToPage';

const Subscription = async () => {
  return (
    <div
      className={`h-[300px] w-full flex-1 flex flex-col text-inherit rounded-xl `}
    >
      <TopMenu
        showToggle
        component={
          <div className="flex justify-between items-center w-full">
            <BackToPage
              toHref="/manage"
              prevTitle="Home"
              currTitle="Subscriptions List"
            />
          </div>
        }
      />

      <div className="px-8">
        <SubscriptionList />
      </div>
    </div>
  );
};

export default Auth0.ProtectedPage(Subscription, {
  returnTo: '/manage/subscription',
});
