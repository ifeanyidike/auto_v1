import Image from "next/image";
import React from "react";
import { colors, currentTheme } from "~/colors";
import ArrowRight from "~/commons/icons/ArrowRight";
import { dmSans, manRope, openSans } from "~/font";

type Props = {
  imgSrc: string;
  title: string;
  category: string;
  details: string;
};
const HomeServicesCard = (props: Props) => {
  return (
    <div className={`flex h-[450px] flex-col rounded-xl p-4`}>
      <Image
        src={props.imgSrc}
        alt={props.title}
        width="400"
        height="200"
        className="h-[250px] w-auto rounded-2xl"
      ></Image>
      <div className="mb-5 mt-5 flex flex-col gap-3">
        <h6 className={`text-xs font-medium uppercase text-[#9EA1A6]`}>
          {props.category}
        </h6>
        <span
          className={`text-xl font-medium capitalize text-[#292b35] ${dmSans.className}`}
        >
          {props.title}
        </span>
        <p className="text-sm font-normal text-[#292b35]">{props.details}</p>
        <div className="flex cursor-pointer gap-2">
          <span className="inset-x-0 bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out hover:border-[#292b35]">
            View Details
          </span>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default HomeServicesCard;
