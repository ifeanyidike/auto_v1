'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Subscription from '../components/Subscription';
import { SubscriptionData } from '~/components/Data';
import Link from 'next/link';
import OpenLeftIcon from '~/commons/icons/OpenLeftIcon';
import DocumentIcon from '~/commons/icons/DocumentIcon';
import DownloadIcon from '~/commons/icons/DownloadIcon';
import { useClickOutside } from '~/hooks/useClickOutside';
import FilterIcon from '~/commons/icons/FilterIcon';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '~/components/Calendar';
import DropdownSelect from '~/components/DropdownSelect';
import { type TablePopupData } from '../types/general';

const SubscriptionList = () => {
  const [popupOpen, togglePopup] = useState<TablePopupData | null>(null);
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);

  const router = useRouter();

  const { id: subscriptionId } = useParams<{ id: string }>();

  const popupRef = useClickOutside(() => {
    togglePopup(null);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const heading = {
    _id: 'table_header',
  } as unknown as (typeof SubscriptionData)[0];

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
          <Link href={`/manage/subscription/${subscriptionId}`}>
            <a className="flex gap-2 w-full items-center p-4 hover:bg-stone-200 hover:rounded-t-xl">
              <span>
                <OpenLeftIcon />
              </span>
              <span>View details</span>
            </a>
          </Link>

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
        className={`bg-white absolute top-9 right-0 w-64 z-50 text-content-normal text-xs flex-flex-col items-center rounded-xl border border-stone-200`}
      >
        <button className="flex gap-2 w-full items-center p-4 hover:bg-stone-200 hover:rounded-t-xl">
          <Calendar getSelectedDate={date => console.log('date', date)} />
        </button>

        <button className="flex gap-2 w-full items-center p-4 hover:bg-stone-200 hover:rounded-b-xl">
          <DropdownSelect
            data={[
              { caption: 'Completed', value: 'completed' },
              { caption: 'In progress', value: 'in progress' },
              { caption: 'Requested', value: 'requested' },
              { caption: 'Cancelled', value: 'cancelled' },
            ]}
          />
        </button>
      </div>
      <div className="fixed bg-transparent top-0 right-0 w-screen h-screen z-40"></div>
    </>
  );
  return (
    <div className="relative mt-8">
      <div>
        <button
          onClick={() => toggleDropdown(true)}
          className="text-xs ml-auto flex gap-2 border border-stone-300 bg-white rounded-full px-3 py-2"
        >
          <FilterIcon className="w-4" /> <span>Filter</span>
        </button>
        {dropdownOpen && renderDropdown()}
      </div>
      <div className="border-2 relative border-white rounded-xl mt-3 overflow-auto bg-white">
        {[heading, ...SubscriptionData].map((data, index) => (
          <>
            <div key={data._id} className={`hover:bg-gray-100 relative`}>
              <Link href={`/manage/subscription/${data._id}`}>
                <Subscription
                  _id={data._id}
                  index={index}
                  data={data}
                  popupOpen={popupOpen}
                  togglePopup={togglePopup}
                  length={SubscriptionData.length}
                />
              </Link>
            </div>
          </>
        ))}
      </div>

      {popupOpen && renderPopup()}
    </div>
  );
};

export default SubscriptionList;
