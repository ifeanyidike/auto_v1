import Link from 'next/link';
import React from 'react';
import FacebookIcon from '~/commons/icons/FacebookIcon';
import InstagramIcon from '~/commons/icons/InstagramIcon';
import LinkedInIcon from '~/commons/icons/LinkedInIcon';
import Logo from '~/commons/icons/Logo';
import XIcon from '~/commons/icons/XIcon';

const Footer = () => {
  return (
    <div className="from-gradient-bg-start to-gradient-bg-end flex flex-col items-start justify-between gap-1 bg-gradient-to-r px-14 ">
      <div className="flex w-full items-center justify-between border-b-2 border-slate-300 max-md:flex-col max-md:pb-7">
        <Logo />
        <div className="flex h-fit w-fit gap-4">
          <Link
            href="#"
            className="cursor-pointer rounded-full border-2 border-slate-300 p-2 hover:bg-slate-300"
          >
            <XIcon />
          </Link>
          <Link
            href="#"
            className="cursor-pointer rounded-full border-2 border-slate-300 p-2 hover:bg-slate-300"
          >
            <InstagramIcon />
          </Link>
          <Link
            href="#"
            className="cursor-pointer rounded-full border-2 border-slate-300 p-2 hover:bg-slate-300"
          >
            <FacebookIcon />
          </Link>
          <Link
            href="#"
            className="cursor-pointer rounded-full border-2 border-slate-300 p-2 hover:bg-slate-300"
          >
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
