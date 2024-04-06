import React, { useState } from 'react';
import { type BookingItem } from '~/app/api/booking/logic';
import CloseIcon from '~/commons/icons/CloseIcon';
import { dmSans } from '~/font';
import ProductPane from '../../product/components/ProductPane';
import PersonIcon from '~/commons/icons/PersonIcon';
import EnvelopeIcon from '~/commons/icons/EnvelopeIcon';
import Image from 'next/image';
import PhoneIcon from '~/commons/icons/PhoneIcon';
import KeyIcon from '~/commons/icons/KeyIcon';
import CheckIcon from '~/commons/icons/CheckIcon';
import CalendarIcon from '~/commons/icons/CalendarIcon';
import Toggler from '~/components/Toggler';
import BookmarkIcon from '~/commons/icons/BookmarkIcon';
import Button from '~/components/Button';
import { updateBookingStatus } from '../action';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import LoaderOne from '~/components/LoaderOne';

type Props = {
  item: BookingItem;
  bookingList: BookingItem[];
  setBookingList: React.Dispatch<React.SetStateAction<BookingItem[]>>;
  onClose: () => void;
};

const BookingDetail = (props: Props) => {
  const [item, setItem] = useState<BookingItem>(props.item);
  const [markAsPaid, setMarkAsPaid] = useState<boolean>(item.isPaid);
  const [markAsFulfilled, setMarkAsFulfilled] = useState<boolean>(
    item.isFullfilled
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

  const handleUpdateBookingStatus = async () => {
    setLoading(true);
    await updateBookingStatus({
      id: item.id,
      isPaid: markAsPaid,
      isFulfilled: markAsFulfilled,
    });
    setLoading(false);
    enqueueSnackbar('Booking details successfully updated', {
      variant: 'success',
    });
    const newItem = { ...item };
    newItem.isPaid = markAsPaid;
    newItem.isFullfilled = markAsFulfilled;
    setItem(newItem);

    const bookingListIdx = props.bookingList.findIndex(b => b.id === item.id);
    if (bookingListIdx > -1) {
      const newBookingList = [...props.bookingList];
      newBookingList[bookingListIdx]!.isPaid = markAsPaid;
      newBookingList[bookingListIdx]!.isFullfilled = markAsFulfilled;
      props.setBookingList(newBookingList);
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
            Booking for {item.merchantService?.service?.title}
          </h2>
          <small className="text-xs text-right">
            {item.merchantService?.service?.type}
          </small>
        </div>
        <div className="flex flex-col gap-7 h-[calc(100%-56px)] overflow-auto">
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
                      {item?.user?.firstName || item?.user?.lastName
                        ? `${item.user?.firstName || ''} ${
                            item.user?.lastName || ''
                          }`
                        : item.user?.email}
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

          <ProductPane paneTitle="Settings" initExpanded>
            <div className="flex gap-4 flex-col mt-4 items-center">
              <small className="text-[10px]">
                *This is useful for manual settings or completing a booking
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
                      ? 'Mark this booking as NOT paid'
                      : 'Mark this booking as paid'}
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
                      ? 'Mark this booking as NOT fulfilled'
                      : 'Mark this booking as completed'}
                  </span>
                </div>
              </div>
              {(markAsPaid !== item.isPaid ||
                markAsFulfilled !== item.isFullfilled) && (
                <Button
                  width="w-24"
                  bgColor="bg-slate-800"
                  px="px-5"
                  py="py-2"
                  height="h-10"
                  onClick={handleUpdateBookingStatus}
                >
                  <div className="flex gap-1 items-center text-sm rounded">
                    <BookmarkIcon /> Save
                  </div>
                </Button>
              )}
            </div>
          </ProductPane>

          <ProductPane paneTitle="Booking Info" initExpanded>
            <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 items-center flex-wrap">
              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Booking ID</small>

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
                <small className="text-gray-400">Payment Status</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className}`}>
                    {item.isPaid ? 'Paid' : 'Not Paid'}
                  </p>
                  {item.isPaid ? (
                    <CheckIcon fill="#1bbd49" />
                  ) : (
                    <CloseIcon strokeColor="red" classNames="w-4 h-4" />
                  )}
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Booking fulfillment</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className}`}>
                    {item.isFullfilled ? 'Completed' : 'Not Completed'}
                  </p>
                  {item.isFullfilled ? (
                    <CheckIcon fill="#1bbd49" />
                  ) : (
                    <CloseIcon strokeColor="red" classNames="w-4 h-4" />
                  )}
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Requires outside work</small>

                <div className="flex gap-1 items-center">
                  <p className={`${dmSans.className}`}>
                    {item.isOutsideWork ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Booked On</small>

                <div className="flex gap-1 items-center">
                  <CalendarIcon classNames="h-3 w-3" />
                  <p className={`${dmSans.className}`}>
                    {new Date(item.createdAt).toDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Payment channel</small>

                <div className="flex gap-1 items-center capitalize">
                  <p className={`${dmSans.className}`}>
                    {item.paymentMode || 'None'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-sm gap-1">
                <small className="text-gray-400">Amount</small>

                <div className="flex gap-1 items-center capitalize">
                  <p className={`${dmSans.className} text-lg font-mono`}>
                    ₦{item.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-sm gap-1 mb-2">
              <small className="text-gray-400">Preferred Location</small>

              <div className="flex gap-1 items-center capitalize">
                <p className={`${dmSans.className}`}>
                  {item.location || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex flex-col text-sm gap-1">
              <small className="text-gray-400">Extra Info</small>

              <div className="flex gap-1 items-center capitalize">
                <p className={`${dmSans.className}`}>
                  {item.info || 'Not provided'}
                </p>
              </div>
            </div>
          </ProductPane>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
