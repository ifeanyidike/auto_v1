import Link from 'next/link';
import React from 'react';
import Merchant from '~/app/api/merchant/logic';
import User from '~/app/api/user/logic';
import { Transaction } from '~/server/payment/transaction';
import Util from '~/server/utils';

const SuccessIcon = () => (
  <svg viewBox="0 0 50 50" className="w-60 h-60">
    <circle fill="#25AE88" cx="25" cy="25" r="25" />
    <polyline
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      points="38,15 22,33 12,25 "
    />
  </svg>
);

const SubscriptionConfirmation = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const { slug } = Util.getRouteType();
  const merchant = new Merchant();
  const merchantData = await merchant.getOne({ slug });

  let confirmedTransaction: string | null = null;
  if (searchParams?.reference && searchParams?.user_email && merchantData?.id) {
    const email = searchParams?.user_email as string;
    const reference = searchParams?.reference as string;

    const user = new User();
    const userData = await user.getOne({ email });

    if (userData?.id) {
      const transaction = new Transaction();
      const subscriptionData = {
        merchantId: merchantData.id,
        serviceId: searchParams.serviceId as string,
      };
      confirmedTransaction = await transaction.verify(
        userData.id,
        reference,
        subscriptionData
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center my-14 gap-10">
      {confirmedTransaction === 'Verification successful' ? (
        <>
          <SuccessIcon />
          <p className="font-medium text-lg">
            Success! You have subscribed to the plan{' '}
          </p>
          <div className="flex text-xs gap-8 underline">
            <Link href="/services" className="hover:text-amber-700">
              Subscribe for another plan
            </Link>
            <Link href="/" className="hover:text-amber-700">
              Go to Home page
            </Link>
            <Link href="#" className="hover:text-amber-700">
              Go to your profile
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SubscriptionConfirmation;
