'use client';
import React from 'react';
import Table from './Table';
import { type TablePopupData } from '../types/general';

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  amountHeader: string;
  data: {
    firstName?: string;
    lastName?: string;
    email: string;
    amount: number;
  };
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const ByUserTable = (props: Props) => {
  const getName = () => {
    let name = '';
    let firstName = props.data?.firstName;
    let lastName = props.data?.lastName;

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
    { email: 'Email', grow: true },
    { total: props.amountHeader },
  ];
  const data = {
    _id: props.placeholderId,
    name: getName(),
    email: props.data?.email,
    total: (
      <div className="font-mono">₦{props.data.amount?.toLocaleString()}</div>
    ),
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

export default ByUserTable;
