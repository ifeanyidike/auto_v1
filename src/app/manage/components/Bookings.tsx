import Image from 'next/image';
import React from 'react';
import { dmSans } from '~/font';

type Props = {
  _id: string;
  imgSrc: string;
  name: string;
  title: string;
  category: string;
  status: string;
  date: string;
  action: string;
};

const Bookings = (props: Props) => {
  return (
    <div className="flex w-full gap-4 p-4  text-[10px]">
      <div className="flex-shrink-0 w-16">{props._id}</div>
      <div className="flex-shrink-0 w-32">{props.name}</div>
      <div className="flex-shrink-0 w-16">
        <Image width={25} height={25} src={props.imgSrc} alt="service image" />
      </div>
      <div className="flex-shrink-0 w-32">{props.title}</div>
      <div className="flex-shrink-0 w-32">{props.category}</div>
      <div className={`flex-shrink-0 w-32`}>
        <span
          className={`flex-shrink-0 w-12px  border rounded-full p-1 ${
            props.status === 'Completed'
              ? 'border-green-500 text-green-500'
              : props.status === 'In progress'
                ? 'border-red-500 text-red-500'
                : props.status === 'Requested'
                  ? 'border-purple-400 text-purple-400'
                  : 'border-pink-600 text-pink-600'
          }`}
        >
          {props.status}
        </span>
      </div>
      <div className={`flex-shrink-0 w-24`}>{props.date}</div>
      <div className={`flex-shrink-0 w-32`}>
        <span
          className={`border border-purple-400 text-purple-400 rounded-full py-1 px-2 hover:bg-purple-400 hover:text-white hover:shadow-2xl hover:border-none transition-all duration-800 ease-in-out`}
        >
          {props.action}
        </span>
      </div>
    </div>
  );
};

export default Bookings;
