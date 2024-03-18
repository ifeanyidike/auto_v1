import React from 'react';

const LoaderOne = () => {
  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 z-[9999] bg-black/30">
      <div className="animate-rotate-loader-1 h-[50px] w-[50px] before:animate-loader-1-ball-1 after:animate-loader-1-ball-2 before:bg-[#cb2025] before:shadow-[30px_0_0_#f8b334] before:mb-2  before:h-[20px] before:w-[20px] before:rounded-full after:rounded-full before:block after:block after:w-[20px] after:h-[20px] after:bg-[#00a096] after:shadow-[30px_0_0_#97bf0d]"></div>
    </div>
  );
};

export default LoaderOne;
