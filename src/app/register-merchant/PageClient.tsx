'use client';
import React, { useState } from 'react';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import { dmSans, nunitoSans } from '~/font';
import { createMerchant } from './action';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import LoaderOne from '~/components/LoaderOne';

type Props = {
  email: string;
};
type Data = {
  email: string;
  name?: string;
  slug?: string;
  phoneNo?: string;
};
const PageClient = (props: Props) => {
  const [data, setData] = useState<Data>({ email: props.email });
  const [loading, setLoading] = useState<boolean>(false);

  const convertToSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };

  async function handleCreateMerchant() {
    try {
      setLoading(true);
      const { error, success } = await createMerchant(data);
      setLoading(false);
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

      enqueueSnackbar('Merchant sucessfully created', {
        variant: 'success',
      });
      window.location.href = `http://admin.${data.slug}.moxxil.com/manage`;
    } catch (error: any) {
      let message = error.message;
      if (message === 'unique_constraint_failed') {
        message = 'The slug has been taken. Please try another slug!';
      }
      return enqueueSnackbar(message, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className={`${dmSans.className} w-[500px] h-fit my-14 mx-auto bg-orange-100 rounded-xl px-8 py-5 flex flex-col gap-10`}
    >
      <SnackbarProvider maxSnack={1} />
      {loading && <LoaderOne />}
      <h2
        className={`-mb-3 text-xl text-center font-medium ${nunitoSans.className}`}
      >
        Register Your Auto Shop
      </h2>
      <div className={`text-sm font-medium flex flex-col gap-2`}>
        <span className="uppercase text-[10px]">Your email</span>
        <TextInput
          customStyle="pl-0 !py-1 text-sm font-light border-r-0 border-l-0 border-t-0 bg-transparent outline-0 rounded-none border-b-2 border-b-indigo-900/50 text-content-normal/80"
          placeholder="email"
          defaultValue={props.email!}
          isDisabled
        />
      </div>

      <div className={`text-sm font-medium flex flex-col gap-2`}>
        <span className="uppercase text-[10px]">Auto Merchant name</span>
        <TextInput
          customStyle="pl-0 !py-1 text-sm font-light border-r-0 border-l-0 border-t-0 bg-transparent outline-0 rounded-none border-b-2 border-b-indigo-900/50 text-content-normal"
          placeholder="Please enter your merchant name"
          getValue={(text: string) => {
            const newData = { ...data };
            newData.name = text;
            newData.slug = convertToSlug(text);
            setData(newData);
          }}
        />
      </div>

      <div className={`text-sm font-medium flex flex-col gap-2`}>
        <span className="uppercase text-[10px]">Your slug</span>
        <TextInput
          customStyle="pl-0 !py-1 text-sm font-light border-r-0 border-l-0 border-t-0 bg-transparent outline-0 rounded-none border-b-2 border-b-indigo-900/50 text-content-normal"
          defaultValue={data.slug}
          value={data.slug}
          getValue={(text: string) => {
            const newData = { ...data };
            newData.slug = convertToSlug(text);
            setData(newData);
          }}
        />
      </div>

      <div className={`text-sm font-medium flex flex-col gap-2`}>
        <span className="uppercase text-[10px]">Phone Number</span>
        <TextInput
          customStyle="pl-0 !py-1 text-sm font-light border-r-0 border-l-0 border-t-0 bg-transparent outline-0 rounded-none border-b-2 border-b-indigo-900/50 text-content-normal"
          placeholder="Please enter your phone number"
          getValue={(text: string) => {
            const newData = { ...data };
            newData.phoneNo = text;
            setData(newData);
          }}
        />
      </div>
      <Button
        width="w-full"
        radius="rounded-xl"
        bgColor={`${false ? 'bg-neutral-800' : 'bg-indigo-900'}`}
        onClick={handleCreateMerchant}
      >
        Get started
      </Button>
    </div>
  );
};

export default PageClient;
