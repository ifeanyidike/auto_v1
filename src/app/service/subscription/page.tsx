import React from 'react';
import Auth0 from '~/server/auth0';
import Image from 'next/image';
import PlanList from './components/PlanList';
import DisplayPlanComponent from './components/DisplayPlanComponent';
import MerchantService from '~/app/api/merchant_service/logic';
import User from '~/app/api/user/logic';
import Link from 'next/link';

const Subscription = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const id = searchParams?.id as string;

  const sessionUser = await Auth0.getSessionUser();
  const userClient = new User();
  const user = await userClient.getOne({ email: sessionUser.email });

  if (!id || !sessionUser || !user?.id) {
    return (
      <div className="font-mono text-4xl text-center flex flex-col h-fit justify-center items-center gap-5 my-7">
        <Image
          src="/images/oops1.png"
          width={1220}
          height={462}
          alt="Oops!"
        ></Image>
        <span>
          {!id
            ? 'Please choose the merchant service to subscribe!'
            : !sessionUser
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

  if (!service?.subscriptionPlans?.length) {
    return (
      <div className="font-mono text-3xl text-center flex flex-col h-fit justify-center items-center gap-5 my-7">
        <Image
          src="/images/oops1.png"
          width={1220}
          height={462}
          alt="Oops!"
        ></Image>
        <span className="mt-5">
          The merchant do not have any active subscription plan for this
          service!
        </span>
      </div>
    );
  }

  if (service?.subscriptions?.length! >= service?.pricing?.length!) {
    return (
      <div className="font-mono text-xl font-medium text-center flex flex-col h-fit justify-center items-center gap-8 my-7">
        <Image
          src="/images/congrats.png"
          width={600}
          height={357}
          alt="Oops!"
        ></Image>
        <span className="mb-8">
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
      <PlanList selectedPrice={service?.pricing?.[0]!} service={service} />
    );
  }

  return <DisplayPlanComponent service={service} />;
};

export default Auth0.ProtectedPage()(Subscription, {
  returnTo: '/service/subscription',
});
