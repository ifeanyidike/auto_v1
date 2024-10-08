import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { type MerchantType } from '~/app/api/merchant/logic';
import FacebookIcon from '~/commons/icons/FacebookIcon';
import InstagramIcon from '~/commons/icons/InstagramIcon';
import LinkedInIcon from '~/commons/icons/LinkedInIcon';
import Logo from '~/commons/icons/Logo';
import XIcon from '~/commons/icons/XIcon';

const Footer = ({ merchantData }: { merchantData?: MerchantType | null }) => {
  return (
    <div className="from-gradient-bg-start to-gradient-bg-end flex flex-col items-start justify-between gap-1 bg-gradient-to-r px-14 ">
      <div className="py-4 flex w-full items-center justify-between border-b-2 border-slate-300 max-md:flex-col max-md:pb-7 max-sm:gap-7">
        <Link href="/">
          {merchantData?.logo ? (
            <Image
              className="cursor-pointer  mx-auto"
              src={merchantData?.logo ?? '/images/logo.png'}
              alt="logo"
              width={50}
              height={50}
            />
          ) : (
            <Image
              width={100}
              height={100}
              src={'/images/moxxillogo.png'}
              alt="moxxilimage"
            />
          )}
        </Link>
        <div className="flex h-fit w-fit gap-4">
          <Link
            href={merchantData?.twitter || '#'}
            className="cursor-pointer rounded-full border-2 border-slate-300 p-2 hover:bg-slate-300"
          >
            <a href={merchantData?.linkedin || '#'} target="_blank" />
            <XIcon />
          </Link>
          <Link
            href={merchantData?.instagram || '#'}
            className="cursor-pointer rounded-full border-2 border-slate-300 p-2 hover:bg-slate-300"
          >
            <a href={merchantData?.instagram || '#'} target="_blank" />
            <InstagramIcon />
          </Link>
          <Link
            href={merchantData?.facebook || '#'}
            className="cursor-pointer rounded-full border-2 border-slate-300 p-2 hover:bg-slate-300"
          >
            <a href={merchantData?.facebook || '#'} target="_blank" />
            <FacebookIcon />
          </Link>
          <Link
            href={merchantData?.linkedin || '#'}
            className="cursor-pointer rounded-full border-2 border-slate-300 p-2 hover:bg-slate-300"
          >
            <a href={merchantData?.linkedin || '#'} target="_blank" />
            <LinkedInIcon />
          </Link>
        </div>
      </div>
      <div className="my-10 flex w-full justify-center gap-10 text-xs max-md:flex-col max-md:text-center">
        <span>&copy; Copyright 2024. All Rights Reserved.</span>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms & Conditions</Link>
        <Link href="#">Contact Us</Link>
      </div>
    </div>
  );
};

export default Footer;
