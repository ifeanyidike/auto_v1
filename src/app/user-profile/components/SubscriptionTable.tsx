import React from 'react';
import Table from '../../manage/components/Table';
import { type TablePopupData } from '../../manage/types/general';
import Image from 'next/image';
import { type subscriptionByUserItem } from '~/app/api/subscription/logic';

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: subscriptionByUserItem;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const Subscription = (props: Props) => {
  const items = props.data;
  const getName = () => {
    let name = '';
    let firstName = items.merchant?.name;
    // let lastName = items.user?.lastName;
    console.log(items.plan);
    if (firstName) name += firstName;
    // if (!firstName && lastName) name += lastName;

    // if (firstName && lastName) name += ` ${lastName}`;

    return name;
  };
  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { name: 'Merchant', grow: true },
    { serviceName: 'Service name', grow: true },
    { serviceType: 'Service type' },
    { interval: 'Interval', customWidth: 'w-24' },
    { pricingMode: 'Pricing Mode', customWidth: 'w-40' },
    { plan_code: 'Plan Code', customWidth: 'w-24' },
    { status: 'Status', customWidth: 'w-24' },
    { date: 'Date', customWidth: 'w-24' },
  ];
  console.log(items.merchant);
  const data = {
    _id: items.id.slice(-5),
    name: getName(),
    serviceName: items.merchantService?.service?.title,
    serviceType: items.merchantService?.service?.type,
    interval: <span className="uppercase text-xs">{items.plan?.interval}</span>,
    plan_code: items.plan?.code,
    pricingMode: items.merchantService?.pricingMode,
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
