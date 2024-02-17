import React from 'react';
import Auth0 from '~/server/auth0';
import BookingList from './BookingList';
import TopMenu from '../components/TopMenu';
import BackToPage from '../components/BackToPage';

const Booking = async () => {
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
              currTitle="Bookings List"
            />
          </div>
        }
      />

      <div className="px-8">
        <BookingList />
      </div>
    </div>
  );
};

export default Auth0.ProtectedPage(Booking, { returnTo: '/manage/booking' });
