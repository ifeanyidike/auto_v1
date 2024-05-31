import React from 'react';
import TopMenu from '../../manage/components/TopMenu';
import Booking from '~/app/api/booking/logic';
import BackToPage from '../../manage/components/BackToPage';
import UserBookingInvoice from './UserBookingInvoice';

export default async function Invoice(data: {
  userId: string;
  info: string;
  location: string;
  amount: string;
  status: string;
  service: string;
  discounts: string;
  merchantServiceId: string;
  planId: string;
}) {
  const { userId } = data;

  const booking = new Booking();

  const bookings = await booking.findByUser(userId);

  return (
    <div className={`w-full bg-white flex flex-col text-inherit mb-11 z-10`}>
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

      <div className="w-full bg-gray-400">
        <div className="w-full flex justify-center mx-auto">
          {bookings && <UserBookingInvoice bookings={bookings} />}
        </div>
      </div>
    </div>
  );
}
