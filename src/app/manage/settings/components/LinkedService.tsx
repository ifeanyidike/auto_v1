import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { type MultiValue } from 'react-select';
import { type MerchantType } from '~/app/api/merchant/logic';
import Button from '~/components/Button';
import Select from '~/components/Select';
import Spinner from '~/components/Spinner';
import { linkOrUnlinkPlansToDiscount } from '../action';

type Props = {
  service: MerchantType['services'][0];
  item: MerchantType['discounts'][0];
  merchantId: string;
  setItem: React.Dispatch<React.SetStateAction<MerchantType['discounts'][0]>>;
  discounts: MerchantType['discounts'];
  setDiscounts: React.Dispatch<React.SetStateAction<MerchantType['discounts']>>;
};
const LinkedService = (props: Props) => {
  const { service, item } = props;
  const alreadyLinkedPlans = props.discounts
    .filter(d => d.id !== item.id)
    .flatMap(p => p.plans.flatMap(p => p.code));

  const plans = item.plans.filter(p => p.merchantServiceId === service.id);
  const [connectedPlans, setConnectedPlans] = useState<string[]>(
    plans.map(s => s.id) || []
  );
  const [savingPlanConnect, setSavingPlanConnect] = useState(false);

  const getAmountAfterDiscount = (initialAmount: number) => {
    if (item.type === 'percentage') {
      return initialAmount * ((1 - parseFloat(item.value)) / 100) * 100;
    }
    return Math.max(0, (initialAmount - parseFloat(item.value)) * 100);
  };

  const getBrandAmount = (p: MerchantType['discounts'][0]['plans'][0]) => {
    if (p.autoBrand === 'FIXED') {
      return props.service.servicePricing.find(a => a.mode === 'FIXED')?.amount;
    }
    return props.service.servicePricing.find(a => a.type === p.autoBrand)
      ?.amount;
  };

  const handleConnectPlans = async () => {
    setSavingPlanConnect(true);

    const plansToDisconnect = plans
      .filter(p => !connectedPlans.includes(p.id))
      .map(p => ({
        id: p.id,
        code: p.code,
        amount: Number(getBrandAmount(p)) * 100,
      }));

    const plansToConnect = service.subscriptionPlans
      .filter(p => connectedPlans.includes(p.id))
      .map(p => ({
        id: p.id,
        code: p.code,
        amount: getAmountAfterDiscount(Number(getBrandAmount(p))),
      }));

    const result = await linkOrUnlinkPlansToDiscount(
      props.merchantId,
      item.id,
      plansToConnect,
      plansToDisconnect
    );

    setSavingPlanConnect(false);
    if (result.error) {
      return enqueueSnackbar(result.error, { variant: 'error' });
    }

    props.setDiscounts(result.discounts || []);
    const newItem = result.discounts?.find(d => d.id === item.id);
    if (newItem) props.setItem(newItem);

    enqueueSnackbar('Discount successfully updated on selected services', {
      variant: 'success',
    });
  };
  return (
    <div className="w-full bg-gray-100 px-8 py-2 rounded">
      <div className="flex items-center gap-8">
        <div className="flex text-lg font-medium">{service.service?.title}</div>
        <div className="w-1 h-1 bg-black rounded-full"></div>
        <small className="text-[10px]">{service.service?.type}</small>
        <Link
          href={`/manage/product/edit/${service.id}`}
          className="text-xs ml-auto border-b border-red-1 text-red-1"
        >
          Go to service
        </Link>
      </div>

      <div className="flex max-lg:flex-col text-sm gap-4 items-center mt-4">
        <small className="text-gray-400 uppercase text-[10px]">
          Link subscription plans
        </small>

        <div className="flex gap-1 items-center">
          <Select
            name="services"
            isMulti
            placeholder="Please select the service to add discount"
            customClassNames="!w-auto"
            defaultValue={
              plans.map(s => ({
                value: s.id,
                label: `${s.autoBrand} - ${s.interval}`,
              })) || []
            }
            data={
              service.subscriptionPlans
                ?.filter(p => !alreadyLinkedPlans.includes(p.code))
                .map(s => ({
                  value: s.id,
                  label: `${s.autoBrand} - ${s.interval}`,
                })) || []
            }
            getValue={resp => {
              const values = resp as MultiValue<
                Record<'value' | 'label', string>
              >;
              setConnectedPlans(values.map(v => v.value));
            }}
          />
        </div>
        <div className="ml-auto max-lg:mr-auto">
          <Button
            bgColor="bg-slate-700"
            radius="rounded-full"
            height="h-[42px]"
            width="w-[168px]"
            py="py-0"
            onClick={handleConnectPlans}
          >
            <div className="flex whitespace-nowrap">
              {savingPlanConnect && (
                <Spinner customStyle="!w-5 !h-5 !text-white" />
              )}{' '}
              Save changes
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkedService;
