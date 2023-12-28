import Link from "next/link";
import React from "react";
import ArrowRight from "~/commons/icons/ArrowRight";
import CheckIcon from "~/commons/icons/CheckIcon";
import Button from "~/components/Button";
import FAQCard from "~/components/FAQCard";
import HomeServicesCard from "~/components/HomeServicesCard";
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
        <div className="sticky top-0 flex w-[300px] max-md:w-full">
          <Button
            hasGradient
            hasShadow
            text="Book Now"
            shadowColor="shadow-stone-400"
            width="w-full"
          />
        </div>
      </div>
      <div className="from-gradient-bg-start to-gradient-bg-end flex w-full items-center gap-14 bg-gradient-to-r px-20 py-14 max-md:flex-col-reverse max-md:gap-3 max-md:px-5">
        <div className="flex flex-1 flex-col">
          <div className="w-full">
            <FAQCard
              bottomBorder
              width="w-full"
              questionFontSize="text-lg"
              answerFontSize="text-md"
              decorateActive
              question=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, hic!"
              answer="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet consequatur voluptatibus provident quae, libero numquam praesentium, hic facilis modi corrupti illum, beatae fugit veniam assumenda? Corrupti voluptate fugiat magnam distinctio."
            />
          </div>

          <div className="">
            <FAQCard
              bottomBorder
              width="w-full"
              questionFontSize="text-lg"
              answerFontSize="text-md"
              decorateActive
              question=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, hic!"
              answer="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet consequatur voluptatibus provident quae, libero numquam praesentium, hic facilis modi corrupti illum, beatae fugit veniam assumenda? Corrupti voluptate fugiat magnam distinctio."
            />
          </div>
          <div className="">
            <FAQCard
              bottomBorder
              width="w-full"
              questionFontSize="text-lg"
              answerFontSize="text-md"
              decorateActive
              question=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, hic!"
              answer="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet consequatur voluptatibus provident quae, libero numquam praesentium, hic facilis modi corrupti illum, beatae fugit veniam assumenda? Corrupti voluptate fugiat magnam distinctio."
            />
          </div>
          <div className="">
            <FAQCard
              bottomBorder
              width="w-full"
              questionFontSize="text-lg"
              answerFontSize="text-md"
              decorateActive
              question=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, hic!"
              answer="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet consequatur voluptatibus provident quae, libero numquam praesentium, hic facilis modi corrupti illum, beatae fugit veniam assumenda? Corrupti voluptate fugiat magnam distinctio."
            />
          </div>
        </div>
        <div className="from-gradient-bg-start to-gradient-bg-end sticky top-0 flex h-full w-1/4 flex-col items-center gap-5 bg-gradient-to-r py-8 max-md:w-full">
          <Button
            hasShadow
            bgColor="bg-dark"
            text="Request Appointment"
            width="w-full"
          />
          <Link className="flex gap-2" href="#">
            <span className="hover:border-content-normal  inset-x-0 bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out">
              Learn More
            </span>
            <ArrowRight />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-12 px-14 pb-28 pt-20">
        <div className="ml-4 flex flex-col justify-center gap-5 max-md:items-center">
          <LeftDashText text="Other Services" />
          <div className="flex items-end justify-between max-lg:flex-col max-lg:gap-5 max-md:items-center max-md:justify-center max-md:text-center">
            <span
              className={`text-5xl font-semibold  max-md:text-4xl max-sm:text-3xl ${dmSans.className}`}
            >
              Explore other similar services
            </span>
            <Link className="flex gap-2" href="#">
              <span className="hover:border-content-normal inset-x-0 bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out">
                View All
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-12 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1">
          <HomeServicesCard
            category="Repairs"
            details="
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore."
            imgSrc="/image/belt.webp"
            title="Belt & Hoses"
            href="/service/belt"
          />
          <HomeServicesCard
            category="Servicing"
            details="
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore."
            imgSrc="/image/battery.webp"
            title="Car Batteries & Charging"
            href="/service/batteries"
          />
          <HomeServicesCard
            category="Repairs"
            details="
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore."
            imgSrc="/image/mechanical.webp"
            title="Mechanical Repairs"
            href="/service/mechanical"
          />
        </div>
      </div>
    </main>
  );
};

export default Service;
