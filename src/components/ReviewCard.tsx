import Image from "next/image";
import React from "react";
import { colors } from "~/colors";
import { dmSans } from "~/font";

const ReviewCard = () => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white px-10 py-14">
      <div className="flex gap-3">
        <Image
          src="/image/avatar.webp"
          alt="avatar"
          width={50}
          height={50}
        ></Image>
        <div className="flex flex-col">
          <span className={`${dmSans.className} text-lg font-medium`}>
            Ifeanyi Dike
          </span>
          <span className="text-xs font-light">Customer</span>
        </div>
        <div className="ml-auto flex" style={{ color: colors.yellow }}>
          ★ ★ ★ ★ ★
        </div>
      </div>

      <p className="text-medium mt-5 font-normal leading-7 text-[#292b35]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
        cupiditate? Animi architecto optio et maxime vel, voluptatibus cumque
        quos dicta molestiae est excepturi, quas beatae nostrum voluptates
        veritatis laborum rerum consequuntur necessitatibus nobis magnam ratione
        quae possimus? Eos, aliquam inventore.
      </p>
    </div>
  );
};

export default ReviewCard;
