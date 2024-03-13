'use server';

import SubscriptionFulfillment from '~/app/api/subscription_fulfillment/logic';

export async function updateSubscriptionStatus(data: {
  id: string;
  isFulfilled: boolean;
  isPaid: boolean;
  alreadyPaid: boolean;
  alreadyFulfilled: boolean;
}) {
  const fulfillment = new SubscriptionFulfillment();
  const getPaidOn = () => {
    if (data.alreadyPaid && data.isPaid) return undefined;

    if (!data.alreadyPaid && data.isPaid) {
      return new Date();
    }
    return null;
  };

  const getFullfilledOn = () => {
    if (data.alreadyFulfilled && data.isFulfilled) return undefined;

    if (!data.alreadyFulfilled && data.isFulfilled) {
      return new Date();
    }
    return null;
  };
  await fulfillment.update(data.id, {
    isFulfilled: data.isFulfilled,
    isPaid: data.isPaid,
    ...(getFullfilledOn() && { fulfilledOn: getFullfilledOn() }),
    ...(getPaidOn() !== undefined && { paidOn: getPaidOn() }),
  });
}
