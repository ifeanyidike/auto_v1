import React from 'react';
import BookingDetailList from './BookingDetailList';
import BackToPage from '../../components/BackToPage';
import TopMenu from '../../components/TopMenu';

const page = () => {
  return (
    <div>
      <TopMenu
        showToggle
        component={
          <div className="flex justify-between items-center w-full">
            <BackToPage
              toHref="/manage/booking"
              prevTitle="Booking List"
              currTitle="Booking Details"
            />
          </div>
        }
      />

      <BookingDetailList />
    </div>
  );
};

export default page;
