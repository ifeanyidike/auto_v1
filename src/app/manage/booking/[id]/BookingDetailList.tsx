'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { BookingData } from '~/components/Data';

const BookingDetailList = () => {
  const router = useRouter();

  const { id: bookingId } = useParams<{ id: string }>();

  const booking = BookingData.find(
    item => String(item._id) === String(bookingId)
  );
  return (
    <div className={`bg-gray-100 min-h-screen p-4`}>
      {booking ? (
        <div
          className={`max-w-2xl mx-auto hover:bg-white p-6 rounded-lg shadow-md mt-8 bg-slate-100 cursor-pointer min-w-max relative rounded-b-xl`}
        >
          <h2 className="  text-2xl font-bold mb-4 text-[30px] flex items-center w-full h-auto gap-4 bg-white p-4">
            {booking.name}
          </h2>
          <div className={`flex`}>
            <div className="flex  text-30px flex-col p-4 w-full gap-4 bg-white">
              <Image
                src={booking.image}
                width={300}
                height={300}
                alt="Booked Service Image"
                className="rounded-md border border-gray-300 h-auto"
              />
            </div>
            <div className="flex  text-30px flex-col p-4 w-full gap-4 bg-white">
              <div className="text-gray-700">
                <span className="font-bold">Booked Service:</span>{' '}
                {booking.title}
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Service Category:</span>{' '}
                {booking.category}
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Date of booking:</span>{' '}
                {booking.date}
              </div>
              <div className="text-gray-700">
                <span className="font-bold">The Current Status:</span>{' '}
                {booking.status}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700 mt-8">Loading...</div>
      )}
    </div>
  );
};

export default BookingDetailList;
