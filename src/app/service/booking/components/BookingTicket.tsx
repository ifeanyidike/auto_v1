import React from 'react';
import { dmSans } from '~/font';
type Booking = {
  id: string;
  merchantServiceId: string;
  merchantId: string;
  userId: string;
  amount: number;
  isOutsideWork: boolean;
  location: string | null;
  info: string | null;
  paymentMode: string;
  isPaid: boolean;
  isFulfilled: boolean;
  createdAt: Date;
  updatedAt: Date;
};
type Props = {
  booking: Booking;
  serviceTitle?: string;
  serviceType?: string;
};
const BookingTicket = (props: Props) => {
  const { booking, serviceTitle, serviceType } = props;
  return (
    <div
      className={`flex flex-col gap-[14px] shadow shadow-gray-200 border border-gray-200 rounded-2xl pb-6 ${dmSans.className}`}
    >
      <p className="text-center mb-2 font-semibold border-b border-gray-200 py-4 px-8">
        Ticket
      </p>
      <div className="flex gap-2 text-sm px-8">
        <span className="font-medium w-32">Ticket ID</span>{' '}
        <span className="text-sm">{booking?.id}</span>
      </div>
      <div className="flex gap-2 text-sm px-8">
        <span className="font-medium w-32">Service Name</span>{' '}
        <span className="text-sm">{serviceTitle}</span>
      </div>
      <div className="flex gap-2 text-sm px-8">
        <span className="font-medium w-32">Service Type</span>{' '}
        <span className="text-sm">{serviceType}</span>
      </div>
      <div className="flex gap-2 text-sm px-8">
        <span className="font-medium w-32">Outside work</span>{' '}
        <span className="text-sm">{booking?.isOutsideWork ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex gap-2 text-sm px-8">
        <span className="font-medium w-32">Location</span>{' '}
        <span className="text-sm">{booking?.location || 'In shop'}</span>
      </div>
      <div className="flex gap-2 text-sm px-8">
        <span className="font-medium w-32">Amount</span>{' '}
        <span className="text-sm font-mono">
          {`₦${Number(booking?.amount)?.toLocaleString()}`}
        </span>
      </div>
      <div className="flex gap-2 text-sm px-8">
        <span className="font-medium w-32">Is Paid</span>{' '}
        <span className="text-sm">{booking?.isPaid ? 'Yes' : 'No'}</span>
      </div>
      <div className="flex gap-2 text-sm px-8">
        <span className="font-medium w-32">Booked On</span>{' '}
        <span className="text-sm">
          {new Date(booking?.createdAt!).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default BookingTicket;
