'use client';
import React, { useState } from 'react';
import Bookings from '../components/Bookings';
import { BookingData } from '~/components/Data';
import OpenLeftIcon from '~/commons/icons/OpenLeftIcon';
import DocumentIcon from '~/commons/icons/DocumentIcon';
import DownloadIcon from '~/commons/icons/DownloadIcon';
import { useClickOutside } from '~/hooks/useClickOutside';
import FilterIcon from '~/commons/icons/FilterIcon';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '~/components/Calendar';
import DropdownSelect from '~/components/DropdownSelect';

const BookingList = () => {
  const [popupOpen, togglePopup] = useState<number | null>(null);
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);

  const popupRef = useClickOutside(() => {
    togglePopup(null);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const heading = { _id: 'table_header' } as unknown as (typeof BookingData)[0];
  const renderPopup = () => (
    <>
      <div
        ref={popupRef}
        className={`bg-white absolute right-5 w-48 z-50 text-content-normal text-xs flex-flex-col items-center rounded-xl border border-stone-200`}
        style={{
          top: popupOpen ? popupOpen - 120 : 0,
        }}
      >
        <button className="flex gap-2 w-full items-center p-4 hover:bg-stone-200 hover:rounded-t-xl">
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
        {[heading, ...BookingData].map((b, index) => (
          <>
            <div key={b._id} className={`hover:bg-gray-100 relative`}>
              <Bookings
                _id={b._id}
                index={index}
                imgSrc={b.imgSrc}
                name={b.name}
                title={b.title}
                category={b.category}
                status={b.status}
                date={b.date}
                action={b.action}
                length={BookingData.length}
                popupOpen={popupOpen}
                togglePopup={togglePopup}
              />
            </div>
          </>
        ))}
      </div>
      {popupOpen && renderPopup()}
    </div>
  );
};

export default BookingList;