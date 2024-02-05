import React from 'react';
import BookingDetailList from './BookingDetailList';

const page = () => {
  return (
    <div>
      <h5
        className={`font-semibold w-[300px] h-auto bg-slate-100 text-center text-xl p-4 mb-2 rounded-b-xl text-black shadow-md`}
      >
        Booking Detail
      </h5>
      <BookingDetailList />
    </div>
  );
};

export default page;
