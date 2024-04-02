import { notFound } from 'next/navigation';
import React from 'react';
import ProtectedPage from '~/server/protectedPage';
import SubscriptionFulfillment from '../api/subscription_fulfillment/logic';
import Booking from '../api/booking/logic';
import PageClient from './PageClient';

const Review = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string>;
}) => {
  if (!searchParams?.id) {
    return notFound();
  }

  const fulfillment = new SubscriptionFulfillment();
  const sub = await fulfillment.getOne(searchParams.id);

  const bookingClient = new Booking();
  const booking = await bookingClient.getOne(searchParams.id);

  if (!sub && !booking) return notFound();

  const reviewData = sub?.review || booking?.review;

  let type = sub ? 'subscription' : 'booking';
  return (
    <PageClient
      type={type as 'subscription' | 'booking'}
      itemId={(sub?.id || booking?.id)!}
      existingRating={reviewData?.rating}
      existingDescription={reviewData?.description}
    />
  );
};

export default ProtectedPage(Review, {
  returnTo: '/reviews',
});
