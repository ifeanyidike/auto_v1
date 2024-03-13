import React from 'react';
import BookingInvoice from './BookingInvoice';
import TopMenu from '../../../components/TopMenu';
import BackToPage from '../../../components/BackToPage';

const Invoice = () => {
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
              currTitle="Booking Invoice"
            />
          </div>
        }
      />

      <div className="px-8">
        <BookingInvoice />
      </div>
    </div>
  );
};

export default Invoice;
