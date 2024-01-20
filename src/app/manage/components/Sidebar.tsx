'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import HomeIcon from '~/commons/icons/HomeIcon';
import MenuItem from './SidebarMenuItem';
import { MenuEnum } from '../types/menu';
import BookingIcon from '~/commons/icons/BookingIcon';
import BuyIcon from '~/commons/icons/BuyIcon';
import CalendarIcon from '~/commons/icons/CalendarIcon';
import WalletIcon from '~/commons/icons/WalletIcon';
import ProfileIcon from '~/commons/icons/ProfileIcon';
import ChevroLeftRoundedIcon from '~/commons/icons/ChevroLeftRoundedIcon';
import ChevroRightRoundedIcon from '~/commons/icons/ChevroRightRoundedIcon';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import EllipsisIcon from '~/commons/icons/EllipsisIcon';
import { useClickOutside } from '~/hooks/useClickOutside';
import Button from '~/components/Button';

const Sidebar = () => {
  const [selected, setIsSelected] = useState<MenuEnum | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [openOptions, toggleOptions] = useState(false);

  const optionsRef = useClickOutside(() => {
    toggleOptions(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const { user } = useUser();
  return (
    <div
      className={`relative flex-initial flex flex-col items-center gap-4 bg-white ${
        isCollapsed ? 'w-20' : 'w-48'
      } h-screen border-r border-stone-200 py-5 max-md:w-20 ease-in duration-300`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="max-md:hidden absolute -right-3 top-6 rounded-full bg-white text-stone-200"
      >
        {isCollapsed ? (
          <ChevroRightRoundedIcon
            strokeWidth="1"
            strokeBorderColor="currentColor"
            fillColor="currentColor"
          />
        ) : (
          <ChevroLeftRoundedIcon
            strokeWidth="1"
            strokeBorderColor="currentColor"
            fillColor="currentColor"
          />
        )}
      </button>

      <div className="flex w-full px-5 pb-4 cursor-pointer">
        <div className={`max-md:hidden ${isCollapsed ? 'hidden' : 'flex'}`}>
          <Image
            className="cursor-pointer"
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={40}
          />
        </div>
        <div
          className={`max-md:flex ${
            isCollapsed ? 'flex' : 'hidden'
          } w-full ml-auto mr-auto`}
        >
          <Image
            className="cursor-pointer w-full"
            src="/images/logo-small.png"
            alt="logo"
            width={50}
            height={40}
          />
        </div>
      </div>
      <div className="flex flex-col w-full justify-start">
        <MenuItem
          isSelected={selected === MenuEnum.home}
          setIsSelected={setIsSelected}
          title={MenuEnum.home}
          isCollapsed={isCollapsed}
          Icon={
            <HomeIcon
              strokeWidth="2"
              //   strokeColor={
              //     selected === MenuEnum.home ? 'currentColor' : '#484848'
              //   }
              strokeColor="currentColor"
              width="18"
              height="18"
            />
          }
        />
        <Link
          href={'/manage/booking'}
          className="flex flex-col w-full justify-start"
        >
          <MenuItem
            isSelected={selected === MenuEnum.booking}
            setIsSelected={setIsSelected}
            title={MenuEnum.booking}
            isCollapsed={isCollapsed}
            Icon={
              <BookingIcon
                strokeWidth="2"
                //   strokeColor={
                //     selected === MenuEnum.booking ? 'currentColor' : '#484848'
                //   }
                strokeColor="currentColor"
                width="18"
                height="18"
              />
            }
          />
        </Link>

        <MenuItem
          isSelected={selected === MenuEnum.subscription}
          setIsSelected={setIsSelected}
          title={MenuEnum.subscription}
          isCollapsed={isCollapsed}
          Icon={
            <CalendarIcon
              strokeWidth="2"
              //   strokeColor={
              //     selected === MenuEnum.subscription ? 'currentColor' : '#484848'
              //   }
              strokeColor="currentColor"
              width="18"
              height="18"
            />
          }
        />
        <MenuItem
          isSelected={selected === MenuEnum.pricing}
          setIsSelected={setIsSelected}
          title={MenuEnum.pricing}
          isCollapsed={isCollapsed}
          Icon={
            <BuyIcon
              strokeWidth="2"
              //   strokeColor={
              //     selected === MenuEnum.pricing ? 'currentColor' : '#484848'
              //   }
              strokeColor="currentColor"
              width="18"
              height="18"
            />
          }
        />
        <MenuItem
          isSelected={selected === MenuEnum.fund}
          setIsSelected={setIsSelected}
          title={MenuEnum.fund}
          isCollapsed={isCollapsed}
          Icon={
            <WalletIcon
              strokeWidth="2"
              //   strokeColor={
              //     selected === MenuEnum.fund ? 'currentColor' : '#484848'
              //   }
              strokeColor="currentColor"
              width="18"
              height="18"
            />
          }
        />

        <MenuItem
          isSelected={selected === MenuEnum.account}
          setIsSelected={setIsSelected}
          title={MenuEnum.account}
          isCollapsed={isCollapsed}
          Icon={
            <ProfileIcon
              strokeWidth="2"
              //   strokeColor={
              //     selected === MenuEnum.account ? 'currentColor' : '#484848'
              //   }
              strokeColor="currentColor"
              width="18"
              height="18"
            />
          }
        />
      </div>

      <div
        ref={optionsRef}
        className={`mt-auto w-full flex gap-[2px] relative ease-in duration-300
        ${
          !isCollapsed ? 'px-2' : 'justify-center'
        } max-md:px-0 max-md:justify-center
        items-center cursor-pointer pb-2 py-4 border-t border-stone-200`}
      >
        <div
          className={`absolute max-md:left-0 ${
            isCollapsed && 'left-0'
          } -top-12 ${!openOptions ? 'hidden' : 'flex'}`}
        >
          <a href="/api/auth/logout">
            <Button
              hasGradient={true}
              hasShadow={false}
              bgColor="bg-yellow rounded-xl"
              text="Logout"
              width="w-44"
            />
          </a>
        </div>
        <Image
          className="rounded-full w-[30px] h-[30px]"
          src={user?.picture ?? ''}
          width={28}
          height={28}
          alt={user?.name ?? ''}
          onClick={() => toggleOptions(!openOptions)}
        />

        <>
          <div
            className={`flex flex-col ml-1 max-md:hidden ${
              isCollapsed && 'hidden'
            }`}
          >
            <span className="text-xs font-semibold">{user?.name}</span>
            <span className="text-[0.5rem] text-stone-500">{user?.email}</span>
          </div>
          <button
            onClick={() => toggleOptions(!openOptions)}
            className={`ml-auto max-md:hidden h-full ${
              isCollapsed && 'hidden'
            }`}
          >
            <EllipsisIcon width="16" />
          </button>
        </>
      </div>
    </div>
  );
};

export default Sidebar;
