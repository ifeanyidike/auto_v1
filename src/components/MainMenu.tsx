'use client';
import React, { useEffect } from 'react';
import Logo from '~/commons/icons/Logo';
import MenuToggle from '~/commons/icons/MenuToggle';
import { useHookstate } from '@hookstate/core';
import { getSubdomain, subdomainFunc, toggleNav } from '~/states/utility';
import Button from './Button';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import DropdownUserMenu from './DropdownUserMenu';
import LoginButton from './LoginButton';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { type MerchantType } from '~/app/api/merchant/logic';
import NotificationDropdown from './NotificationDropdown';

type Notification = {
  id: string;
  isRead: boolean;
  message: string;
  createdAt: Date;
};
type Props = {
  formattedPhoneNo: string | undefined;
  rawPhoneNo: string | undefined;
  merchant: MerchantType | null;
  notifications: Notification[];
  userIsAdmin: boolean;
};

const MainMenu = (props: Props) => {
  const pathname = usePathname();
  const navOpen = useHookstate(toggleNav);
  const { user } = useUser();
  const domain = getSubdomain();

  useEffect(() => {
    subdomainFunc.set(domain);
  }, []);

  return (
    <div className="relative flex h-20 items-center gap-10 px-14 max-lg:justify-between max-lg:pr-14 max-md:px-7">
      <Link href="/">
        {props.merchant?.logo ? (
          <Image
            className="cursor-pointer  mx-auto"
            src={props.merchant?.logo ?? '/images/logo.png'}
            alt="logo"
            width={50}
            height={50}
          />
        ) : (
          <Logo />
        )}
      </Link>
      <div
        className={`text-content-light flex flex-initial gap-14 text-sm font-normal max-lg:hidden`}
      >
        {pathname !== '/register-merchant' && (
          <>
            <Link
              href="/"
              className={`hover:text-accent-1 hover:border-content-normal cursor-pointer hover:border-b hover:font-semibold`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`hover:text-accent-1 hover:border-content-normal cursor-pointer hover:border-b hover:font-semibold`}
            >
              Services
            </Link>
          </>
        )}
      </div>

      <div className="ml-auto flex gap-6 items-center">
        <NotificationDropdown notifications={props.notifications} />

        <div className="flex gap-3 max-lg:hidden">
          {pathname !== '/register-merchant' && (
            <>
              {props.merchant?.phoneNo && (
                <>
                  <div className="flex flex-col gap-0">
                    <span className="text-[0.7rem]">
                      Call us for a free estimate
                    </span>
                    <span className="text-content-light text-lg font-bold">
                      <a href={`tel:${props.rawPhoneNo}`}>
                        {props.formattedPhoneNo}{' '}
                      </a>
                    </span>
                  </div>
                  <a href={`tel:${props.rawPhoneNo}`}>
                    <Button
                      hasGradient={false}
                      hasShadow={false}
                      bgColor="bg-dark"
                    >
                      GET AN ESTIMATE
                    </Button>
                  </a>
                </>
              )}
            </>
          )}

          {!user ? (
            <LoginButton />
          ) : (
            <DropdownUserMenu
              userIsAdmin={props.userIsAdmin}
              user={user}
              domain={domain!}
            />
          )}
        </div>
      </div>

      <div
        className="hidden cursor-pointer max-lg:flex"
        onClick={() => toggleNav.set(!navOpen.get())}
      >
        <MenuToggle />
      </div>
    </div>
  );
};

export default MainMenu;
