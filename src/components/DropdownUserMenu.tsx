'use client';
import { type UserProfile } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useClickOutside } from '~/hooks/useClickOutside';

type Props = {
  user: UserProfile;
  userIsAdmin: boolean;
  domain: string;
};

const DropdownUserMenu = (props: Props) => {
  const { user } = props;
  const [openDropdown, toggleDropdown] = useState<boolean>(false);

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  return (
    <div ref={dropdownRef}>
      {user.picture && (
        <button
          onClick={() => toggleDropdown(true)}
          className="cursor-pointer relative"
        >
          <Image
            className="rounded-full"
            src={user.picture}
            width={35}
            height={35}
            alt={user.name!}
          />
          {openDropdown && (
            <div className="flex flex-col gap-3 text-sm w-[250px] whitespace-nowrap absolute top-12 -right-0 shadow-lg border border-stone-500/20 bg-white shadow-stone-500/40 px-5 py-8 rounded-lg z-50">
              <div className="flex flex-col items-center gap-2">
                <Image
                  className="rounded-full"
                  src={user.picture}
                  width={70}
                  height={70}
                  alt={user.name!}
                />
                <span>{user.name}</span>
              </div>
              <a className="border-t-[1px] py-2 mt-4" href="/api/auth/logout">
                Sign Out
              </a>
              {props.userIsAdmin && (
                <a
                  className="border-b-[1px] py-2 text-red-1 cursor-pointer"
                  href={`${window.location.protocol}//${props.domain}.admin.${
                    window.location.hostname.includes('localhost')
                      ? 'localhost:3000'
                      : 'moxxil.com'
                  }/manage/booking`}
                >
                  Go to admin dashboard
                </a>
              )}
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default DropdownUserMenu;
