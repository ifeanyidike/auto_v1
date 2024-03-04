'use client';
import React, { useEffect } from 'react';
import CheckIcon from '~/commons/icons/CheckIcon';
import Button from '~/components/Button';
import { manRope, nunitoSans } from '~/font';
import { subscribeUserToPlan } from './subscribeAction';
import { useFormState } from 'react-dom';
import { enqueueSnackbar } from 'notistack';
import { SnackbarProvider } from 'notistack';
import { useSearchParams } from 'next/navigation';

type Props = {
  interval: string;
  amount: number;
  originalAmount: number;
  discount: string | undefined;
  focal?: boolean;
  data: string[];
  planCode: string;
};

const SubscriptionCard = (props: Props) => {
  const { focal, data } = props;
  const params = useSearchParams();

  const initialState = {
    message: '',
    amount: props.amount,
    planCode: props.planCode,
    serviceId: params.get('id'),
    authorizationUrl: '',
  };
  const [state, formAction] = useFormState(subscribeUserToPlan, initialState);

  useEffect(() => {
    if (!state.authorizationUrl) return;
    window.open(state.authorizationUrl);
  }, [state.authorizationUrl]);

  useEffect(() => {
    if (!state.message) return;
    enqueueSnackbar(state.message, {
      variant: 'error',
    });
  }, [state.message]);
  return (
    <>
      <SnackbarProvider maxSnack={1} />
      <form
        action={formAction}
        className={`${manRope.className} rounded-xl flex flex-col ${
          focal ? 'bg-stone-200' : 'bg-slate-300'
        } w-[400px] px-6 py-8`}
      >
        {props.discount && (
          <div className="flex gap-1 items-center text-stone-100 mx-auto mb-2 bg-content-normal/20 px-2 py-[2px] rounded-full">
            <span className="text-xs">★</span>{' '}
            <span className="text-xs">Save {props.discount}</span>
          </div>
        )}
        <span className="capitalize text-center text-sm mb-2">
          {props.interval}
        </span>
        <div className="text-center flex justify-center items-center gap-2">
          <p className={`${nunitoSans.className} text-4xl font-bold`}>
            ₦{props.amount.toLocaleString()}
          </p>
          {props.discount && (
            <span className=" text-xs line-through mt-2">
              ₦{props.originalAmount.toLocaleString()}
            </span>
          )}
        </div>

        <span className="text-stone-400 text-xs text-center mb-6">
          Billed {props.interval}
        </span>

        <div className="flex flex-col gap-5">
          {data?.map(text => (
            <div key={text} className="flex gap-2 items-start">
              <div className="bg-slate-600 text-stone-100 w-fit h-fit p-1 rounded-full">
                <CheckIcon classNames="h-3 w-3" />
              </div>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
        <div className="w-full mt-8">
          <Button
            width="w-full"
            radius="rounded-xl"
            bgColor={`${focal ? 'bg-neutral-800' : 'bg-indigo-900'}`}
          >
            Get started
          </Button>
        </div>
      </form>
    </>
  );
};

export default SubscriptionCard;
