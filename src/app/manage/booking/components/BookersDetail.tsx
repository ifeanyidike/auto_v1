import React, { useState } from 'react';
import { type BookingItem } from '~/app/api/booking/logic';
import CloseIcon from '~/commons/icons/CloseIcon';
import { dmSans } from '~/font';
import BookingList from './BookingList';

type Props = {
  item: BookingItem[];
  onClose: () => void;
};

const BookersDetail = (props: Props) => {
  const [closing, setClosing] = useState(false);

  React.useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      props.onClose();
      setClosing(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [closing]);

  return (
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
          Booking details for {props.item[0]?.user?.firstName || ''}{' '}
          {props.item[0]?.user?.lastName || ''}
        </h2>
      </div>
      <BookingList bookingList={props.item} />
    </div>
  );
};

export default BookersDetail;
