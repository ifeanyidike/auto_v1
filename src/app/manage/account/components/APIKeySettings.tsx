'use client';
import React, { type SetStateAction, useState, type Dispatch } from 'react';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import { enqueueSnackbar } from 'notistack';
import { manRope } from '~/font';
import { updateMerchantApiKeySettings } from '../action';
import { type MerchantType } from '~/app/api/merchant/logic';

const EyeOpen = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
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

const EyeClosed = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

type Props = {
  merchant: MerchantType;
  setLoading: Dispatch<SetStateAction<boolean>>;
  decryptedSecrets: Record<'paystack', string>;
};

type Data = {
  paystackSecretKey: string;
  calendlyLink: string;
};
const APIKeySettings = (props: Props) => {
  const [data, setData] = useState<Data | null>(null);
  const [viewSecret, setViewSecret] = useState<
    Record<'paystack' | 'calendly', boolean>
  >({ paystack: false, calendly: false });

  async function handleUpdateMerchant() {
    let dataToUpdate = data;
    if (!dataToUpdate?.paystackSecretKey && props.decryptedSecrets.paystack) {
      dataToUpdate = {
        ...(dataToUpdate || {}),
        paystackSecretKey: props.decryptedSecrets.paystack,
      } as Data;
    }
    try {
      props.setLoading(true);
      const { error, success } = await updateMerchantApiKeySettings(
        props.merchant.id,
        dataToUpdate
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
      <div className="flex flex-col gap-14 px-2 py-8 w-1/2 gap max-md:w-full">
        <small className={`text-[10px] ${manRope.className}`}>
          * API keys help you to configure key functionalities of your
          application such as payment and appointment scheduling. Your keys will
          be securely encrypted.
        </small>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="paystack"
            className="text-[10px] uppercase font-semibold"
          >
            Provide your paystack secret key.
          </label>

          <TextInput
            name="paystack"
            customStyle="text-xs !border-r-0"
            placeholder="Please enter paystack secret key"
            defaultValue={props.decryptedSecrets.paystack}
            type={viewSecret.paystack ? 'text' : 'password'}
            getValue={(paystack: string) => {
              const newData = { ...(data || {}) };
              newData.paystackSecretKey = paystack;
              setData(newData as Data);
            }}
            suffixSign={
              <button
                onClick={() =>
                  setViewSecret({
                    ...viewSecret,
                    paystack: !viewSecret.paystack,
                  })
                }
              >
                {viewSecret.paystack ? <EyeClosed /> : <EyeOpen />}
              </button>
            }
            customSuffixStyle="!bg-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="calendly"
            className="text-[10px] uppercase font-semibold"
          >
            Provide calendly secret meeting link.
          </label>
          <TextInput
            name="calendly"
            customStyle="text-xs"
            type="text"
            placeholder="Please enter your calendly meeting link"
            defaultValue={props.merchant.calendlyLink || ''}
            getValue={(calendly: string) => {
              const newData = { ...(data || {}) };
              newData.calendlyLink = calendly;
              setData(newData as Data);
            }}
          />
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

export default APIKeySettings;
