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
  const getName = () => {
    let name = '';
    let firstName = props.data.user?.firstName;
    let lastName = props.data.user?.lastName;
    if (!firstName && !lastName) return props.data.user?.email;

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
