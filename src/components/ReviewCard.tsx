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
      <div className="flex gap-3">
        <Image
          src="/image/avatar.webp"
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
        <div className="text-yellow ml-auto flex">★ ★ ★ ★ ★</div>
      </div>

      <p className="text-medium text-content-normal mt-5 font-normal leading-7">
        {props.content}
      </p>
    </div>
  );
};

export default ReviewCard;
