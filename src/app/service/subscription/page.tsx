import React from 'react';
import Auth0 from '~/server/auth0';
import Image from 'next/image';
import PlanList from './components/PlanList';
import DisplayPlanComponent from './components/DisplayPlanComponent';
import MerchantService from '~/app/api/merchant_service/logic';
import User from '~/app/api/user/logic';
import Link from 'next/link';
import ProtectedPage from '~/server/protectedPage';
import { dmSans } from '~/font';

const Subscription = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const id = searchParams?.service_id as string;
  // @ts-ignore
  globalThis.serviceId = undefined;

  const user = await Auth0.findOrCreateAuth0User();

  if (!id || !user || !user?.id) {
    return (
      <div className="text-2xl text-center flex flex-col h-fit justify-center items-center gap-5 my-7">
        <Image
          src="/images/oops1.png"
          width={1220}
          height={462}
          alt="Oops!"
        ></Image>
        <span className={`${dmSans.className}`}>
          {!id
            ? 'Please choose the merchant service to subscribe!'
            : !user
              ? 'You need to login to proceed'
              : 'User does not exist'}
        </span>
      </div>
    );
  }

  const merchantService = new MerchantService();
  const service = await merchantService.getOne({
    id,
    userId: user?.id,
  });

  if (user.email === service?.merchant?.email) {
    return (
      <div className="text-2xl text-center flex flex-col h-fit justify-center items-center gap-5 my-7">
        <Image
          src="/images/oops1.png"
          width={1220}
          height={462}
          alt="Oops!"
        ></Image>
        <span className={`mt-5 ${dmSans.className}`}>
          You cannot subscribe to your own service!
        </span>
      </div>
    );
  }

  if (!service?.subscriptionPlans?.length) {
    return (
      <div className="text-2xl text-center flex flex-col h-fit justify-center items-center gap-5 my-7">
        <Image
          src="/images/oops1.png"
          width={1220}
          height={462}
          alt="Oops!"
        ></Image>
        <span className={`mt-5 ${dmSans.className}`}>
          The merchant do not have any active subscription plan for this
          service!
        </span>
      </div>
    );
  }

  const getUserSubscriptions = () => {
    return service?.subscriptions?.filter(s => s.userId === user?.id) || [];
  };
  const userSubscriptions = getUserSubscriptions();

  if (userSubscriptions?.length! >= service?.servicePricing?.length!) {
    return (
      <div className="text-2xl font-medium text-center flex flex-col h-fit justify-center items-center gap-8 my-7">
        <Image
          src="/images/congrats.png"
          width={600}
          height={357}
          alt="Oops!"
        ></Image>
        <span className={`mb-8 ${dmSans.className}`}>
          Congratulations, you have already subscribed to all plans in this
          service.
        </span>
        <div className="flex text-xs gap-8 underline">
          <Link href="/services" className="hover:text-amber-700">
            Subscribe for another service
          </Link>
          <Link href="/" className="hover:text-amber-700">
            Return to Home page
          </Link>
          <Link href="#" className="hover:text-amber-700">
            Go to your profile
          </Link>
        </div>
      </div>
    );
  }

  if (service?.pricingMode === 'FIXED') {
    return (
      <PlanList
        selectedPrice={service?.servicePricing?.[0]!}
        service={service}
      />
    );
  }

  return (
    <DisplayPlanComponent service={service} subscriptions={userSubscriptions} />
  );
};

export default ProtectedPage(Subscription, {
  // @ts-ignore
  returnTo: `/service/subscription${
    // @ts-ignore
    globalThis.serviceId ? `?service_id=${globalThis.serviceId}` : ''
  }`,
});
