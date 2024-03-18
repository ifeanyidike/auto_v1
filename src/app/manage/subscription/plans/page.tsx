import React from 'react';
import Auth0 from '~/server/auth0';
import TopMenu from '../../components/TopMenu';
import BackToPage from '../../components/BackToPage';
import Util from '~/server/utils';
import Merchant from '~/app/api/merchant/logic';
import Image from 'next/image';
import Subscription from '~/app/api/subscription/logic';
import PlanList from '../components/PlanList';
import SubscriptionPlan from '~/app/api/subscription_plan/logic';
import ProtectedPage from '~/server/protectedPage';

const Plans = async () => {
  const { slug } = Util.getRouteType();
  const merchantClient = new Merchant();
  const merchant = await merchantClient.getOne({ slug });

  const merchantId = merchant?.id;
  const subscription = new Subscription();
  const subscriptionList = await subscription.findByMerchant(merchantId!);

  const planClient = new SubscriptionPlan();
  const plans = await planClient.listByMerchant(merchantId!);

  return (
    <div
      className={`h-[300px] w-full flex-1 flex flex-col text-inherit rounded-xl`}
    >
      <TopMenu
        showToggle
        component={
          <div className="flex justify-between items-center w-full">
            <BackToPage
              toHref="/manage/"
              prevTitle="home"
              currTitle="Plans List"
            />
          </div>
        }
      />

      <div className="px-8">
        {!subscriptionList.length ? (
          <div className="text-base font-normal px-8 flex flex-col gap-10 mt-20 max-sm:mt-0 mb-10 items-center">
            <Image
              src="/images/auto_wheel.webp"
              width={400}
              height={400}
              className="w-[400px] h-[400px] max-md:w-[200px] max-md:h-[200px] max-sm:w-[100px] max-sm:h-[100px]"
              alt=""
            />
            <div className="flex flex-col items-center gap-4">
              <p className="w-[600px] max-md:w-full text-center max-sm:text-sm">
                You have no subscription plans for your services.
              </p>
            </div>
          </div>
        ) : (
          <PlanList plans={plans} />
        )}
      </div>
    </div>
  );
};

export default ProtectedPage(Plans, {
  returnTo: '/manage/subscription/plans',
});
