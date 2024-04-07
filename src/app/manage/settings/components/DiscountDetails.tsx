import React, { useState } from 'react';
import CloseIcon from '~/commons/icons/CloseIcon';
import { dmSans } from '~/font';
import ProductPane from '../../product/components/ProductPane';
import KeyIcon from '~/commons/icons/KeyIcon';
import CalendarIcon from '~/commons/icons/CalendarIcon';
import Button from '~/components/Button';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { type MerchantType } from '~/app/api/merchant/logic';
import Select from '~/components/Select';
import Spinner from '~/components/Spinner';
import {
  deleteDiscount,
  editDiscount,
  linkOrUnlinkServicesToDiscount,
} from '../action';
import { type SingleValue, type MultiValue } from 'react-select';
import LinkedService from './LinkedService';
import FilterIcon from '~/commons/icons/FilterIcon';
import { useClickOutside } from '~/hooks/useClickOutside';
import DropdownSelect from '~/components/DropdownSelect';
import TextInput from '~/components/TextInput';
import SearchIcon from '~/commons/icons/SearchIcon';
import { getAmountAfterDiscount, getBrandAmount } from './data';

type Props = {
  merchantId: string;
  services: MerchantType['services'];
  item: MerchantType['discounts'][0];
  discounts: MerchantType['discounts'];
  setDiscounts: React.Dispatch<React.SetStateAction<MerchantType['discounts']>>;
  onClose: () => void;
};

const EditIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const discountTypes = [
  {
    value: 'percentage',
    label: 'Percentage',
  },
  {
    value: 'fixed',
    label: 'Fixed',
  },
];

type Filter = {
  serviceType: string;
  serviceName: string;
};

const DiscountDetails = (props: Props) => {
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const [item, setItem] = useState<MerchantType['discounts'][0]>(props.item);
  const [itemServices, setItemServices] = useState<
    MerchantType['discounts'][0]['services']
  >(props.item.services);
  const [savingServicesConnect, setSavingServicesConnect] = useState(false);
  const [updatingEdits, setUpdatingEdits] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [closing, setClosing] = useState(false);
  const [connectedServices, setConnectedServices] = useState<string[]>(
    props.item.services?.map(s => s.id) || []
  );
  const [filterData, setFilterData] = useState<Partial<Filter>>();
  const [edit, setEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<Record<'type' | 'value', string>>({
    type: item.type,
    value: item.value,
  });

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  React.useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      props.onClose();
      setClosing(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [closing]);

  const handleConnectService = async () => {
    setSavingServicesConnect(true);

    const servicesToDisconnect = props.item.services
      .filter(s => !connectedServices.includes(s.id))
      .map(s => s.id);
    const result = await linkOrUnlinkServicesToDiscount(
      props.merchantId,
      item.id,
      connectedServices,
      servicesToDisconnect
    );

    setSavingServicesConnect(false);
    if (result.error) {
      return enqueueSnackbar(result.error, { variant: 'error' });
    }
    props.setDiscounts(result.discounts || []);
    const newItem = result.discounts?.find(d => d.id === item.id);
    if (newItem) setItem(newItem);
    enqueueSnackbar('Discount successfully updated on selected services', {
      variant: 'success',
    });
  };

  const handleEditDiscount = async () => {
    if (!editData?.type || !editData.value) {
      return enqueueSnackbar('You must provide both discount value and type', {
        variant: 'error',
      });
    }

    if (
      editData?.type === props.item.type &&
      editData.value === props.item.value
    ) {
      return enqueueSnackbar('Please enter different values to save', {
        variant: 'info',
      });
    }
    setUpdatingEdits(true);

    const plans = itemServices.flatMap(s => {
      const plans = item.plans.filter(p => p.merchantServiceId === s.id);
      return plans.map(p => ({
        id: p.id,
        code: p.code,
        amount: getAmountAfterDiscount(Number(getBrandAmount(s, p)), editData!),
      }));
    });
    const result = await editDiscount(
      props.merchantId,
      item.id,
      editData!,
      plans
    );
    setUpdatingEdits(false);
    if (result.error) {
      return enqueueSnackbar(result.error, { variant: 'error' });
    }
    props.setDiscounts(result.discounts || []);
    const newItem = result.discounts?.find(d => d.id === item.id);
    if (newItem) setItem(newItem);
    enqueueSnackbar('Discount successfully updated on selected services', {
      variant: 'success',
    });
  };

  const handleDeleteDiscount = async () => {
    setDeleting(true);

    const plans = itemServices.flatMap(s => {
      const plans = item.plans.filter(p => p.merchantServiceId === s.id);
      return plans.map(p => ({
        id: p.id,
        code: p.code,
        amount: Number(getBrandAmount(s, p)) * 100,
      }));
    });
    const result = await deleteDiscount(props.merchantId, item.id, plans);
    setDeleting(false);
    if (result.error) {
      return enqueueSnackbar(result.error, { variant: 'error' });
    }
    setClosing(true);
    props.setDiscounts(result.discounts || []);
    enqueueSnackbar('Discount successfully deleted', {
      variant: 'success',
    });
  };

  const handleFilter = () => {
    const newServices = item.services?.filter(s => {
      let condition = true;

      if (filterData?.serviceName) {
        condition &&=
          s.service?.title
            ?.toLowerCase()
            .includes(filterData.serviceName?.toLowerCase()) ||
          filterData.serviceName.includes(s.service?.title!);
      }

      if (filterData?.serviceType) {
        condition &&= s.service?.type! === filterData.serviceType;
      }
      return condition;
    });
    setItemServices(newServices || []);
  };

  const renderDropdown = () => (
    <>
      <div
        ref={dropdownRef}
        className={`bg-white absolute bottom-10 right-0 w-64 z-50 text-content-normal text-xs flex-flex-col items-center rounded-xl border border-stone-200`}
      >
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
              newFilterData.serviceName = value;
              setFilterData(newFilterData);
            }}
          />
        </button>
        <button className="flex mb-2 gap-2 w-full flex-col px-3 pt-2">
          <span>Service type</span>
          <DropdownSelect
            data={[
              {
                value: 'REPAIR',
                caption: 'Repairs',
              },
              {
                value: 'SERVICE',
                caption: 'Servicing',
              },
            ]}
            getValue={(value: string) => {
              const newFilterData = { ...(filterData || {}) };
              newFilterData.serviceType = value;
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
    <>
      <SnackbarProvider maxSnack={1} />

      <div
        className={`${
          !closing ? 'animate-slideIn' : 'animate-slideOut'
        } w-[70%] bg-gray-50 fixed right-0 top-[75px] h-[90.5%] z-[51] rounded-l-3xl max-md:px-8 max-sm:px-4 px-14 py-4 max-md:w-full opacity-0 transition-opacity duration-200 ease-in-out ${
          props.item ? 'opacity-100' : ''
        } shadow-right-bottom-md shadow-black`}
      >
        {' '}
        <div
          className="absolute right-10 cursor-pointer"
          onClick={() => setClosing(true)}
        >
          <CloseIcon />
        </div>
        <div className="text-center mb-4 h-14">
          <h2 className={` text-2xl ${dmSans.className}`}>
            Details for Discount {item.code}
          </h2>
        </div>
        <div className="flex flex-col gap-7 h-[calc(100%-56px)] overflow-auto">
          <div className="ml-auto">
            <Button
              bgColor="bg-red-500"
              radius="rounded-md"
              px="px-3"
              py="py-2"
              onClick={handleDeleteDiscount}
            >
              <div className="flex">
                {deleting && <Spinner customStyle="!w-5 !h-5 !text-white" />}{' '}
                Delete discount
              </div>
            </Button>
          </div>
          <ProductPane paneTitle="Discount Info" initExpanded>
            <div className="flex items-center ">
              {edit && (
                <Button
                  bgColor="bg-[#2e2e27]"
                  radius="rounded-md"
                  px="px-3"
                  py="py-2"
                  onClick={handleEditDiscount}
                >
                  <div className="flex">
                    {updatingEdits && (
                      <Spinner customStyle="!w-5 !h-5 !text-white" />
                    )}{' '}
                    Save changes
                  </div>
                </Button>
              )}
              <button className="ml-auto" onClick={() => setEdit(!edit)}>
                {!edit ? <EditIcon /> : <EyeIcon />}
              </button>
            </div>
            <div
              className={`grid ${
                edit
                  ? 'grid-cols-1 gap-4'
                  : 'grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'
              } items-center flex-wrap`}
            >
              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Discount Code</small>

                <div className="flex gap-1 items-center">
                  <KeyIcon classNames="h-3 w-3" />
                  <p
                    className={`${dmSans.className} overflow-auto text-gray-500 text-xs`}
                  >
                    {item.code}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Discount type</small>

                {!edit ? (
                  <div className="flex gap-1 items-center uppercase">
                    <p className={`${dmSans.className} text-xs`}>{item.type}</p>
                  </div>
                ) : (
                  <div className="max-w-[500px]">
                    <Select
                      name="type"
                      data={discountTypes}
                      defaultValue={discountTypes.filter(
                        d => d.value === item.type
                      )}
                      getValue={typeData => {
                        const singleValue = typeData as SingleValue<
                          Record<'label' | 'value', string>
                        >;
                        const newData = { ...(editData || {}) } as Record<
                          'type' | 'value',
                          string
                        >;
                        newData.type = singleValue?.value!;
                        newData.value = '';
                        setEditData(newData);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Discount value</small>

                {!edit ? (
                  <div className="flex gap-1 items-center">
                    <p className={`${dmSans.className} font-mono`}>
                      {item.type === 'percentage'
                        ? `${item.value}%`
                        : `₦${item.value}`}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-[500px]">
                    <TextInput
                      customStyle="text-xs"
                      customPrefixStyle="text-xs !min-w-[75px]"
                      customSuffixStyle="!min-w-[40px]"
                      defaultValue={editData.value}
                      prefixSign={
                        editData?.type === 'percentage'
                          ? 'Percentage discount'
                          : 'Discount amount'
                      }
                      suffixSign={editData?.type === 'percentage' ? '%' : '₦'}
                      max={100}
                      min={1}
                      type="number"
                      name="discount_value"
                      value={editData?.value?.toString() || ''}
                      placeholder="Please enter the value for this discount"
                      getValue={(val: string) => {
                        const newData = { ...(editData || {}) } as Record<
                          'type' | 'value',
                          string
                        >;
                        let value = val;
                        if (isNaN(parseInt(val))) {
                          enqueueSnackbar('Value must be a number');
                          value = '';
                        }
                        if (
                          newData.type === 'percentage' &&
                          parseInt(value) > 100
                        ) {
                          enqueueSnackbar(
                            'Percentage value cannot be more than 100'
                          );
                          value = '';
                        }
                        if (parseInt(value) < 1) {
                          enqueueSnackbar('Value must be greater than 0');
                          value = '';
                        }
                        newData.value = value;
                        setEditData(newData);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Expires On</small>

                <div className="flex gap-1 items-center">
                  <CalendarIcon classNames="h-3 w-3" />
                  <p className={`${dmSans.className}`}>
                    {item.expiresOn
                      ? new Date(item.expiresOn).toDateString()
                      : 'No expiry'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Created On</small>

                <div className="flex gap-1 items-center">
                  <CalendarIcon classNames="h-3 w-3" />
                  <p className={`${dmSans.className}`}>
                    {new Date(item.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            </div>
          </ProductPane>

          <ProductPane paneTitle="Manage Services" initExpanded>
            <div className=" items-center flex-wrap flex justify-center text-center">
              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400 uppercase text-[10px]">
                  Add or remove service from the list and save
                </small>

                <div className="flex gap-1 items-center">
                  <Select
                    name="services"
                    isMulti
                    placeholder="Please select the service to add discount"
                    customClassNames="!min-w-96 max-sm:!min-w-52"
                    defaultValue={
                      props.item.services?.map(s => ({
                        value: s.id,
                        label: s.service?.title!,
                      })) || []
                    }
                    data={
                      props.services?.map(s => ({
                        value: s.id,
                        label: s.service?.title!,
                      })) || []
                    }
                    getValue={resp => {
                      const values = resp as MultiValue<
                        Record<'value' | 'label', string>
                      >;
                      setConnectedServices(values.map(v => v.value));
                    }}
                  />
                </div>
                <div className="mt-4 px-2">
                  <Button
                    bgColor="bg-slate-700"
                    radius="rounded-xl"
                    onClick={handleConnectService}
                  >
                    <div className="flex">
                      {savingServicesConnect && (
                        <Spinner customStyle="!w-5 !h-5 !text-white" />
                      )}{' '}
                      Save changes
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </ProductPane>

          <ProductPane paneTitle="Linked Services" initExpanded>
            {Boolean(item.services.length) && (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(true)}
                  className="text-xs ml-auto flex gap-2 border border-stone-300 bg-white rounded-full px-3 py-2"
                >
                  <FilterIcon className="w-4" /> <span>Filter</span>
                </button>
                {dropdownOpen && renderDropdown()}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {itemServices.map(s => (
                <LinkedService
                  service={s}
                  item={item}
                  setItem={setItem}
                  merchantId={props.merchantId}
                  discounts={props.discounts}
                  setDiscounts={props.setDiscounts}
                />
              ))}
            </div>
          </ProductPane>
        </div>
      </div>
    </>
  );
};

export default DiscountDetails;
