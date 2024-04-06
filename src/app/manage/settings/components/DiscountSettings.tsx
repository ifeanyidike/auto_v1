'use client';
import React, { type SetStateAction, useState, type Dispatch } from 'react';
import Button from '~/components/Button';
import { enqueueSnackbar } from 'notistack';
import { updateDiscountSettings } from '../action';
import DiscountView from './DiscountView';
import DiscountList from './DiscountList';
import { type MerchantType } from '~/app/api/merchant/logic';

type Props = {
  merchant: MerchantType;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type Data = {
  type: 'percentage' | 'fixed';
  code: string;
  value: string;
  expiresOn: Date;
};

const DiscountSettings = (props: Props) => {
  const [data, setData] = useState<Data>({
    expiresOn: new Date(),
  } as Data);
  const [discounts, setDiscounts] = useState<MerchantType['discounts']>(
    props.merchant.discounts
  );

  async function handleUpdateMerchant() {
    try {
      props.setLoading(true);
      const { success, error, discounts } = await updateDiscountSettings(
        props.merchant.id,
        (data || {}) as Data
      );
      props.setLoading(false);
      if (!success) {
        return enqueueSnackbar(error, {
          variant: 'error',
        });
      }

      if (discounts) setDiscounts(discounts);
      enqueueSnackbar('Merchant sucessfully updated', {
        variant: 'success',
      });
    } catch (error: any) {
    } finally {
      props.setLoading(false);
    }
  }

  return (
    <div>
      <label
        htmlFor="discount"
        className="flex text-lg font-medium pt-4 w-fit border-b-2 border-gray-800"
      >
        Discount setup
      </label>
      <div className="flex max-lg:flex-col gap-8 px-2 pb-8 pt-4">
        <div className="flex flex-col w-2/5 max-lg:w-full gap-10">
          <div className="flex flex-col gap-2">
            <DiscountView data={data} setData={setData} />
          </div>
        </div>
        <div className={`flex flex-col w-3/5 max-lg:w-full relative -mt-8`}>
          <DiscountList
            services={props.merchant.services}
            discounts={discounts}
            setDiscounts={setDiscounts}
            merchantId={props.merchant.id}
          />
          {!Boolean(discounts.length) && (
            <div className="mx-auto">You have no discounts</div>
          )}
        </div>
      </div>
      <div className="mb-4 px-2">
        <Button
          bgColor="bg-slate-700"
          radius="rounded-xl"
          onClick={handleUpdateMerchant}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default DiscountSettings;
