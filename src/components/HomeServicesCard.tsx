import Image from 'next/image';
import React from 'react';
import ArrowRight from '~/commons/icons/ArrowRight';
import { dmSans } from '~/font';
import Link from 'next/link';

type Props = {
  imgSrc: string;
  title: string;
  category: string;
  details: string;
  href: string;
};

const HomeServicesCard = (props: Props) => {
  return (
    <div className={`flex h-[450px] flex-col rounded-xl p-4`}>
      <Link href={props.href}>
        <Image
          src={props.imgSrc}
          alt={props.title}
          width="400"
          height="280"
          className="h-[240px] w-[400px] rounded-2xl"
        ></Image>
      </Link>

      <div className="mb-5 mt-5 flex flex-col gap-3">
        <h6 className={`text-xs font-medium uppercase text-[#9EA1A6]`}>
          {props.category}
        </h6>
        <span
          className={`text-xl font-medium capitalize text-content-normal ${dmSans.className}`}
        >
          {props.title}
        </span>
        <p className="text-sm font-normal text-content-normal line-clamp-3">
          {props.details}
        </p>
        <Link className="flex cursor-pointer gap-2" href={props.href}>
          <span className="inset-x-0 bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out hover:border-content-normal">
            View Details
          </span>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default HomeServicesCard;
