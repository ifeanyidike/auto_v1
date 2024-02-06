import React from 'react';
import EllipsisIcon from '~/commons/icons/EllipsisIcon';
import Table from './Table';
import { type TablePopupData } from '../types/general';
import { dmSans } from '~/font';

type Props = {
  _id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: Record<string, string>;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const Subscription = (props: Props) => {
  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { name: 'Subscriber', grow: true },
    { duration: 'Duration', grow: true },
    { qty: 'Number' },
    { time: 'Time' },
    { status: 'Status' },
    { date: 'Date', customWidth: 'w-24' },
  ];

  const status = props.data?.status;
  const data = {
    ...props.data,
    status: (
      <span
        className={`flex-shrink-0 w-12px  border rounded-full px-3 py-1 ${
          status === 'Completed'
            ? 'bg-green-100 text-green-600'
            : status === 'In Progress'
              ? 'bg-pink-100 text-pink-600'
              : status === 'Requested'
                ? 'bg-purple-100 text-purple-600'
                : 'bg-red-100 text-pink-600'
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

export default Subscription;
