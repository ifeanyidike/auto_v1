'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import UserBookingList from './components/UserBookingList';
import UserSubscriptionList from './components/UserSubscriptionList';
import { type bookingByUserItem } from '~/app/api/booking/logic';

import { type subscriptionByUserItem } from '~/app/api/subscription/logic';

type Props = {
  bookings: bookingByUserItem[];
  subscriptions: subscriptionByUserItem[];
};

const PageClient = ({ bookings, subscriptions }: Props) => {
  const { user } = useUser();
  return (
    <div className="w-full flex flex-col items-center mt-12 px-4 md:px-10">
      <div className="w-full bg-slate-50 rounded-lg shadow-lg -mt-40 overflow-hidden">
        <div className="flex justify-between items-center p-4 md:p-8">
          <div className="flex items-center">
            {user && user.picture ? (
              <Image
                src={user?.picture}
                width={120}
                height={120}
                alt={''}
                className="rounded-full"
              />
            ) : (
              <Image
                src={'/images/avatar.webp'}
                width={120}
                height={120}
                alt={''}
                className="rounded-lg"
              />
            )}
            <div className="ml-4 sm:px-4">
              <p className="text-lg font-semibold md:text-sm">{user?.name}</p>
              <p className="text-gray-600 md:px-4">{user?.email}</p>
            </div>
          </div>
          <div className="hidden md:block border-l border-gray-500 pl-4">
            <p className="text-gray-500">User Info</p>
            <ul className="list-none">
              <li>Bookings: {bookings?.length}</li>
              <li>Subscriptions: {subscriptions?.length}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 space-y-6">
        <div className="w-full">
          <div className="flex justify-left items-center gap-6 mt-10">
            <h1 className="font-semibold text-lg md:text-xl">Bookings</h1>
            <p className="md:hidden block">
              {bookings.length === 1
                ? 'One'
                : bookings.length === 2
                  ? 'Two'
                  : bookings.length === 3
                    ? 'Three'
                    : bookings.length === 4
                      ? 'Four'
                      : bookings.length}
            </p>
          </div>

          <UserBookingList
            bookings={bookings}
            // info={''}
            // location={''}
            // userId={''}
            // amount={''}
            // isPaid={true}
            // usFulfilled={false}
            // paymentMode={''}
            // merchantId={''}
            // merchantSlug={''}
            // data={''}
          />
        </div>
        <div className="w-full p-2">
          <div className="w-full flex gap-4 p-2">
            <h1 className="font-semibold text-lg md:text-xl">Subscriptions</h1>
            <p className="md:hidden block">
              {subscriptions.length === 1
                ? 'One'
                : subscriptions.length === 2
                  ? 'Two'
                  : subscriptions.length === 3
                    ? 'Three'
                    : subscriptions.length === 4
                      ? 'Four'
                      : subscriptions.length}
            </p>
          </div>
          <UserSubscriptionList subscriptions={subscriptions} />
        </div>
      </div>
    </div>
  );
};

export default PageClient;
