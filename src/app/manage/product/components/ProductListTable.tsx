'use client';
import React from 'react';
import { type TablePopupData } from '../../types/general';
import Table from '../../components/Table';
import { type NewMerchantServiceType } from '~/types/utils';

type Props = {
  placeholderId: string;
  id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  data: NewMerchantServiceType;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
};

const ProductListTable = (props: Props) => {
  const _mode = props.data.pricingMode;
  const mode = _mode === 'SUV_SEDAN' ? 'SUV/SEDAN' : _mode;
  const headers = [
    {
      _id: 'id',
      customWidth: 'w-16',
    },
    { serviceName: 'Service Name', grow: true, customWidth: 'w-64' },
    { serviceType: 'Service Type', grow: true, customWidth: 'w-48' },
    { pricingMode: 'Pricing Mode', grow: true, customWidth: 'w-32' },
    { noOfBrands: 'Covered Brands', grow: true, customWidth: 'w-32' },
    { status: 'Status', customWidth: 'w-36' },
    { date: 'Last Updated', customWidth: 'w-36' },
  ];
  const status = props.data.isDraft ? 'Draft' : 'Published';
  const data = {
    _id: props.placeholderId,
    serviceName: props.data.service?.title,
    serviceType: props.data.service?.type,
    pricingMode: mode ?? '_',
    noOfBrands: (
      <span className="flex w-full justify-end pr-3">
        {props.data.pricing?.length ? props.data.pricing?.length : '_'}
      </span>
    ),
    status: (
      <span
        className={`flex w-20 items-center justify-center border rounded-full py-1 ${
          status === 'Published'
            ? 'border-green-500 text-green-500'
            : 'border-red-900 text-red-900'
        }`}
      >
        {status}
      </span>
    ),
    date: new Date(props.data.updatedAt).toDateString(),
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

export default ProductListTable;
