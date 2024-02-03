'use client';
import Image from 'next/image';
import React from 'react';
import Table from './Table';
import { type TablePopupData } from '../types/general';

type Props = {
  _id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: Record<string, string>;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const HomeTransactionTable = (props: Props) => {
  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { title: 'Customer Name', grow: true },
    { title: 'Title', grow: true },
    { category: 'Category' },
    { mode: 'Mode' },
    { status: 'Status' },
    { date: 'Date', customWidth: 'w-24' },
  ];
  const status = props.data?.status;
  const data = {
    ...props.data,
    image: (
      <Image
        width={25}
        height={25}
        src={props.data.image!}
        alt="service image"
      />
    ),
    status: (
      <span
        className={`flex-shrink-0 w-12px  border rounded-full px-3 py-1 ${
          status === 'Completed'
            ? 'border-green-500 text-green-500'
            : status === 'In progress'
              ? 'border-red-500 text-red-500'
              : status === 'Requested'
                ? 'border-purple-400 text-purple-400'
                : 'border-pink-600 text-pink-600'
        }`}
      >
        {status}
      </span>
    ),
  };
  return (
    <Table
      _id={props._id}
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

export default HomeTransactionTable;
