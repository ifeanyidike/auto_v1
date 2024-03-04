'use client';
import React, { useState } from 'react';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import CheckBox from '~/components/CheckBox';
import { type ServicePricing } from '../../subscription/components/data';
import Select from '~/components/Select';
import TextInput from '~/components/TextInput';
import MultilineTextInput from '~/components/MultilineTextInput';
import Button from '~/components/Button';
import { type SingleValue } from 'react-select';

type Props = {
  merchantService: MerchantServiceType;
};

type ItemData = {
  items: ServicePricing[];
  isOutsideWork: boolean;
  discountCode: string;
  location: string;
  customLocation: string;
};

export const sample_locations = [
  {
    value: 'Port Harcourt',
    label: 'Port Harcourt',
  },
  {
    value: 'Abuja',
    label: 'Abuja',
  },
  {
    value: 'Lagos',
    label: 'Lagos',
  },
];

const DataView = (props: Props) => {
  const { merchantService } = props;
  const [data, setData] = useState<ItemData | null>(null);

  const getTotalAmount = () => {
    let amount = 0;
    let outsideWorkAmount = 10000;

    if (!data?.items?.length) return amount.toFixed(2).toLocaleString();

    amount = data?.items?.reduce((acc, curr) => acc + Number(curr.amount), 0);

    if (data?.isOutsideWork && data?.location) {
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

  const shouldPayOnline = () => {
    if (!data?.isOutsideWork) return true;

    if (!data?.location && !data?.customLocation) return true;
    if (data?.customLocation && !data?.location) return false;

    return true;
  };

  // !data?.isOutsideWork || (data?.isOutsideWork && data?.location);
  return (
    <div>
      <div className="flex flex-col gap-3 items-center max-h-80 pt-12 overflow-auto">
        {merchantService?.pricing?.map(p => (
          <div
            className="flex items-center gap-4 uppercase text-xs px-5 py-2 bg-gray-200 min-w-[500px] max-md:min-w-[400px] max-sm:min-w-[300px] flex-grow rounded-full text-content-normal font-medium"
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
            <span className="ml-auto">Basic Pricing: ₦{Number(p.amount)}</span>
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
            data={sample_locations}
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
        getValue={() => {}}
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

      <div className="text-right font-mono text-3xl">₦{getTotalAmount()}</div>

      <div className="flex gap-4 mt-8">
        <Button
          width="w-full"
          height="h-12"
          bgColor="bg-slate-800"
          //   onClick={() => router.push(`booking?id=${merchantService?.id}`)}
        >
          Book and Pay Later
        </Button>

        {shouldPayOnline() && (
          <Button
            width="w-full"
            height="h-12"
            bgColor="bg-stone-800"
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
