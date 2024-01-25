'use client';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dmSans, manRope } from '~/font';

type Props = {
  getSelectedDate: (date: Date) => void;
};
const Calendar = (props: Props) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <ReactDatePicker
      showIcon
      isClearable
      className="w-full cursor-pointer py-2 rounded-xl !flex outline-none border border-content-normal/20 hover:border-stone-400 !items-center !justify-center"
      calendarClassName="w-full text-[8px] font-normal !rounded-b-2xl !border !border-stone-300"
      wrapperClassName={`w-full text-xs font-normal ${manRope.className} flex gap-5`}
      dayClassName={() =>
        `text-xs rounded-full !w-12 py-2 flex !justify-center !items-center ${manRope.className} !rounded-full`
      }
      weekDayClassName={() =>
        `text-xs rounded-full py-3 !w-12 ${dmSans.className}`
      }
      monthClassName={() => `text-[8px] rounded-full ${dmSans.className}`}
      selected={startDate}
      onChange={date => {
        setStartDate(date!);
        props.getSelectedDate(date!);
      }}
      icon={
        <svg width={20} height={22} viewBox="0 0 20 22" fill={'none'}>
          <path
            d="M1.09253 8.40421H18.9165"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.442 12.3097H14.4512"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.0047 12.3097H10.014"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.55793 12.3097H5.5672"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.442 16.1962H14.4512"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.0047 16.1962H10.014"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.55793 16.1962H5.5672"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.0438 1V4.29078"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.9654 1V4.29078"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2383 2.57922H5.77096C2.83427 2.57922 1 4.21516 1 7.22225V16.2719C1 19.3263 2.83427 21 5.77096 21H14.229C17.175 21 19 19.3546 19 16.3475V7.22225C19.0092 4.21516 17.1842 2.57922 14.2383 2.57922Z"
            stroke={'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  );
};

export default Calendar;
