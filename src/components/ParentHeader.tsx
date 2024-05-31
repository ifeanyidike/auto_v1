import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ParentHeader = () => {
  return (
    <header className="h-16 flex px-16 items-center justify-between max-sm:px-2">
      <Link href="/">
        <Image
          className="cursor-pointer  mx-auto"
          src="/images/moxxillogo.png"
          alt="logo"
          width={100}
          height={100}
        />
      </Link>
      <div className="flex gap-2">
        <Link
          href="/register-merchant"
          className="rounded-md text-[#f2eb23] bg-[#2e2e27] text-sm px-4 py-[10px] font-semibold"
        >
          Register
        </Link>
        <Link
          href="/demo"
          className="rounded-md bg-[#f2eb23] text-[#2e2e27] text-sm px-4 py-[10px] font-semibold"
        >
          See demo
        </Link>
      </div>
    </header>
  );
};

export default ParentHeader;
