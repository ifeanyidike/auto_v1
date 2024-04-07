'use client';
import React, { type Dispatch, type SetStateAction, useState } from 'react';
import OpenLeftIcon from '~/commons/icons/OpenLeftIcon';
import DocumentIcon from '~/commons/icons/DocumentIcon';
import { useClickOutside } from '~/hooks/useClickOutside';
import FilterIcon from '~/commons/icons/FilterIcon';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '~/components/Calendar';
import DropdownSelect from '~/components/DropdownSelect';
import DiscountTable from './DiscountTable';
import { type TablePopupData } from '../../types/general';
import { type MerchantType } from '~/app/api/merchant/logic';
import DiscountDetails from './DiscountDetails';
import { getBrandAmount } from './data';
import { deleteDiscount } from '../action';
import { enqueueSnackbar } from 'notistack';

const DeleteIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

type Props = {
  merchantId: string;
  services: MerchantType['services'];
  discounts: MerchantType['discounts'];
  setDiscounts: Dispatch<SetStateAction<MerchantType['discounts']>>;
};

const DiscountList = (props: Props) => {
  const [popupOpen, togglePopup] = useState<TablePopupData | null>(null);
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const [itemDetail, setItemDetail] = useState<
    MerchantType['discounts'][0] | null
  >(null);

  const popupRef = useClickOutside(() => {
    togglePopup(null);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const heading = {
    id: 'table_header',
  } as unknown as MerchantType['discounts'][0];

  const renderPopup = () => {
    if (popupOpen === null) {
      return null;
    }

    console.log('popupOpen', popupOpen);

    const popupHeight = 245;
    const spaceBelow = window.innerHeight - popupOpen.position;

    const positionAbove = spaceBelow < popupHeight;

    const top = popupOpen.position - popupHeight;

    const setStyle = positionAbove
      ? { bottom: spaceBelow - 67 + 'px' }
      : { top: top + 'px' };

    const item = props.discounts.find(b => b.id === popupOpen.id);

    const handleDeleteDiscount = async () => {
      togglePopup(null);
      if (!item) return;
      const plans = item?.services.flatMap(s => {
        const plans = item.plans.filter(p => p.merchantServiceId === s.id);
        return plans.map(p => ({
          id: p.id,
          code: p.code,
          amount: Number(getBrandAmount(s, p)) * 100,
        }));
      });
      const result = await deleteDiscount(props.merchantId, item.id, plans);
      if (result.error) {
        return enqueueSnackbar(result.error, { variant: 'error' });
      }
      props.setDiscounts(result.discounts || []);
      enqueueSnackbar('Discount successfully deleted', {
        variant: 'success',
      });
    };

    return (
      <>
        <div
          ref={popupRef}
          className={`bg-white absolute box-border h-[101px] right-5 w-48 z-50 text-content-normal text-xs flex-flex-col items-center rounded-xl border border-stone-200`}
          style={{
            ...setStyle,
          }}
        >
          <button
            onClick={() => {
              if (item) setItemDetail(item);
            }}
            className="flex gap-2 w-full items-center p-4 hover:bg-stone-200 hover:rounded-t-xl"
          >
            <span>
              <OpenLeftIcon />
            </span>
            <span>View details</span>
          </button>
          <button
            onClick={handleDeleteDiscount}
            className="flex gap-2 w-full items-center p-4 hover:bg-stone-200 hover:rounded-b-xl"
          >
            <span>
              <DeleteIcon />
            </span>
            <span>Delete discount</span>
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
        className={`bg-white absolute bottom-9 right-0 w-64 z-50 text-content-normal text-xs flex-flex-col items-center rounded-xl border border-stone-200`}
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
    <div className="relative mt-8 mx-5 max-sm:mx-0 mb-5">
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
        <DiscountDetails
          onClose={() => setItemDetail(null)}
          item={itemDetail}
          discounts={props.discounts}
          setDiscounts={props.setDiscounts}
          services={props.services}
          merchantId={props.merchantId}
        />
      )}

      <div className="border-2 relative border-white rounded-xl mt-3 overflow-auto bg-white">
        {[heading, ...props.discounts].map((data, index) => (
          <div key={data.id || index} className={`hover:bg-gray-100 relative`}>
            <DiscountTable
              placeholderId={index === 0 ? 'table_header' : index.toString()}
              id={data.id}
              index={index}
              data={data}
              length={props.discounts.length}
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

export default DiscountList;
