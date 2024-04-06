'use client';
import { type Prisma } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import React, { type SetStateAction, useState, type Dispatch } from 'react';
import Button from '~/components/Button';
import MultilineTextInput from '~/components/MultilineTextInput';
import TextInput from '~/components/TextInput';
import { updateMerchantGeneralSettings } from '../action';
import { enqueueSnackbar } from 'notistack';

type Props = {
  merchant: Prisma.MerchantGetPayload<Prisma.MerchantDefaultArgs<DefaultArgs>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type Data = {
  name: string;
  address: string | null;
  phoneNo: string;
  caption: string | null;
  shortDescription: string | null;
};
const GeneralSettings = (props: Props) => {
  const [data, setData] = useState<Data>({
    name: props.merchant.name,
    address: props.merchant.address,
    phoneNo: props.merchant.phoneNo,
    caption: props.merchant.caption,
    shortDescription: props.merchant.shortDescription,
  });

  async function handleUpdateMerchant() {
    try {
      props.setLoading(true);
      const { error, success } = await updateMerchantGeneralSettings(
        props.merchant.id,
        data
      );
      props.setLoading(false);
      if (error) {
        return enqueueSnackbar(error, {
          variant: 'error',
        });
      }

      if (!success) {
        return enqueueSnackbar(
          'An unexpected error occurred, please tryagain later or contact support!',
          {
            variant: 'error',
          }
        );
      }

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
      <div className="flex max-lg:flex-col gap-4 px-2 py-8">
        <div className="flex flex-col w-1/2 max-lg:w-full gap-10">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="slug"
              className="text-[10px] uppercase font-semibold"
            >
              Merchant Slug
            </label>
            <TextInput
              name="slug"
              placeholder=""
              isDisabled
              value={props.merchant.slug}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-[10px] uppercase font-semibold"
            >
              Email
            </label>
            <TextInput
              name="email"
              placeholder=""
              isDisabled
              value={props.merchant.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="autoName"
              className="text-[10px] uppercase font-semibold"
            >
              Auto shop name
            </label>
            <TextInput
              name="autoName"
              placeholder="Please enter your auto shop name"
              defaultValue={props.merchant.name || ''}
              getValue={(name: string) => {
                const newData = { ...data };
                newData.name = name;
                setData(newData);
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="address"
              className="text-[10px] uppercase font-semibold"
            >
              Address
            </label>
            <MultilineTextInput
              name="address"
              placeholder="Please enter your work (office) address"
              defaultValue={props.merchant.address || ''}
              getValue={(address: string) => {
                const newData = { ...data };
                newData.address = address;
                setData(newData);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2 max-lg:w-full gap-10">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phoneNo"
              className="text-[10px] uppercase font-semibold"
            >
              Phone Number
            </label>
            <TextInput
              name="phoneNo"
              placeholder="Please enter your work (office) phone number"
              defaultValue={props.merchant.phoneNo || ''}
              getValue={(phoneNo: string) => {
                const newData = { ...data };
                newData.phoneNo = phoneNo;
                setData(newData);
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="caption"
              className="text-[10px] uppercase font-semibold"
            >
              Your page caption
            </label>
            <TextInput
              name="caption"
              placeholder="Please enter a suitable caption for your page (max: 10 words)"
              defaultValue={props.merchant.caption || ''}
              getValue={(caption: string) => {
                const newData = { ...data };
                newData.caption = caption;
                setData(newData);
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="shortDescription"
              className="text-[10px] uppercase font-semibold"
            >
              Page short description
            </label>
            <MultilineTextInput
              name="shortDescription"
              placeholder="Please enter a short description for your page (max: 30 words)"
              defaultValue={props.merchant.shortDescription || ''}
              getValue={(desc: string) => {
                const newData = { ...data };
                newData.shortDescription = desc;
                setData(newData);
              }}
            />
          </div>
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

export default GeneralSettings;
