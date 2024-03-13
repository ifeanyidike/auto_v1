'use client';
import React from 'react';
import Table from './Table';
import { type TablePopupData } from '../types/general';
import { type PlanByMerchant } from '~/app/api/subscription_plan/logic';

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: PlanByMerchant;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const PlanTable = (props: Props) => {
  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { name: 'Plan Name', grow: true },
    { brand: 'Brand', grow: true },
    { interval: 'Interval', grow: true },
    { code: 'Code', grow: true },
  ];
  const data = {
    _id: props.placeholderId,
    name: `${props.data.merchantService?.service?.title} - ${props.data.autoBrand} - ${props.data.interval}`,
    brand: props.data?.autoBrand,
    interval: props.data?.interval,
    code: props.data?.code,
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

export default PlanTable;
