import React from "react";
import CheckIcon from "~/commons/icons/CheckIcon";
import Button from "~/components/Button";
import LeftDashText from "~/components/LeftDashText";
import { dmSans } from "~/font";

const Service = () => {
  return (
    <main>
      <div
        className={`flex h-[500px] w-full flex-col justify-center gap-10 bg-stone-900/100 bg-[url("/image/car_radiator.jpg")] bg-cover bg-center bg-no-repeat px-20 py-5 text-white bg-blend-overlay max-md:h-[550px] max-md:items-center max-md:px-3 max-md:text-center`}
      >
        <LeftDashText lineColor="border-white" text="Service" />
        <h2
          className={` ${dmSans.className} w-1/2 text-5xl capitalize max-lg:w-full max-md:text-5xl`}
        >
          Radiator & Engine Cooling
        </h2>
        <div className="max-md: grid w-1/2 grid-cols-2 gap-4 text-white max-lg:w-fit max-md:grid-cols-1 ">
          <div className="flex items-center gap-3">
            <span className="flex w-fit rounded-full bg-[#414146] p-[6px]">
              <CheckIcon classNames="h-4 w-4" />
            </span>
            <p className="text-sm">Premium Diagnostic Checks</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex w-fit rounded-full bg-[#414146] p-[6px]">
              <CheckIcon classNames="h-4 w-4" />
            </span>
            <p className="text-sm">In-Depth System Analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex w-fit rounded-full bg-[#414146] p-[6px]">
              <CheckIcon classNames="h-4 w-4" />
            </span>
            <p className="text-sm">The Widest Range Of Vehicle</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex w-fit rounded-full bg-[#414146] p-[6px]">
              <CheckIcon classNames="h-4 w-4" />
            </span>
            <p className="text-sm">The Highest Level Of Accuracy</p>
          </div>
        </div>
        <div className="flex w-[300px] max-md:w-full">
          <Button
            hasGradient
            hasShadow
            text="Book Now"
            shadowColor="shadow-stone-400"
            width="w-full"
          />
        </div>
      </div>
    </main>
  );
};

export default Service;
