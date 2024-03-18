import React, { useState } from 'react';
import { type SubscriptionItem } from '~/app/api/subscription/logic';
import CloseIcon from '~/commons/icons/CloseIcon';
import { dmSans } from '~/font';
import ProductPane from '../../product/components/ProductPane';
import PersonIcon from '~/commons/icons/PersonIcon';
import EnvelopeIcon from '~/commons/icons/EnvelopeIcon';
import Image from 'next/image';
import PhoneIcon from '~/commons/icons/PhoneIcon';
import KeyIcon from '~/commons/icons/KeyIcon';
import CalendarIcon from '~/commons/icons/CalendarIcon';
import { SnackbarProvider } from 'notistack';
import SubscriptionFulfillmentList from './SubscriptionFulfillmentList';

type Props = {
  item: SubscriptionItem;
  subscriptionList: SubscriptionItem[];
  setSubscriptionList: React.Dispatch<React.SetStateAction<SubscriptionItem[]>>;
  onClose: () => void;
};

const SubscriptionDetail = (props: Props) => {
  const { item } = props;
  const [closing, setClosing] = useState(false);

  console.log('item', item);
  console.log('subscriptionList', props.subscriptionList);
  React.useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      props.onClose();
      setClosing(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [closing]);

  return (
    <>
      <SnackbarProvider maxSnack={1} />

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
            Subscription for {item.merchantService?.service?.title}
          </h2>
          <small className="text-xs text-right">
            {item.merchantService?.service?.type}
          </small>
        </div>
        <div className="flex flex-col gap-7 h-[calc(100%-56px)] overflow-auto pb-8">
          <ProductPane paneTitle="User Details" initExpanded>
            <div className="flex flex-col justify-center gap-4">
              <Image
                width={50}
                height={50}
                src={item.user?.imgUrl!}
                className="mx-auto rounded-full"
                alt="User pic"
              />
              <div className="grid grid-cols-3 place-items-center gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
                <div className="flex flex-col text-sm gap-1">
                  <small className="text-gray-400">Name</small>

                  <div className="flex gap-1">
                    <PersonIcon />
                    <p className={`${dmSans.className}`}>
                      {item.user?.firstName} {item.user?.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-sm gap-1">
                  <small className="text-gray-400">Email</small>

                  <div className="flex gap-1 overflow-auto">
                    <EnvelopeIcon />
                    <p className={`${dmSans.className}`}>{item.user?.email}</p>
                  </div>
                </div>

                <div className="flex flex-col text-sm gap-1">
                  <small className="text-gray-400">Phone Number</small>

                  <div className="flex gap-1">
                    <PhoneIcon />
                    <p className={`${dmSans.className}`}>
                      {item.user?.phoneNo ?? 'Not provided'}
                    </p>
                  </div>
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
                    {item.plan?.code}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Plan Interval</small>

                <div className="flex gap-1 items-center">
                  <CalendarIcon classNames="w-3 h-3" />
                  <p className={`${dmSans.className} uppercase text-[10px]`}>
                    {item.plan?.interval}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Brand</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className} uppercase text-[10px]`}>
                    {item.plan?.autoBrand}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Subscription Status</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className}`}>{item?.status}</p>
                  <div
                    className={`${
                      item?.status === 'active' ? 'bg-green-500' : 'bg-black'
                    } rounded-full w-[6px] h-[6px]`}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Subscription created on</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className}`}>
                    {new Date(item.createdAt).toDateString()}
                  </p>
                  <CalendarIcon classNames="w-3 h-3" />
                </div>
              </div>
            </div>
          </ProductPane>

          <SubscriptionFulfillmentList
            subscriptionId={item.id}
            plan={item.plan}
            fulfillments={item.fufillments}
          />
        </div>
      </div>
    </>
  );
};

export default SubscriptionDetail;
