import React, { useState } from 'react';
import { type SubscriptionItem } from '~/app/api/subscription/logic';
import CloseIcon from '~/commons/icons/CloseIcon';
import { dmSans } from '~/font';
import ProductPane from '../../product/components/ProductPane';
import KeyIcon from '~/commons/icons/KeyIcon';
import CalendarIcon from '~/commons/icons/CalendarIcon';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import LoaderOne from '~/components/LoaderOne';
import CheckIcon from '~/commons/icons/CheckIcon';
import Toggler from '~/components/Toggler';
import Button from '~/components/Button';
import BookmarkIcon from '~/commons/icons/BookmarkIcon';
import { updateSubscriptionStatus } from '../action';

type Props = {
  item: {
    fulfillment: SubscriptionItem['fufillments'][0];
    subscriptionId: string;
    plan: SubscriptionItem['plan'];
    index: number;
  };
  fulfillmentList: SubscriptionItem['fufillments'];
  setFulfillmentList: React.Dispatch<
    React.SetStateAction<SubscriptionItem['fufillments']>
  >;
  onClose: () => void;
};

const SubscriptionFulfillmentDetail = (props: Props) => {
  const [item, setItem] = useState<SubscriptionItem['fufillments'][0]>(
    props.item.fulfillment
  );
  const [markAsPaid, setMarkAsPaid] = useState<boolean>(item.isPaid);
  const [markAsFulfilled, setMarkAsFulfilled] = useState<boolean>(
    item.isFulfilled
  );
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);

  React.useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      props.onClose();
      setClosing(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [closing]);

  const handleUpdateSubsciptionStatus = async () => {
    setLoading(true);
    await updateSubscriptionStatus({
      id: item.id,
      isPaid: markAsPaid,
      isFulfilled: markAsFulfilled,
      alreadyFulfilled: item.isFulfilled,
      alreadyPaid: item.isPaid,
    });
    setLoading(false);
    enqueueSnackbar('Subsciption details successfully updated', {
      variant: 'success',
    });
    const newItem = { ...item };
    newItem.isPaid = markAsPaid;
    newItem.isFulfilled = markAsFulfilled;
    setItem(newItem);

    const subscriptionListIdx = props.fulfillmentList?.findIndex(
      b => b.id === item.id
    );
    if (subscriptionListIdx > -1) {
      const newSubscriptionList = [...props.fulfillmentList];
      newSubscriptionList[subscriptionListIdx]!.isPaid = markAsPaid;
      newSubscriptionList[subscriptionListIdx]!.isFulfilled = markAsFulfilled;
      props.setFulfillmentList(newSubscriptionList);
    }
  };

  return (
    <>
      <SnackbarProvider maxSnack={1} />
      {loading && <LoaderOne />}
      <div
        className={`${
          !closing ? 'animate-slideIn' : 'animate-slideOut'
        } w-[70%] bg-gray-50 fixed right-0 top-[75px] h-[90.5%] z-[51] rounded-l-3xl px-14 py-4 max-md:w-full opacity-0 transition-opacity duration-200 ease-in-out ${
          props.item ? 'opacity-100' : ''
        } shadow-right-bottom-md shadow-black`}
      >
        {' '}
        <div
          className="absolute right-10 cursor-pointer"
          onClick={() => setClosing(true)}
        >
          <CloseIcon />
        </div>
        <div className="text-center mb-4 h-14">
          <h2 className={` text-2xl ${dmSans.className}`}>
            Subscription Record #{props.item.index}
          </h2>
        </div>
        <div className="flex flex-col gap-7 h-[calc(100%-56px)] overflow-auto pb-8">
          <ProductPane paneTitle="Record Info" initExpanded>
            <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 items-center flex-wrap">
              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">
                  Current Cycle Payment Status
                </small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className} uppercase text-xs`}>
                    {item.isPaid ? 'Paid' : 'Not Paid'}
                  </p>
                  {item.isPaid ? (
                    <CheckIcon classNames="w-3 h-3" fill="#1bbd49" />
                  ) : (
                    <CloseIcon strokeColor="red" classNames="w-4 h-4" />
                  )}
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Paid On</small>

                <div className="flex gap-1 items-center">
                  <CalendarIcon classNames="w-3 h-3" />
                  <p className={`${dmSans.className} uppercase text-xs`}>
                    {item.paidOn
                      ? new Date(item.paidOn).toLocaleDateString()
                      : '_'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Is Completed</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className} uppercase text-xs`}>
                    {item.isFulfilled ? 'Completed' : 'Not Completed'}
                  </p>
                  {item.isFulfilled ? (
                    <CheckIcon classNames="w-3 h-3" fill="#1bbd49" />
                  ) : (
                    <CloseIcon strokeColor="red" classNames="w-4 h-4" />
                  )}
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Completed On</small>

                <div className="flex gap-1 items-center">
                  <CalendarIcon classNames="w-3 h-3" />
                  <p className={`${dmSans.className} uppercase text-xs`}>
                    {item.fulfilledOn
                      ? new Date(item.fulfilledOn).toLocaleDateString()
                      : '_'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Next Cycle Starts</small>

                <div className="flex gap-1 items-center">
                  <CalendarIcon classNames="w-3 h-3" />
                  <p className={`${dmSans.className} uppercase text-xs`}>
                    {new Date(item.nextCycleStarts).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </ProductPane>

          <ProductPane paneTitle="Subscription Plan Info" initExpanded>
            <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 items-center flex-wrap">
              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Subscription ID</small>

                <div className="flex gap-1 items-center">
                  <KeyIcon classNames="h-3 w-3" />
                  <p
                    className={`${dmSans.className} overflow-auto text-gray-500 text-xs`}
                  >
                    {item.id}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Plan Code</small>

                <div className="flex gap-1 items-center">
                  <KeyIcon classNames="h-3 w-3" />
                  <p
                    className={`${dmSans.className} overflow-auto text-gray-500 text-xs`}
                  >
                    {props.item.plan?.code}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Plan Interval</small>

                <div className="flex gap-1 items-center">
                  <CalendarIcon classNames="w-3 h-3" />
                  <p className={`${dmSans.className} uppercase text-[10px]`}>
                    {props.item.plan?.interval}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Brand</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className}`}>
                    {props.item.plan?.autoBrand}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Amount paid</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className} font-mono`}>
                    {`₦${Number(
                      props.item.fulfillment?.amountPaid
                    ).toLocaleString()}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col mt-4 items-center">
              <small className="text-[10px]">
                *This is useful for manual settings or completing a subscription
              </small>
              <div className="text-sm flex max-sm:flex-col gap-10 ">
                <div className="flex items-center gap-4">
                  <Toggler
                    classNames="!h-4"
                    value={markAsPaid}
                    setToggled={() => {
                      setMarkAsPaid(!markAsPaid);
                    }}
                  />
                  <span>
                    {markAsPaid
                      ? 'Mark this subscription as NOT paid'
                      : 'Mark this subscription as paid'}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Toggler
                    classNames="!h-4"
                    value={markAsFulfilled}
                    setToggled={() => {
                      setMarkAsFulfilled(!markAsFulfilled);
                    }}
                  />
                  <span>
                    {markAsFulfilled
                      ? 'Mark this subscription as NOT completed'
                      : 'Mark this subscription as completed'}
                  </span>
                </div>
              </div>
              {(markAsPaid !== item.isPaid ||
                markAsFulfilled !== item.isFulfilled) && (
                <Button
                  width="w-24"
                  bgColor="bg-slate-800"
                  px="px-5"
                  py="py-2"
                  height="h-10"
                  onClick={handleUpdateSubsciptionStatus}
                >
                  <div className="flex gap-1 items-center text-sm rounded">
                    <BookmarkIcon /> Save
                  </div>
                </Button>
              )}
            </div>
          </ProductPane>
        </div>
      </div>
    </>
  );
};

export default SubscriptionFulfillmentDetail;
