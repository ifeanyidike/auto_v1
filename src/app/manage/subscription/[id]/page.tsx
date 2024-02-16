import React from 'react';
import SubscriptionDetail from './SubscriptionDetail';
import TopMenu from '../../components/TopMenu';
import BackToPage from '../../components/BackToPage';

const SubscriberDetailPage = () => {
  return (
    <div>
      <TopMenu
        showToggle
        component={
          <div className="flex justify-between items-center w-full">
            <BackToPage
              toHref="/manage/subscription"
              prevTitle="Subscriptions List"
              currTitle="Subscription Detail"
            />
          </div>
        }
      />

      <SubscriptionDetail />
    </div>
  );
};

export default SubscriberDetailPage;
