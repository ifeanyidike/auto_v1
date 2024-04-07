import Image from 'next/image';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { dmSans, manRope } from '~/font';
import ParentHeader from '~/components/ParentHeader';
import Footer from '~/components/Footer';

const MainHome = () => {
  return (
    <div>
      <ParentHeader />
      <div className="flex bg-[#1c1b11]/5 pl-20 pr-16 py-28 gap-14 items-center max-lg:flex-col max-sm:px-8">
        <div className="flex flex-col gap-8 w-1/3 max-[1200px]:w-1/2 max-lg:w-full max-lg:text-center max-sm:text-left">
          <h2
            className={`${dmSans.className} font-semibold text-5xl leading-[70px] max-sm:text-4xl`}
          >
            Create your auto mechanic shop.
          </h2>
          <span className={`${dmSans.className} text-md`}>
            Build and customize your auto-mechanic shop online to reach
            customers within and outside your locations.
          </span>
          <Link
            href="/register-merchant"
            className="bg-[#f2eb23] text-[#2e2e27] rounded-lg font-semibold w-full py-4 text-center"
          >
            Get Started
          </Link>
        </div>

        <div className="w-1/2 ml-auto border border-gray-200 rounded-xl max-lg:w-full">
          <div className="max-lg:flex hidden">
            <Image
              src="/assets/booking_details.png"
              alt="Product booking"
              width="500"
              height="500"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="max-lg:hidden flex">
            <Suspense fallback="Loading...">
              <video
                autoPlay
                muted
                loop
                src="/assets/demo_short1.mp4"
                className="w-full h-auto rounded-xl"
              />
            </Suspense>
          </div>
        </div>
      </div>

      <div
        className={`${manRope.className} text-center flex flex-col max-w-[700px] mx-auto px-8 py-16 gap-5`}
      >
        <h3 className="text-4xl max-sm:text-3xl font-semibold ">
          Streamline your Workshop Operations
        </h3>
        <span>
          Our all-in-one platform optimizes your mechanic workshop's efficiency,
          saving valuable time and resources.
        </span>
      </div>
      <div className="flex mx-20 max-sm:mx-2 my-10  py-20 gap-14 items-center max-lg:flex-col max-sm:px-8 border-t border-[#1c1b17]/20">
        <div
          className={`${dmSans.className} w-1/3 mr-auto flex flex-col  max-lg:w-full gap-4`}
        >
          <h3 className={`font-medium text-3xl`}>
            Track your services and earnings
          </h3>
          <span className="text-md">
            Get analytics on activities on your mechanic workshop - booking,
            subscription, appointments and earnings. We provide the spend tools
            that will scale with you as you grow.
          </span>
        </div>
        <div className="w-1/2 border shadow border-gray-300 rounded-xl max-lg:w-full">
          <Image
            src="/assets/home_full.png"
            alt="Product admin home"
            width="500"
            height="500"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>

      <div className="flex mx-20 max-sm:mx-2 my-10  py-20 gap-20 items-center max-lg:flex-col-reverse max-sm:px-8 border-t border-[#1c1b17]/20">
        <div className="w-1/2 border shadow border-gray-300 rounded-xl max-lg:w-full">
          <Image
            src="/assets/edit_product_half.png"
            alt="Product admin home"
            width="500"
            height="500"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div
          className={`${dmSans.className} w-1/3 flex flex-col  max-lg:w-full gap-4`}
        >
          <h3 className={`font-medium text-3xl`}>
            Product Management Made Easy
          </h3>
          <span className="text-md">
            Streamline workshop operations with our user-friendly platform.
            Easily add or edit products for optimized inventory control and
            efficiency.
          </span>
        </div>
      </div>

      <div className="flex mx-20 max-sm:mx-2 my-10  py-20 gap-20 items-center max-lg:flex-col max-sm:px-8 border-t border-[#1c1b17]/20">
        <div
          className={`${dmSans.className} w-1/3 flex flex-col  max-lg:w-full gap-4`}
        >
          <h3 className={`font-medium text-3xl`}>
            Streamlined Service Discount Management
          </h3>
          <span className="text-md">
            Effortlessly apply or remove discounts on repairs and services to
            enhance customer satisfaction and boost workshop efficiency.
          </span>
        </div>
        <div className="w-1/2 ml-auto border shadow border-gray-300 rounded-xl max-lg:w-full">
          <Image
            src="/assets/add_discount_half.png"
            alt="Product admin home"
            width="500"
            height="500"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>

      <div className="flex mx-20 max-sm:mx-2 my-10  py-20 gap-20 items-center max-lg:flex-col-reverse max-sm:px-8 border-t border-[#1c1b17]/20">
        <div className="w-1/2 border shadow border-gray-300 rounded-xl max-lg:w-full">
          <Image
            src="/assets/booking.png"
            alt="Product admin home"
            width="500"
            height="500"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div
          className={`${dmSans.className} w-1/3 flex flex-col  max-lg:w-full gap-4`}
        >
          <h3 className={`font-medium text-3xl`}>Simplified Booking</h3>
          <span className="text-md">
            Streamline booking/scheduling with our user-friendly system, saving
            time and enhancing workshop efficiency for seamless experiences.
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainHome;
