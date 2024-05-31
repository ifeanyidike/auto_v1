'use client';
import React from 'react';
import Table from '../../manage/components/Table';
import { type TablePopupData } from '../../manage/types/general';
import { type bookingByUserItem } from '~/app/api/booking/logic';

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: bookingByUserItem;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const BookingTable = (props: Props) => {
  const items = props.data;
  const getName = () => {
    let name = '';
    let merchantName = items.merchant?.name;

    if (merchantName) name += merchantName;

    return name;
  };

  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { name: 'Merchant name', grow: true },
    { title: 'Service name', grow: true },
    { location: 'Location', grow: true },
    { paymentMode: 'Payment Mode', customWidth: 'w-28' },
    { isPaid: 'Is Paid', customWidth: 'w-24' },
    { isFulfilled: 'Completed' },
    { amount: 'Amount', customWidth: 'w-28' },
    { date: 'Date', customWidth: 'w-24' },
  ];
  const data = {
    _id: items.id.slice(-5),
    name: getName(),
    title: items.merchantService?.service?.title,
    location: items.location,
    paymentMode: `${
      items.paymentMode === 'online' ? 'Online' : items.paymentMode
    }`,
    amount: `₦${items.amount}`,
    isPaid: (
      <span
        className={`flex-shrink-0 w-14px  border rounded-full px-3 py-[2px] ${
          items.isPaid
            ? 'border-green-700 text-green-700'
            : 'border-red-500 text-red-500'
        }`}
      >
        {items.isPaid ? 'Paid' : 'Not Paid'}
      </span>
    ),
    isFulfilled: (
      <span>{items.isFullfilled ? 'Completed' : 'Not Completed'}</span>
    ),
    date: new Date(items.createdAt).toLocaleDateString(),
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

export default BookingTable;
