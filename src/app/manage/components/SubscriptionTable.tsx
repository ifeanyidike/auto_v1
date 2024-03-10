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
  data: SubscriptionItem;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const Subscription = (props: Props) => {
  const items = props.data;
  const getName = () => {
    let name = '';
    let firstName = items.user?.firstName;
    let lastName = items.user?.lastName;

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
    { name: 'Subscriber', grow: true },
    { serviceName: 'Service name', grow: true },
    { serviceType: 'Service type' },
    { interval: 'Interval', customWidth: 'w-24' },
    { plan_code: 'Plan Code', customWidth: 'w-40' },
    { status: 'Status', customWidth: 'w-24' },
    { date: 'Date', customWidth: 'w-24' },
  ];

  const data = {
    _id: props.placeholderId,
    name: getName(),
    serviceName: items.merchantService?.service?.title,
    serviceType: items.merchantService?.service?.type,
    interval: <span className="uppercase text-xs">{items.plan?.interval}</span>,
    plan_code: items.plan?.code,
    status: items.status,
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

export default Subscription;
