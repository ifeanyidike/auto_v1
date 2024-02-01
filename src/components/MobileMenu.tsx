'use client';
import React from 'react';
import CloseIcon from '~/commons/icons/CloseIcon';
import { toggleNav } from '~/states/utility';
import Button from './Button';
import { useHookstate } from '@hookstate/core';
import Link from 'next/link';
import LoginButton from './LoginButton';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

const MobileMenu = () => {
  const navOpen = useHookstate(toggleNav);
  const { user } = useUser();
  return (
    <>
      {navOpen.get() && (
        <div
          className={`absolute right-0 top-0 hidden h-screen w-4/5 flex-col gap-6 bg-white px-7 py-8 text-lg transition-all duration-300 ease-in-out max-lg:flex`}
        >
          <button
            onClick={() => toggleNav.set(false)}
            className="border-none bg-transparent outline-none"
          >
            <CloseIcon />
          </button>

          {!user ? (
            <LoginButton pb="pb-4" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-sm">
              <Image
                className="rounded-full"
                src={user.picture!}
                width={70}
                height={70}
                alt={user.name!}
              />
              <span>{user.name}</span>

              <a
                className="py-2 mt-4 font-bold border-b border-stone-600 text-stone-600 hover:text-content-light hover:border-content-light"
                href="/api/auth/logout"
              >
                Sign Out
              </a>
            </div>
          )}
          <Link href="/" className="cursor-pointer">
            Home
          </Link>
          <Link href="/services" className="cursor-pointer">
            Services
          </Link>

          <div>
            <Button hasGradient={false} hasShadow={false} bgColor="bg-dark">
              GET AN ESTIMATE
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
