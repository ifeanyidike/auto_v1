import React from 'react';
import Auth0 from '~/server/auth0';
import Booking from './components/Bookings';
import { BookingData } from '../../components/Data';

const Home = async () => {
  return (
    <div
      className={`h-[300px] w-full flex-1 flex flex-col bg-#e9ecf0 text-inherit rounded-xl p-0 shadow-2xl m-[10px]`}
    >
      <h5 className={`border-b-2 border-#d1d5db-500 p-2 mb-2 text-[13px]`}>
        Bookings
      </h5>
      <div className="flex w-full gap-4 p-2 font-bold text-[10px] ">
        <div className="flex-shrink-0 w-16 ">Booking Id</div>
        <div className="flex-shrink-0 w-32">Booker Name</div>
        <div className="flex-shrink-0 w-16">Image</div>
        <div className="flex-shrink-0 w-32">Title</div>
        <div className="flex-shrink-0 w-32">Category</div>
        <div className="flex-shrink-0 w-24 text-center">Status</div>
        <div className="flex-shrink-0 w-24 text-center">Date</div>
        <div className="flex-shrink-0 w-32 text-center">Action</div>
      </div>
      {BookingData.map(b => (
        <div key={b._id} className={`hover:bg-gray-100`}>
          <Booking
            _id={b._id}
            imgSrc={b.imgSrc}
            name={b.name}
            title={b.title}
            category={b.category}
            status={b.status}
            date={b.date}
            action={b.action}
          />
        </div>
      ))}
    </div>
  );
};

export default Auth0.ProtectedPage(Home, { returnTo: '/manage' });
