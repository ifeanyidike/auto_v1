'use client';
import React from 'react';
import Table from './Table';
import { type TablePopupData } from '../types/general';

type Transaction = {
  id: string;
  serviceName: string;
  serviceType: string;
  imgUrl: string;
  userName: string;
  email: string | undefined;
  amount: number;
  type: string;
  status: string;
  date: Date;
};

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: Transaction;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const HomeTransactionTable = (props: Props) => {
  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { userName: 'Customer Name', grow: true },
    { serviceName: 'Service Name', grow: true },
    { serviceType: 'Category' },
    { type: 'Transaction type' },
    { status: 'Status', customWidth: 'w-36' },
    { date: 'Date', customWidth: 'w-24' },
  ];
  const data = {
    _id: props.placeholderId,
    ...props.data,
    date: new Date().toLocaleDateString(),
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

export default HomeTransactionTable;
