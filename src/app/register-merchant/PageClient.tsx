'use client';
import React, { useState } from 'react';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import { dmSans, manRope } from '~/font';
import { createMerchant } from './action';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import LoaderOne from '~/components/LoaderOne';
import StylishInput from '~/components/StylishInput';

type Props = {
  email: string;
};
type Data = {
  email: string;
  name?: string;
  slug?: string;
  phoneNo?: string;
};

const ArrowLeft = () => (
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
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);

const PageClient = (props: Props) => {
  const [data, setData] = useState<Data>({ email: props.email });
  const [loading, setLoading] = useState<boolean>(false);
  const [addEmail, toggleAddEmail] = useState<boolean>(!props.email);

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
      window.location.href = `http://${data.slug}.admin.moxxil.com/manage`;
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
      className={`${dmSans.className} ${
        addEmail ? 'mt-48 mb-32' : 'my-32'
      } w-[600px] h-fit  mx-auto rounded-xl px-8 py-5 flex flex-col gap-5  max-md:w-96 max-sm:w-full`}
    >
      <SnackbarProvider maxSnack={1} />
      {loading && <LoaderOne />}
      <h2 className={`mb-4 text-3xl font-bold ${manRope.className}`}>
        Create your Auto Shop
      </h2>

      {addEmail ? (
        <StylishInput
          placeholder="Email address"
          type="email"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          required
          getValue={(text: string) => {
            const newData = { ...data };
            newData.email = text;
            setData(newData);
          }}
        />
      ) : (
        <>
          <div
            className={`text-sm font-medium flex flex-col bg-[#ebe8e5]/20 pl-3 !py-2 text-content-normal/80`}
          >
            <span className="text-[10px] py-0">Email address</span>
            <TextInput
              customStyle="pl-0 !py-1 text-sm font-light border-0 border-0 border-0 bg-transparent outline-0 rounded-none"
              placeholder="email"
              defaultValue={data.email}
              isDisabled
            />
          </div>
          <StylishInput
            placeholder="Auto shop name"
            required
            getValue={(text: string) => {
              const newData = { ...data };
              newData.name = text;
              newData.slug = convertToSlug(text);
              setData(newData);
            }}
          />

          <StylishInput
            placeholder="Your slug"
            defaultValue={data.slug}
            value={data.slug}
            required
            getValue={(text: string) => {
              const newData = { ...data };
              newData.slug = convertToSlug(text);
              setData(newData);
            }}
          />

          <StylishInput
            placeholder="Phone number"
            required
            getValue={(text: string) => {
              const newData = { ...data };
              newData.phoneNo = text;
              setData(newData);
            }}
          />
          <button
            onClick={() => {
              const newData = { ...data };
              newData.email = '';
              setData(newData);
              toggleAddEmail(true);
            }}
            className="flex gap-1 items-center my-0 py-0"
          >
            <ArrowLeft />{' '}
            <small className="text-sm font-light">Use a different email</small>
          </button>
        </>
      )}

      {addEmail ? (
        <Button
          width="w-full"
          radius="rounded-md"
          bgColor={`bg-[#e4f222]`}
          textColor="text-[#2e2e27]"
          py="py-4"
          onClick={() => {
            if (!data.email) {
              return enqueueSnackbar('Email address is required', {
                variant: 'error',
              });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(data.email.trim())) {
              return enqueueSnackbar(
                'Email address is not in correct format.',
                {
                  variant: 'error',
                }
              );
            }
            toggleAddEmail(false);
          }}
        >
          Continue
        </Button>
      ) : (
        <Button
          width="w-full"
          radius="rounded-md"
          bgColor={`bg-[#e4f222]`}
          textColor="text-[#2e2e27]"
          py="py-4"
          onClick={handleCreateMerchant}
        >
          Get started
        </Button>
      )}
    </div>
  );
};

export default PageClient;
