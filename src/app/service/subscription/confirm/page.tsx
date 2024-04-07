import React from 'react';
import RedirectLinks from '../../components/RedirectLinks';
import SuccessIcon from '~/commons/icons/SuccessIcon';
import { Transaction } from '~/server/payment/transaction';
import { unstable_noStore as noStore } from 'next/cache';

const SubscriptionConfirmation = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  noStore();
  const { reference, user_email, service } = (searchParams || {}) as Record<
    string,
    string
  >;
  const transaction = new Transaction();
  const data = await transaction.verifyTransaction(
    reference,
    user_email,
    service
  );

  return (
    <div className="flex flex-col items-center justify-center my-14 gap-10">
      {data.confirmation ? (
        <>
          <SuccessIcon />
          <p className="font-medium text-lg">
            Success! You have subscribed to the plan{' '}
          </p>
          <RedirectLinks />
        </>
      ) : (
        <div>Sorry the subscription is not successful</div>
      )}
    </div>
  );
};

export default SubscriptionConfirmation;
