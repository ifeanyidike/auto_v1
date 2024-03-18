import React, { type CSSProperties } from 'react';
import LeftDashText from '~/components/LeftDashText';
import { dmSans } from '~/font';
import SearchIcon from '~/commons/icons/SearchIcon';

const ServiceBanner = () => {
  const bannerStyle: CSSProperties = {
    backgroundImage: `url(/images/servicebannerimage.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.815)',
    zIndex: -10,
  };
  return (
    <div className="relative ml-0 mr-0 flex h-[300px] flex-col justify-center gap-5 px-3  text-white">
      <div
        className="absolute inset-0 z-[-1] flex items-center justify-center text-white"
        style={bannerStyle}
      >
        <div style={overlayStyle}></div>
      </div>
      <div className="align-center flex justify-center">
        <LeftDashText text="Our Services" lineColor="white" />
      </div>

      <div className="flex items-center justify-center max-lg:flex-col max-lg:gap-5">
        <span
          className={`text-center text-3xl font-semibold max-md:text-2xl ${dmSans.className}`}
          style={{ maxWidth: '500px' }}
        >
          FIX Fast: Quick And Reliable Auto Repair Services
        </span>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="focus:border-white-500 w-full max-w-md rounded-full border border-gray-200 bg-transparent px-4 py-2 text-white focus:outline-none"
            placeholder="Search..."
            style={{ color: 'white' }}
          />
          <span className="absolute right-3 top-2 text-white">
            <SearchIcon />
          </span>
        </div>{' '}
      </div>
    </div>
  );
};

export default ServiceBanner;
