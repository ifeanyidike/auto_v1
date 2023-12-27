import Image from "next/image";
import React from "react";
import ArrowRight from "~/commons/icons/ArrowRight";
import Link from "next/link";
import { dmSans } from "~/font";

type Props = {
  imgSrc: string;
  title: string;
  category: string;
  details: string;
  href: string;
};

const ServicesCard = (props: Props) => {
  return (
    <div className={`flex h-[450px] flex-col rounded-xl p-4`}>
      <Link href={`/service`}>
        <Image
          src={props.imgSrc}
          alt={props.title}
          width="400"
          height="280"
          className="h-[240px] w-[400px] rounded-2xl"
        ></Image>
      </Link>
      <div className="mb-5 mt-5 flex w-full flex-col gap-3 sm:text-center md:text-left">
        <h6 className={`text-xs font-medium uppercase text-[#9EA1A6]`}>
          {props.category}
        </h6>
        <span
          className={`text-xl font-medium capitalize text-content-normal ${dmSans.className}`}
        >
          {props.title}
        </span>
        <p className="text-sm font-normal text-content-normal">
          {props.details}
        </p>
        <div className="flex cursor-pointer gap-2">
          <span className="inset-x-0 bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out hover:border-content-normal">
            <Link href={`/service`}>View Details</Link>
          </span>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
