import Image from "next/image";
import React from "react";
import { dmSans } from "~/font";

type Props = {
  isActive: boolean;
  reviewer: string;
  content: string;
  role: string;
};
const ReviewCard = (props: Props) => {
  return (
    <div
      style={{ opacity: props.isActive ? 1 : 0 }}
      className="flex flex-col gap-5 rounded-2xl bg-white px-10 py-12"
    >
      <div className="flex gap-3 max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:text-center">
        <Image
          src="/images/avatar.webp"
          alt="avatar"
          width={50}
          height={50}
        ></Image>
        <div className="flex flex-col">
          <span className={`${dmSans.className} text-lg font-medium`}>
            {props.reviewer}
          </span>
          <span className="text-xs font-light">{props.role}</span>
        </div>
        <div className="ml-auto flex text-yellow max-sm:mr-auto">★ ★ ★ ★ ★</div>
      </div>

      <p className="text-medium mt-5 font-normal leading-7 text-content-normal max-sm:text-sm">
        {props.content}
      </p>
    </div>
  );
};

export default ReviewCard;
