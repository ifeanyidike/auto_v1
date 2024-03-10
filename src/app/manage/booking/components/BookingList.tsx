'use client';
import React, { useState } from 'react';

import BookingTable from '../../components/BookingTable';
import OpenLeftIcon from '~/commons/icons/OpenLeftIcon';
import DocumentIcon from '~/commons/icons/DocumentIcon';
import DownloadIcon from '~/commons/icons/DownloadIcon';
import { useClickOutside } from '~/hooks/useClickOutside';
import FilterIcon from '~/commons/icons/FilterIcon';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '~/components/Calendar';
import DropdownSelect from '~/components/DropdownSelect';
import { type TablePopupData } from '../../types/general';
import { type BookingItem } from '~/app/api/booking/logic';
import BookingDetail from './BookingDetail';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import SearchIcon from '~/commons/icons/SearchIcon';

type Props = {
  bookingList: BookingItem[];
};

type Filter = {
  bookedOn: Date;
  isFulfilled: boolean;
  isPaid: boolean;
  name: string;
  serviceName: string;
};

const BookingList = (props: Props) => {
  const [popupOpen, togglePopup] = useState<TablePopupData | null>(null);
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const [itemDetail, setItemDetail] = useState<BookingItem | null>(null);
  const [filterData, setFilterData] = useState<Partial<Filter>>();
  const [bookingList, setBookingList] = useState<BookingItem[]>(
    props.bookingList
  );

  const handleFilter = () => {
    const newBookingList = props.bookingList.filter(booking => {
      let condition = true;
      if (filterData?.bookedOn) {
        const filterCreatedAt =
          new Date(booking.createdAt) === new Date(filterData.bookedOn);
        condition &&= filterCreatedAt;
      }

      if (filterData?.isFulfilled !== undefined) {
        const filterCompleted = booking.isFullfilled === filterData.isFulfilled;
        condition &&= filterCompleted;
      }

      if (filterData?.isPaid !== undefined) {
        const filterPaid = booking.isPaid === filterData.isPaid;
        condition &&= filterPaid;
      }

      if (filterData?.name) {
        let bookersName =
          (booking.user?.firstName || '') + (booking.user?.lastName || '');
        const filterName =
          bookersName.includes(filterData.name.trim().replace(/\s+/g, '')) ||
          filterData.name.trim().replace(/\s+/g, '').includes(bookersName);
        condition &&= filterName;
      }

      if (filterData?.serviceName) {
        const filterServiceName =
          !!booking?.merchantService?.service?.title?.includes(
            filterData.serviceName
          );
        condition &&= filterServiceName;
      }
      return condition;
    });
    setBookingList(newBookingList);
  };

  const popupRef = useClickOutside(() => {
    togglePopup(null);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const heading = { id: 'table_header' } as unknown as BookingItem;
  const renderPopup = () => {
    if (popupOpen === null) {
      return null;
    }

    const popupHeight = 158;
    const spaceBelow = window.innerHeight - popupOpen.position;

    const positionAbove = spaceBelow < popupHeight;

    const top = popupOpen.position - popupHeight + 32;

    const setStyle = positionAbove
      ? { bottom: spaceBelow - 54 + 'px' }
      : { top: top + 'px' };
    return (
      <>
        <div
          ref={popupRef}
          className={`bg-white absolute box-border h-[158px] right-5 w-48 z-50 text-content-normal text-xs flex-flex-col items-center rounded-xl border border-stone-200`}
          style={{
            ...setStyle,
          }}
        >
          <button
            // href={`/manage/booking/${popupOpen.id}`}
            onClick={() => {
              const item = bookingList.find(b => b.id === popupOpen.id);
              if (item) setItemDetail(item);
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
          <button className="flex gap-2 w-full items-center p-4">
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
        <button className="flex flex-col gap-1 mb-2 w-full px-3 pt-4">
          <span>Date booked</span>
          <Calendar
            getSelectedDate={date => {
              const newFilterData = { ...(filterData || {}) };
              if (date) {
                newFilterData.bookedOn = date;
              } else {
                newFilterData.bookedOn = undefined;
              }
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex mb-2 gap-2 w-full flex-col px-3 pt-2">
          <span>Completion</span>
          <DropdownSelect
            data={[
              { caption: 'Completed', value: true },
              { caption: 'Not completed', value: false },
            ]}
            getValue={(value: boolean) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.isFulfilled = value;
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex mb-2 gap-2 w-full flex-col px-3 pt-2">
          <span>Paid</span>
          <DropdownSelect
            data={[
              { caption: 'Paid', value: true },
              { caption: 'Not Paid', value: false },
            ]}
            getValue={(value: boolean) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.isPaid = value;
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex gap-1 mb-2 flex-col w-full px-3 pt-2">
          <span>Booker's name</span>
          <TextInput
            suffixSign={<SearchIcon />}
            name="name"
            placeholder="Search by booker's name"
            customStyle="!py-2 !rounded-l-full text-xs"
            customSuffixStyle="!rounded-r-full"
            getValue={(value: string) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.name = value;
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex gap-1 mb-2 flex-col w-full p-2">
          <span>Service name</span>
          <TextInput
            name="serviceName"
            suffixSign={<SearchIcon />}
            placeholder="Search by booker's name"
            customStyle="!py-2 !rounded-l-full text-xs"
            customSuffixStyle="!rounded-r-full"
            getValue={(value: string) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.serviceName = value;
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
      <div>
        <button
          onClick={() => toggleDropdown(true)}
          className="text-xs ml-auto flex gap-2 border border-stone-300 bg-white rounded-full px-3 py-2"
        >
          <FilterIcon className="w-4" /> <span>Filter</span>
        </button>
        {dropdownOpen && renderDropdown()}
      </div>

      {itemDetail && (
        <BookingDetail
          onClose={() => setItemDetail(null)}
          item={itemDetail}
          bookingList={bookingList}
          setBookingList={setBookingList}
        />
      )}
      <div className="border-2 relative border-white rounded-xl mt-3 overflow-auto bg-white">
        {[heading, ...bookingList].map((data, index) => (
          <div key={data.id || index} className={`hover:bg-gray-100 relative`}>
            <BookingTable
              placeholderId={index === 0 ? 'table_header' : index.toString()}
              id={data.id}
              index={index}
              data={data}
              length={bookingList.length}
              popupOpen={popupOpen}
              togglePopup={togglePopup}
            />
          </div>
        ))}
      </div>
      {popupOpen && renderPopup()}
    </div>
  );
};

export default BookingList;
