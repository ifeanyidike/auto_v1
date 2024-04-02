'use client';
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';
import Stars from './Stars';
import MultilineTextInput from '~/components/MultilineTextInput';
import Button from '~/components/Button';
import { useFormState, useFormStatus } from 'react-dom';
import LoaderOne from '~/components/LoaderOne';
import { saveReview } from './action';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

type Props = {
  type: 'subscription' | 'booking';
  itemId: string;
  existingRating: number | undefined;
  existingDescription: string | null | undefined;
};
const PageClient = (props: Props) => {
  const [actionCount, setActionCount] = useState(0);
  const [state, formAction] = useFormState(saveReview, {
    success: false,
  });
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (state.success) {
      enqueueSnackbar('Your review is successfully saved', {
        variant: 'success',
      });
    }

    if (state.error) {
      enqueueSnackbar(state.error, {
        variant: 'error',
      });
    }
  }, [state || actionCount]);
  return (
    <form action={!props.existingRating ? formAction : () => {}}>
      <SnackbarProvider maxSnack={1} />
      <div className="my-32 flex flex-col w-[600px] max-md:w-96 max-sm:w-80 items-center justify-center mx-auto">
        <small className="mb-4">
          Reviews are public and include your account info.
        </small>
        <Stars name="rating" existingRating={props.existingRating} />
        <input type="hidden" name="type" value={props.type} />
        <input type="hidden" name="itemId" value={props.itemId} />
        <div className="flex flex-col gap-1 w-full mt-16 mb-8">
          <label className="text-sm" htmlFor="description">
            Tell us a bit more!
          </label>
          <div className="flex flex-col">
            <MultilineTextInput
              initialHeight={200}
              max={500}
              tailwindHeight="h-20 min-h-20"
              placeholder="Describe your experience"
              defaultValue={props.existingDescription ?? ''}
              isDisabled={!!props.existingDescription}
              darkenBorder
              name="description"
              getValue={(text: string) => {
                setDescription(text);
              }}
            />
            <small className="ml-auto block text-xs">
              {description.length}/500
            </small>
          </div>
        </div>
        {!props.existingRating && (
          <Submit
            hasExisting={!!props.existingRating}
            setActionCount={setActionCount}
          />
        )}
      </div>
    </form>
  );
};

function Submit({
  setActionCount,
  hasExisting,
}: {
  setActionCount: Dispatch<SetStateAction<number>>;
  hasExisting: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const status = useFormStatus();
  useEffect(() => {
    setLoading(status.pending);
  }, [status.pending]);

  return (
    <div className="mb-4 px-2 order-last">
      {loading && <LoaderOne />}
      <Button
        bgColor="bg-slate-700"
        isDisabled={status.pending || hasExisting}
        radius="rounded-xl"
        onClick={() => setActionCount(prev => prev + 1)}
      >
        Save changes
      </Button>
    </div>
  );
}

export default PageClient;
