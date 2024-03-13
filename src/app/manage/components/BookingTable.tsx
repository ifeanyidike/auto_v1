'use client';
import React from 'react';
import Table from './Table';
import { type TablePopupData } from '../types/general';
import { type BookingItem } from '~/app/api/booking/logic';

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: BookingItem;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const Bookings = (props: Props) => {
  const getBookingStatus = () => {
    if (props.data.isPaid) return 'Fulfilled';

    const targetDate = new Date().getTime();
    const expDate =
      new Date(props.data.createdAt).getTime() + 7 * 24 * 60 * 60 * 100;
    if (expDate > targetDate) {
      return 'Due';
    }
    return 'Overdue';
  };

  const getName = () => {
    let name = '';
    let firstName = props.data.user?.firstName;
    let lastName = props.data.user?.lastName;

    if (firstName) name += firstName;
    if (!firstName && lastName) name += lastName;

    if (firstName && lastName) name += ` ${lastName}`;

    return name;
  };

  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { name: 'Bookers name', grow: true },
    { title: 'Service name', grow: true },
    { isPaid: 'Is Paid' },
    { isFulfilled: 'Completed' },
    { amount: 'Amount', customWidth: 'w-28' },
    { date: 'Date', customWidth: 'w-24' },
  ];
  const status = getBookingStatus();
  const data = {
    _id: props.placeholderId,
    name: getName(),
    title: props.data.merchantService?.service?.title,
    amount: `₦${props.data.amount}`,
    isPaid: (
      <span
        className={`flex-shrink-0 w-14px  border rounded-full px-3 py-[2px] ${
          props.data.isPaid
            ? 'border-green-700 text-green-700'
            : 'border-red-500 text-red-500'
        }`}
      >
        {props.data.isPaid ? 'Paid' : 'Not Paid'}
      </span>
    ),
    isFulfilled: (
      <span>{props.data.isFullfilled ? 'Completed' : 'Not Completed'}</span>
    ),
    status: (
      <span
        className={`flex-shrink-0 w-12px  border rounded-full px-3 py-1 ${
          status === 'Fulfilled'
            ? 'border-green-500 text-green-500'
            : status === 'Due'
              ? 'border-red-500 text-red-500'
              : status === 'Overdue'
                ? 'border-purple-400 text-purple-400'
                : 'border-pink-600 text-pink-600'
        }`}
      >
        {status}
      </span>
    ),
    date: new Date(props.data.createdAt).toLocaleDateString(),
  };
  return (
    <Table
      _id={props.id}
      index={props.index}
      data={data}
      headers={headers}
      hasAction
      length={props.length}
      popupOpen={props.popupOpen}
      togglePopup={props.togglePopup}
    />
  );
};

export default Bookings;
