'use client';
import { useHookstate } from '@hookstate/core';
import React, { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { type MerchantType } from '~/app/api/merchant/logic';
import FacebookIcon from '~/commons/icons/FacebookIcon';
import InstagramIcon from '~/commons/icons/InstagramIcon';
import LinkedInIcon from '~/commons/icons/LinkedInIcon';
import TiktokIcon from '~/commons/icons/TikTokIcon';
import XIcon from '~/commons/icons/XIcon';
import YouTubeIcon from '~/commons/icons/YouTubeIcon';
import Button from '~/components/Button';
import DragAndDrop from '~/components/DragAndDrop';
import TextInput from '~/components/TextInput';
import { hideAdminBar } from '~/states/utility';
import { updateMerchantSocialSettings } from '../action';
import { enqueueSnackbar } from 'notistack';

type Props = {
  merchant: MerchantType;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const SocialSettings = (props: Props) => {
  const hideBar = useHookstate(hideAdminBar);
  const [state, formAction] = useFormState(updateMerchantSocialSettings, {
    merchantId: props.merchant.id,
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      enqueueSnackbar('Data successfully saved!', {
        variant: 'success',
      });
    }
  }, [state.success]);
  useEffect(() => {
    if (state.error) {
      enqueueSnackbar(state.error, {
        variant: 'error',
      });
    }
  }, [state.error]);

  return (
    <form action={formAction}>
      <div
        className={`flex gap-6 py-6 ${
          hideBar.get() ? 'max-md:flex-col-reverse' : 'max-lg:flex-col-reverse'
        }`}
      >
        <div
          className={`w-3/5 flex flex-col mt-2 gap-6 ${
            hideBar.get() ? 'max-md:w-full mt-0' : 'max-lg:w-full mt-0'
          }`}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="facebook" className="text-sm font-medium">
              Your facebook link
            </label>
            <TextInput
              name="facebook"
              customStyle="text-xs"
              type="text"
              defaultValue={props.merchant.facebook || ''}
              placeholder="Please enter your facebook social link"
              prefixSign={<FacebookIcon />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="instagram" className="text-sm font-medium">
              Your instagram link
            </label>
            <TextInput
              name="instagram"
              customStyle="text-xs"
              type="text"
              defaultValue={props.merchant.instagram || ''}
              placeholder="Please enter your instagram social link"
              prefixSign={<InstagramIcon />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="twitter" className="text-sm font-medium">
              Your twitter link
            </label>
            <TextInput
              name="twitter"
              customStyle="text-xs"
              type="text"
              defaultValue={props.merchant.twitter || ''}
              placeholder="Please enter your twitter social link"
              prefixSign={<XIcon />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="linkedin" className="text-sm font-medium">
              Your LinkedIn link
            </label>
            <TextInput
              name="linkedin"
              customStyle="text-xs"
              type="text"
              defaultValue={props.merchant.linkedin || ''}
              placeholder="Please enter your linkedin social link"
              prefixSign={<LinkedInIcon />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="youtube" className="text-sm font-medium">
              Your YouTube link
            </label>
            <TextInput
              name="youtube"
              customStyle="text-xs"
              type="text"
              defaultValue={props.merchant.youtube || ''}
              placeholder="Please enter your youtube social link"
              prefixSign={<YouTubeIcon />}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="tiktok" className="text-sm font-medium">
              Your TikTok link
            </label>
            <TextInput
              name="tiktok"
              customStyle="text-xs"
              type="text"
              defaultValue={props.merchant.tiktok || ''}
              placeholder="Please enter your tiktok social link"
              prefixSign={<TiktokIcon />}
            />
          </div>
        </div>
        <div
          className={`w-2/5 order-0 h-80 ${
            hideBar.get() ? 'max-md:w-full' : 'max-lg:w-full'
          }`}
        >
          <div className="text-sm text-center mb-1 font-medium">
            Add your brand logo
          </div>
          <DragAndDrop defaultValue={props.merchant.logo} name="file" isLogo />
        </div>
      </div>
      <Submit setLoading={props.setLoading} />
    </form>
  );
};

function Submit({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const status = useFormStatus();
  useEffect(() => {
    setLoading(status.pending);
  }, [status.pending]);
  return (
    <div className="mb-4 px-2 order-last">
      <Button
        bgColor="bg-slate-700"
        isDisabled={status.pending}
        radius="rounded-xl"
      >
        Save changes
      </Button>
    </div>
  );
}

export default SocialSettings;
