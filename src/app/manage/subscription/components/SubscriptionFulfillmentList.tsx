'use client';

import React, { useState } from 'react';
import OpenLeftIcon from '~/commons/icons/OpenLeftIcon';
import DocumentIcon from '~/commons/icons/DocumentIcon';
import DownloadIcon from '~/commons/icons/DownloadIcon';
import { useClickOutside } from '~/hooks/useClickOutside';
import FilterIcon from '~/commons/icons/FilterIcon';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '~/components/Calendar';
import DropdownSelect from '~/components/DropdownSelect';
import { type TablePopupData } from '../../types/general';
import { type SubscriptionItem } from '~/app/api/subscription/logic';
import Button from '~/components/Button';
import SubscriptionFulfillmentTable from '../../components/SubscriptionFulfillmentTable';
import SubscriptionFulfillmentDetail from './SubscriptionFulfillmentDetail';

type Props = {
  subscriptionId: string;
  plan: SubscriptionItem['plan'];
  fulfillments: SubscriptionItem['fufillments'];
};
type Filter = {
  fulfilledOn: Date;
  paidOn: Date;
  nextCycle: Date;
  hasBeenPaid: boolean;
  hasBeenFulfilled: boolean;
};

type Detail = {
  fulfillment: SubscriptionItem['fufillments'][0];
  subscriptionId: string;
  plan: SubscriptionItem['plan'];
  index: number;
};
const SubscriptionFulfillmentList = (props: Props) => {
  const [popupOpen, togglePopup] = useState<TablePopupData | null>(null);
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<Partial<Filter>>();
  const [fulfillmentList, setFulfillmentList] = useState<
    SubscriptionItem['fufillments']
  >(props.fulfillments);

  const [itemDetail, setItemDetail] = useState<Detail | null>(null);

  const handleFilter = () => {
    console.log('filterData', filterData);
    const newFulfillmentList = props.fulfillments.filter(fulfillment => {
      let condition = true;
      if (filterData?.fulfilledOn) {
        condition &&=
          new Date(fulfillment.fulfilledOn!) ===
          new Date(filterData.fulfilledOn);
      }
      if (filterData?.nextCycle) {
        condition &&=
          new Date(fulfillment.nextCycleStarts) ===
          new Date(filterData.nextCycle);
      }

      if (filterData?.paidOn) {
        condition &&=
          new Date(fulfillment.paidOn!) === new Date(filterData.paidOn);
      }

      if (filterData?.hasBeenPaid !== undefined) {
        condition &&= fulfillment.isPaid === filterData.hasBeenPaid;
      }

      if (filterData?.hasBeenFulfilled !== undefined) {
        condition &&= fulfillment.isFulfilled === filterData.hasBeenFulfilled;
      }

      return condition;
    });

    console.log('newFulfillment', newFulfillmentList);
    setFulfillmentList(newFulfillmentList);
  };

  const popupRef = useClickOutside(() => {
    togglePopup(null);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const heading = {
    id: 'table_header',
  } as unknown as SubscriptionItem['fufillments'][0];

  const renderPopup = () => {
    if (popupOpen === null) {
      return null;
    }

    const popupHeight = 158;
    const spaceBelow = window.innerHeight - popupOpen.position;

    const positionAbove = spaceBelow < popupHeight;

    const top = popupOpen.position - popupHeight;

    const setStyle = positionAbove
      ? { bottom: spaceBelow - 32 + 'px' }
      : { top: top + 'px' };

    return (
      <>
        <div
          ref={popupRef}
          className={`bg-white absolute right-5 w-48 z-50 text-content-normal text-xs flex-flex-col items-center rounded-xl border border-stone-200`}
          style={{
            ...setStyle,
          }}
        >
          <button
            onClick={() => {
              const idx = fulfillmentList.findIndex(b => b.id === popupOpen.id);
              if (idx > -1 && fulfillmentList[idx]) {
                setItemDetail({
                  fulfillment: fulfillmentList[idx]!,
                  subscriptionId: props.subscriptionId,
                  plan: props.plan,
                  index: idx + 1,
                });
              }
            }}
            className="flex gap-2 w-full items-center p-4 hover:bg-stone-200 hover:rounded-t-xl"
          >
            <span>
              <OpenLeftIcon />
            </span>
            <span>View details</span>
          </button>

          <button className="flex gap-2 w-full items-center p-4 hover:bg-stone-200">
            <span>
              <DocumentIcon />
            </span>
            <span>View invoice</span>
          </button>
          <button className="flex gap-2 w-full items-center p-4 hover:bg-stone-200 hover:rounded-b-xl">
            <span>
              <DownloadIcon />
            </span>
            <span>Download</span>
          </button>
        </div>
        <div className="fixed bg-transparent top-0 right-0 w-screen h-screen z-40"></div>
      </>
    );
  };

  const renderDropdown = () => (
    <>
      <div
        ref={dropdownRef}
        className={`bg-white absolute bottom-10 right-0 w-64 z-50 text-content-normal text-xs flex-flex-col items-center rounded-xl border border-stone-200`}
      >
        <button className="flex flex-col gap-1 mb-2 w-full px-3 pt-4">
          <span>Next cycle starts</span>
          <Calendar
            getSelectedDate={date => {
              const newFilterData = { ...(filterData || {}) };
              if (date) {
                newFilterData.nextCycle = date;
              } else {
                newFilterData.nextCycle = undefined;
              }
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex mb-2 gap-2 w-full flex-col px-3 pt-2">
          <span>Has been paid</span>
          <DropdownSelect
            data={[
              { caption: 'Yes', value: true },
              { caption: 'No', value: false },
            ]}
            getValue={(value: boolean) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.hasBeenPaid = value;
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex mb-2 gap-2 w-full flex-col px-3 pt-2">
          <span>Has been completed</span>
          <DropdownSelect
            data={[
              { caption: 'Yes', value: true },
              { caption: 'No', value: false },
            ]}
            getValue={(value: boolean) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.hasBeenFulfilled = value;
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex flex-col gap-1 mb-2 w-full px-3 pt-4">
          <span>Paid On</span>
          <Calendar
            getSelectedDate={date => {
              const newFilterData = { ...(filterData || {}) };
              if (date) {
                newFilterData.paidOn = date;
              } else {
                newFilterData.paidOn = undefined;
              }
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex flex-col gap-1 mb-2 w-full px-3 pt-4">
          <span>Next cycle starts</span>
          <Calendar
            getSelectedDate={date => {
              const newFilterData = { ...(filterData || {}) };
              if (date) {
                newFilterData.fulfilledOn = date;
              } else {
                newFilterData.fulfilledOn = undefined;
              }
              setFilterData(newFilterData);
            }}
          />
        </button>

        <div className="flex items-center justify-center mb-3">
          <Button py="py-1" bgColor="bg-stone-800" onClick={handleFilter}>
            Apply filter
          </Button>
        </div>
      </div>
      <div className="fixed bg-transparent top-0 right-0 w-screen h-screen z-40"></div>
    </>
  );
  return (
    <div className="relative mt-8">
      <div className="relative">
        <button
          onClick={() => toggleDropdown(true)}
          className="text-xs ml-auto flex gap-2 border border-stone-300 bg-white rounded-full px-3 py-2"
        >
          <FilterIcon className="w-4" /> <span>Filter</span>
        </button>
        {dropdownOpen && renderDropdown()}
      </div>

      {itemDetail && (
        <SubscriptionFulfillmentDetail
          onClose={() => setItemDetail(null)}
          item={itemDetail}
          fulfillmentList={fulfillmentList}
          setFulfillmentList={setFulfillmentList}
        />
      )}
      <div className="border-2 relative border-white rounded-xl mt-3 overflow-auto bg-white">
        {[heading, ...fulfillmentList].map((data, index) => (
          <>
            <div
              key={data.id || index}
              className={`hover:bg-gray-100 relative`}
            >
              <SubscriptionFulfillmentTable
                placeholderId={index === 0 ? 'table_header' : index.toString()}
                id={data.id}
                index={index}
                data={data}
                popupOpen={popupOpen}
                togglePopup={togglePopup}
                length={fulfillmentList.length}
              />
            </div>
          </>
        ))}
      </div>

      {popupOpen && renderPopup()}
    </div>
  );
};

export default SubscriptionFulfillmentList;
