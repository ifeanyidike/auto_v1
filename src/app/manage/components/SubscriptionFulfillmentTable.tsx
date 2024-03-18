import React from 'react';
import Table from './Table';
import { type TablePopupData } from '../types/general';
import { type SubscriptionItem } from '~/app/api/subscription/logic';

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: SubscriptionItem['fufillments'][0];
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const SubscriptionFulfillmentTable = (props: Props) => {
  const items = props.data;

  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { nextCycleStarts: 'Next Billing Cycle', grow: true },
    { isPaid: 'Has been paid' },
    { isFulfilled: 'Has been fulfilled', customWidth: 'w-24' },
    { paidOn: 'Paid On', customWidth: 'w-40' },
    { fulfilledOn: 'Fulfilled On', customWidth: 'w-24' },
  ];

  const data = {
    _id: props.placeholderId,
    nextCycleStarts: new Date(items.nextCycleStarts).toLocaleDateString(),
    isPaid: items.isPaid ? 'Yes' : 'No',
    isFulfilled: items.isFulfilled ? 'Yes' : 'No',
    paidOn: items.paidOn ? new Date(items.paidOn).toLocaleDateString() : '_',
    fulfilledOn: items.fulfilledOn
      ? new Date(items.fulfilledOn).toLocaleDateString()
      : '_',
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

export default SubscriptionFulfillmentTable;
