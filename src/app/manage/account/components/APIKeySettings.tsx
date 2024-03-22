'use client';
import React, { type SetStateAction, useState, type Dispatch } from 'react';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import { enqueueSnackbar } from 'notistack';
import { manRope } from '~/font';
import { updateMerchantApiKeySettings } from '../action';
import { type MerchantType } from '~/app/api/merchant/logic';
import CryptoJS from 'crypto-js';

type Props = {
  merchant: MerchantType;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type SecretData = {
  paystackSecretKey: string;
  calendlySecretKey: string;
};
const key = process.env.SECRET_ENCRYPTION_KEY ?? '';
const APIKeySettings = (props: Props) => {
  const [data, setData] = useState<SecretData | null>(null);
  const decrypt = (secret: string) => {
    return CryptoJS.AES.decrypt(secret, key).toString();
  };

  async function handleUpdateMerchant() {
    try {
      props.setLoading(true);
      const { error, success } = await updateMerchantApiKeySettings(
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
            customStyle="text-xs"
            placeholder="Please enter paystack secret key"
            defaultValue={decrypt(props.merchant.apiKeys?.paystack || '')}
            type="text"
            getValue={(paystack: string) => {
              const newSecretData = { ...(data || {}) };
              newSecretData.paystackSecretKey = paystack;
              setData(newSecretData as SecretData);
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="calendly"
            className="text-[10px] uppercase font-semibold"
          >
            Provide calendly secret key.
          </label>
          <TextInput
            name="calendly"
            customStyle="text-xs"
            type="text"
            placeholder="Please enter your calendly scret key"
            defaultValue={decrypt(props.merchant.apiKeys?.calendly || '')}
            getValue={(calendly: string) => {
              const newSecretData = { ...(data || {}) };
              newSecretData.calendlySecretKey = calendly;
              setData(newSecretData as SecretData);
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
