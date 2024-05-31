'use client';
import React, { useEffect, useState } from 'react';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import CheckBox from '~/components/CheckBox';
import { type ServicePricing } from '../../subscription/components/data';
import Select from '~/components/Select';
import TextInput from '~/components/TextInput';
import MultilineTextInput from '~/components/MultilineTextInput';
import Button from '~/components/Button';
import { type SingleValue } from 'react-select';
import { type Prisma } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import RadioButton from '~/components/RadioButton';
import VisaCard from '~/commons/icons/VisaCard';
import Mastercard from '~/commons/icons/Mastercard';
import VerveCard from '~/commons/icons/VerveCard';
import CreditCard from '~/commons/icons/CreditCard';
import { dmSans, manRope } from '~/font';
import { bookService } from './bookingAction';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import LoaderOne from '~/components/LoaderOne';

type Authorization = Prisma.PaymentAuthorizationGetPayload<
  Prisma.PaymentAuthorizationDefaultArgs<DefaultArgs>
>;
type Props = {
  merchantService: MerchantServiceType;
  authorizations: Authorization[];
  userId: string;
};

export type ItemData = {
  items: ServicePricing[];
  isOutsideWork: boolean;
  discountCode: string;
  location: string;
  info: string;
  customLocation: string;
  serviceId: string;
  userId: string;
  amount: number;
  selectedAuthCode?: string;
};

const DataView = (props: Props) => {
  const { merchantService, userId } = props;
  const initialData = { serviceId: merchantService.id, userId } as ItemData;
  const [data, setData] = useState<ItemData>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  const locations = merchantService.merchant?.miscellanous.map(l => ({
    value: l.location,
    label: l.location,
  }));

  const existingAuthorizations = props.authorizations?.filter(a => a.reusable);

  // const [selectedAuthorization, setSelectedAuthorization] =
  //   useState<Authorization | null>(null);

  const getTotalAmount = () => {
    let amount = 0;

    if (!data?.items?.length) return amount.toFixed(2).toLocaleString();

    amount = data?.items?.reduce((acc, curr) => acc + Number(curr.amount), 0);

    if (data?.isOutsideWork && data?.location) {
      const outsideWorkAmount = parseFloat(
        merchantService.merchant?.miscellanous?.find(
          m => m.location === data.location
        )?.cost!
      );
      amount += outsideWorkAmount;
    }

    if (data?.discountCode) {
      const discount = merchantService?.discounts?.find(
        d => d.code === data.discountCode
      );
      if (discount) {
        amount *= 1 - parseFloat(discount.value) / 100;
      }
    }

    return amount.toFixed(2).toLocaleString();
  };

  const totalAmount = getTotalAmount();

  useEffect(() => {
    if (!totalAmount) return;
    const newData = { ...data };
    newData.amount = parseFloat(totalAmount);
    setData(newData);
  }, [totalAmount]);

  const shouldPayOnline = () => {
    if (!data?.isOutsideWork) return true;

    if (!data?.location && !data?.customLocation) return true;
    if (data?.customLocation && !data?.location) return false;

    return true;
  };

  const renderCard = (card_type: 'visa' | 'mastercard' | 'verve' | null) => {
    switch (card_type) {
      case 'visa':
        return <VisaCard classNames="w-14 h-14" />;
      case 'mastercard':
        return <Mastercard classNames="w-14 h-14" />;
      case 'verve':
        return <VerveCard classNames="w-14 h-14" />;
      default:
        return <CreditCard classNames="w-14 h-14" />;
    }
  };

  const renderError = (
    errors: Partial<
      Record<
        'amount' | 'items' | 'location' | 'serviceId' | 'unauthenticated',
        string[] | undefined
      >
    >
  ) => {
    const keys = Object.keys(errors) as Array<
      'amount' | 'items' | 'location' | 'serviceId' | 'unauthenticated'
    >;

    let response = (errors?.[keys[0]!] as string[])[0];
    if (keys[0] === 'items') {
      response = 'Brand types cannot be empty';
    }

    enqueueSnackbar(response, {
      variant: 'error',
    });
  };

  const handleBook = async (shouldPay: boolean = true) => {
    try {
      setLoading(true);
      const result = await bookService(data!, shouldPay);
      setLoading(false);
      if (result?.errors) {
        renderError(result.errors);
      }

      if (result?.errors) {
        return renderError(result.errors);
      }

      if (result?.message) {
        enqueueSnackbar(result.message, { variant: 'success' });
      }

      if (result?.success_url) {
        window.location.href = result.success_url;
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SnackbarProvider maxSnack={1} />
      {loading && <LoaderOne />}
      <div className="flex flex-col gap-3 items-center max-h-80 pt-12 overflow-auto">
        {merchantService?.servicePricing?.map(p => (
          <div
            className="flex items-center gap-4 uppercase text-xs px-5 py-3 bg-gray-200 min-w-[500px] max-md:min-w-[400px] max-sm:min-w-[300px] flex-grow rounded-full text-content-normal font-medium"
            key={p.id}
          >
            <CheckBox
              getValue={state => {
                const newData = { ...(data || {}) };
                if (state) {
                  const newData = { ...(data || {}) };
                  const exists = newData?.items?.some(item => item.id === p.id);
                  if (!exists) {
                    const newItems = [...(newData?.items || []), p];
                    newData.items = newItems;
                    setData(newData as ItemData);
                  }
                } else {
                  const newItems =
                    newData?.items?.filter(item => item.id !== p.id) || [];
                  newData.items = newItems;
                  setData(newData as ItemData);
                }
              }}
            />{' '}
            <p>{p.type}</p>{' '}
            <span className="ml-auto">
              Basic Pricing: {`₦${Number(p.amount)?.toLocaleString()}`}
            </span>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <div className="flex gap-2 mt-5 ml-2 items-center">
        <CheckBox
          size="w-4 h-4"
          getValue={state => {
            const newData = { ...(data || {}) };
            newData.isOutsideWork = state;
            setData(newData as ItemData);
          }}
        />
        <p className="text-sm">Will this be an in-shop or outside work?</p>
      </div>

      {data?.isOutsideWork && (
        <div className="flex flex-col mt-5">
          <Select
            name="work_location"
            placeholder="Work Location"
            data={[{ value: '', label: 'In Auto Shop' }, ...(locations || [])]}
            getValue={value => {
              const locationData = value as SingleValue<
                Record<'value' | 'label', string>
              >;
              const location = locationData?.value;
              const newData = { ...(data || {}) };
              newData.location = location || '';
              setData(newData as ItemData);
            }}
          />
          <span className="text-xs text-center my-4">OR</span>

          <span className="text-sm mb-1">
            Describe your location a little better
          </span>
          <TextInput
            customStyle="h-10 text-xs"
            placeholder="Enter a custom location"
            getValue={customLocation => {
              const newData = { ...(data || {}) };
              newData.customLocation = customLocation || '';
              setData(newData as ItemData);
            }}
          />
          <span className="text-[10px]">
            *Online payment will not be possible with this option
          </span>
        </div>
      )}

      <hr className="my-6" />

      <p className="text-sm mb-1 mt-2">
        Any other information you'll like us to know?
      </p>
      <MultilineTextInput
        placeholder="Describe the problem a little more"
        customStyle="min-h-20"
        getValue={info => {
          const newData = { ...(data || {}) };
          newData.info = info;
          setData(newData);
        }}
      />

      <p className="text-sm mb-1 mt-4">Discount code</p>
      <TextInput
        customStyle="h-10 text-xs"
        placeholder="Enter a discount code if you have any"
        getValue={code => {
          const newData = { ...(data || {}) };
          newData.discountCode = code;
          setData(newData as ItemData);
        }}
      />

      <hr className="my-6" />

      <div className="text-right font-mono text-3xl">{`₦${totalAmount}`}</div>

      {Boolean(existingAuthorizations?.length) && (
        <>
          <div className="flex flex-col mt-8">
            <h2 className={`font-medium text-lg mb-[2px] ${dmSans.className}`}>
              Use an Existing Card
            </h2>
            {existingAuthorizations.map(auth => (
              <div
                key={auth.id}
                className="flex items-center gap-4 border border-gray-200 bg-gray-100/40 shadow shadow-gray-100 rounded-xl p-5"
              >
                <RadioButton
                  getValue={state => {
                    const newData = { ...data };
                    if (state) {
                      newData.selectedAuthCode = auth.authorization_code;
                      // setSelectedAuthorization(auth);
                    } else {
                      newData.selectedAuthCode = undefined;
                    }
                    setData(newData);
                  }}
                  value={data.selectedAuthCode === auth.authorization_code}
                />
                <div className={`${dmSans.className} ml-3`}>
                  {' '}
                  <div className="flex items-center gap-2 font-mono font-medium text-xl">
                    {auth.bin}
                    <div className="flex gap-[2px]">
                      {[1, 2, 3, 4].map(dot => (
                        <div
                          key={dot}
                          className="w-[6px] h-[6px] bg-black/80 rounded-full"
                        ></div>
                      ))}
                    </div>
                    {auth.last4}
                  </div>
                  <p
                    className={`${manRope.className} text-sm text-gray-500 capitalize`}
                  >
                    {auth.card_type} card
                  </p>
                </div>
                <div className="ml-auto">
                  {renderCard(
                    auth.card_type?.trim() as 'visa' | 'mastercard' | 'verve'
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-4">
            <span className="text-xs text-center">OR</span>

            <div className="flex items-center gap-4 border border-gray-200 bg-gray-100/40 shadow shadow-gray-100 rounded-xl p-5 mt-4">
              <RadioButton
                getValue={(state: boolean) => {
                  if (state) {
                    const newData = { ...data };
                    newData.selectedAuthCode = undefined;
                    setData(newData);
                  }
                }}
                value={!data.selectedAuthCode}
              />
              <div className={`${dmSans.className} ml-3`}>
                {' '}
                <div className="flex items-center gap-2 font-medium text-base">
                  Pay with a new card
                </div>
              </div>
              <div className="ml-auto">
                <CreditCard classNames="w-10 h-10" />{' '}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex gap-4 mt-8">
        <Button
          width="w-full"
          height="h-12"
          bgColor="bg-slate-800"
          onClick={async () => handleBook(false)}
          //   onClick={() => router.push(`booking?id=${merchantService?.id}`)}
        >
          Book and Pay Later
        </Button>

        {shouldPayOnline() && (
          <Button
            width="w-full"
            height="h-12"
            bgColor="bg-stone-800"
            onClick={async () => handleBook()}
            //   onClick={() => router.push(`booking?id=${merchantService?.id}`)}
          >
            Book and Pay
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataView;
