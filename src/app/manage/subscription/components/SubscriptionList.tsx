'use client';

import React, { useState } from 'react';
import SubscriptionTable from '../../components/SubscriptionTable';
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
import SearchIcon from '~/commons/icons/SearchIcon';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import SubscriptionDetail from './SubscriptionDetail';

type Props = {
  subscriptions: SubscriptionItem[];
};
type Filter = {
  subscribedOn: Date;
  name: string;
  interval: string;
  planCode: string;
  serviceName: string;
};

const SubscriptionList = (props: Props) => {
  const [popupOpen, togglePopup] = useState<TablePopupData | null>(null);
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<Partial<Filter>>();
  const [subscriptionList, setSubscriptionList] = useState<SubscriptionItem[]>(
    props.subscriptions
  );
  const [itemDetail, setItemDetail] = useState<SubscriptionItem | null>(null);

  const handleFilter = () => {
    const newSubscriptionList = props.subscriptions.filter(subscription => {
      let condition = true;
      if (filterData?.subscribedOn) {
        const filterCreatedAt =
          new Date(subscription.createdAt) ===
          new Date(filterData.subscribedOn);
        condition &&= filterCreatedAt;
      }

      if (filterData?.name) {
        let bookersName =
          (subscription.user?.firstName || '') +
          (subscription.user?.lastName || '');
        const filterName =
          bookersName.includes(filterData.name.trim().replace(/\s+/g, '')) ||
          filterData.name.trim().replace(/\s+/g, '').includes(bookersName);
        condition &&= filterName;
      }

      if (filterData?.serviceName) {
        const filterServiceName =
          !!subscription?.merchantService?.service?.title?.includes(
            filterData.serviceName
          );
        condition &&= filterServiceName;
      }

      if (filterData?.planCode) {
        const filteredPlanCode = !!subscription?.plan?.code.includes(
          filterData.planCode
        );
        condition &&= filteredPlanCode;
      }

      if (filterData?.interval) {
        const filteredInterval = !!subscription?.plan?.interval.includes(
          filterData.interval
        );
        condition &&= filteredInterval;
      }

      return condition;
    });
    setSubscriptionList(newSubscriptionList);
  };

  const popupRef = useClickOutside(() => {
    togglePopup(null);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const heading = {
    id: 'table_header',
  } as unknown as SubscriptionItem;

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
            // href={`/manage/subscription/${popupOpen.id}`}
            onClick={() => {
              const item = subscriptionList.find(b => b.id === popupOpen.id);
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
        <button className="flex flex-col gap-1 mb-2 w-full px-3 pt-4">
          <span>Date subscribed</span>
          <Calendar
            getSelectedDate={date => {
              const newFilterData = { ...(filterData || {}) };
              if (date) {
                newFilterData.subscribedOn = date;
              } else {
                newFilterData.subscribedOn = undefined;
              }
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex mb-2 gap-2 w-full flex-col px-3 pt-2">
          <span>Interval</span>
          <DropdownSelect
            data={[
              { caption: 'Monthly', value: 'monthly' },
              { caption: 'Quaterly', value: 'quarterly' },
              { caption: 'Biannually', value: 'biannually' },
              { caption: 'Annually', value: 'annually' },
            ]}
            getValue={(value: string) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.interval = value;
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex gap-1 mb-2 flex-col w-full px-3 pt-2">
          <span>Subscriber's name</span>
          <TextInput
            suffixSign={<SearchIcon />}
            name="name"
            placeholder="Search by subscriber's name"
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
            placeholder="Search by subscriber's name"
            customStyle="!py-2 !rounded-l-full text-xs"
            customSuffixStyle="!rounded-r-full"
            getValue={(value: string) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.serviceName = value;
              setFilterData(newFilterData);
            }}
          />
        </button>

        <button className="flex gap-1 mb-2 flex-col w-full p-2">
          <span>Plan Code</span>
          <TextInput
            name="serviceName"
            suffixSign={<SearchIcon />}
            placeholder="Search by subscriber's name"
            customStyle="!py-2 !rounded-l-full text-xs"
            customSuffixStyle="!rounded-r-full"
            getValue={(value: string) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.planCode = value;
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
        <SubscriptionDetail
          onClose={() => setItemDetail(null)}
          item={itemDetail}
          subscriptionList={subscriptionList}
          setSubscriptionList={setSubscriptionList}
        />
      )}
      <div className="border-2 relative border-white rounded-xl mt-3 overflow-auto bg-white">
        {[heading, ...subscriptionList].map((data, index) => (
          <>
            <div
              key={data.id || index}
              className={`hover:bg-gray-100 relative`}
            >
              <SubscriptionTable
                placeholderId={index === 0 ? 'table_header' : index.toString()}
                id={data.id}
                index={index}
                data={data}
                popupOpen={popupOpen}
                togglePopup={togglePopup}
                length={subscriptionList.length}
              />
            </div>
          </>
        ))}
      </div>

      {popupOpen && renderPopup()}
    </div>
  );
};

export default SubscriptionList;
