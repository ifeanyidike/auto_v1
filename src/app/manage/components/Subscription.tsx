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
    { serviceType: 'Service type', grow: true },
    { interval: 'Interval', customWidth: 'w-24' },
    { plan_code: 'Plan Code', customWidth: 'w-32' },
    { status: 'Status', customWidth: 'w-24' },
    { date: 'Date', customWidth: 'w-32' },
  ];

  const status = props.data?.status;
  // const data = {
  //   ...props.data,
  //   status: (
  //     <span
  //       className={`flex-shrink-0 w-12px  border rounded-full px-3 py-1 ${
  //         status === 'Completed'
  //           ? 'bg-green-100 text-green-600'
  //           : status === 'In Progress'
  //             ? 'bg-pink-100 text-pink-600'
  //             : status === 'Requested'
  //               ? 'bg-purple-100 text-purple-600'
  //               : 'bg-red-100 text-pink-600'
  //       }`}
  //     >
  //       {status}
  //     </span>
  //   ),
  // };

  const data = {
    _id: props.placeholderId,
    name: getName(),
    serviceName: items.merchantService?.service?.title,
    serviceType: items.merchantService?.service?.type,
    interval: items.plan?.interval,
    plan_code: items.plan?.code,
    status: items.status,
    date: new Date(items.createdAt).toString(),
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
