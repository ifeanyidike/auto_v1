'use client';
import React from 'react';
import { type TablePopupData } from '../../types/general';
import Table from '../../components/Table';
import { type MerchantType } from '~/app/api/merchant/logic';

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: MerchantType['discounts'][0];
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const DiscountTable = (props: Props) => {
  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { type: 'Type', grow: true },
    { code: 'Code', grow: true },
    { value: 'Value' },
    { expiresOn: 'Expires On', customWidth: 'w-24' },
  ];
  const data = {
    _id: props.placeholderId,
    code: props.data.code,
    type: <span className="capitalize">{props.data.type}</span>,
    value:
      props.data.type === 'percentage'
        ? `${props.data.value}%`
        : `₦${props.data.value}`,
    expiresOn: props.data.expiresOn
      ? new Date(props.data.expiresOn).toLocaleDateString()
      : 'No expiry',
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

export default DiscountTable;
