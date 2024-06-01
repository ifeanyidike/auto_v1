import React from 'react';
import PageClient from './PageClient';
import Auth0 from '~/server/auth0';
import TopMenu from '../manage/components/TopMenu';
import Booking, { type BookingItem } from '~/app/api/booking/logic';
import { notFound } from 'next/navigation';
import Subscription, {
  type SubscriptionItem,
} from '~/app/api/subscription/logic';
import BackToPage from '../manage/components/BackToPage';
import { Transaction } from '~/server/payment/transaction';
import Util from '~/server/utils';
import ProtectedPage from '~/server/protectedPage';

const UserProfilePage = async () => {
  const user = await Auth0.findOrCreateAuth0User();

  const userId = user?.id;

  if (!userId) {
    return notFound();
  }

  const userTransaction = new Transaction();

  const booking = new Booking();

  const bookings = await booking.findByUser(userId);

  const subscription = new Subscription();

  const subscriptions = await subscription.findByUser(userId);

  const transactionsByDate = Util.sortTransactionsByDate(
    subscriptions as unknown as SubscriptionItem[],
    bookings as unknown as BookingItem[]
  );

  const subscriptionsByMonth = Util.organizeSubscriptionByMonth(
    subscriptions as unknown as SubscriptionItem[]
  );

  const bookingsByMonth = Util.organizeBookingByMonth(
    bookings as unknown as BookingItem[]
  );

  return (
    <div className={`w-full bg-white flex flex-col text-inherit mb-11`}>
      {/* <MainMenu /> */}
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

      <div className="w-full relative">
        <div
          className="bg-cover bg-center h-48"
          style={{
            backgroundImage: `url('/images/userprofile-underwater.jpg')`,
          }}
        ></div>
        <div className="w-full flex justify-center mx-auto">
          <PageClient bookings={bookings} subscriptions={subscriptions} />
        </div>
      </div>
    </div>
  );
};
export default ProtectedPage(UserProfilePage, {
  returnTo: `/user_profile`,
});
