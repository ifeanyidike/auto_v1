'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import HomeIcon from '~/commons/icons/HomeIcon';
import MenuItem from './SidebarMenuItem';
import { MenuEnum } from '../types/menu';
import BookingIcon from '~/commons/icons/BookingIcon';
import CalendarIcon from '~/commons/icons/CalendarIcon';
import ProfileIcon from '~/commons/icons/ProfileIcon';
import ChevroLeftRoundedIcon from '~/commons/icons/ChevroLeftRoundedIcon';
import { useUser } from '@auth0/nextjs-auth0/client';
import EllipsisIcon from '~/commons/icons/EllipsisIcon';
import { useClickOutside } from '~/hooks/useClickOutside';
import Button from '~/components/Button';
import AddItemIcon from '~/commons/icons/AddItemIcon';
import { useHookstate } from '@hookstate/core';
import { hideAdminBar } from '~/states/utility';
import { manRope } from '~/font';
import UsersIcon from '~/commons/icons/UsersIcon';
import DocumentIcon from '~/commons/icons/DocumentIcon';

const Sidebar = () => {
  const [selected, setIsSelected] = useState<MenuEnum | null>(null);
  const [openOptions, toggleOptions] = useState(false);
  const hideBar = useHookstate(hideAdminBar);

  const optionsRef = useClickOutside(() => {
    toggleOptions(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  const { user } = useUser();

  React.useEffect(() => {
    if (window.innerWidth < 500) {
      hideAdminBar.set(true);
    }
  }, []);

  return (
    <div
      className={`${
        hideBar.get() && 'hidden'
      }  z-30 sticky top-0 max-sm:h-screen h-screen w-48 ${
        manRope.className
      } max-sm:absolute text-sm flex-initial flex flex-col items-center gap-4 bg-white  border-r border-stone-200 py-5  ease-in duration-100`}
    >
      <button
        onClick={() => hideAdminBar.set(true)}
        className={`absolute -right-5 top-3 rounded-full text-stone-200 ${
          hideBar.get() && 'hidden'
        }`}
      >
        <ChevroLeftRoundedIcon
          strokeWidth="1"
          strokeBorderColor="currentColor"
          fillColor="currentColor"
          classNames="w-10 h-10"
        />
      </button>

      <div className="flex w-full px-5 pb-[2px] cursor-pointer">
        <div className={`flex w-full mr-auto`}>
          <Image
            className="cursor-pointer  mx-auto"
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={50}
          />
        </div>
      </div>
      <div className="flex flex-col w-full justify-start mt-5">
        <MenuItem
          href=""
          isSelected={selected === MenuEnum.home}
          setIsSelected={setIsSelected}
          title={MenuEnum.home}
          Icon={
            <HomeIcon
              strokeWidth="2"
              strokeColor="currentColor"
              width="18"
              height="18"
            />
          }
        />

        <MenuItem
          href="product"
          isSelected={selected === MenuEnum.product}
          setIsSelected={setIsSelected}
          title={MenuEnum.product}
          Icon={
            <AddItemIcon
              strokeWidth="2"
              strokeColor="currentColor"
              classNames="w-[18px] h-[18px]"
            />
          }
        />

        <div className="horizontal w-full h-[1px] my-2 bg-gray-300"></div>

        <div className="flex flex-col">
          <MenuItem
            href="booking"
            isSelected={selected === MenuEnum.booking}
            setIsSelected={setIsSelected}
            title={MenuEnum.booking}
            // isCollapsed={isCollapsed}
            Icon={
              <BookingIcon
                strokeWidth="2"
                strokeColor="currentColor"
                width="18"
                height="18"
              />
            }
          />
        </div>

        <div className="flex flex-col">
          <MenuItem
            href="booking/bookers"
            isSelected={selected === MenuEnum.bookers}
            setIsSelected={setIsSelected}
            title={MenuEnum.bookers}
            Icon={<UsersIcon classNames="w-6 h-6" />}
          />
        </div>

        <div className="horizontal w-full h-[1px] my-2 bg-gray-300"></div>

        <div className="flex flex-col">
          <MenuItem
            href="subscription"
            isSelected={selected === MenuEnum.subscription}
            setIsSelected={setIsSelected}
            title={MenuEnum.subscription}
            Icon={
              <CalendarIcon
                strokeWidth="2"
                strokeColor="currentColor"
                classNames="w-[18px] h-[18px]"
              />
            }
          />
        </div>

        <div className="flex flex-col">
          <MenuItem
            href="subscription/subscribers"
            isSelected={selected === MenuEnum.subscriber}
            setIsSelected={setIsSelected}
            title={MenuEnum.subscriber}
            // isCollapsed={isCollapsed}
            Icon={<UsersIcon classNames="w-[18px] h-[18px]" />}
          />
        </div>

        <div className="flex flex-col">
          <MenuItem
            href="subscription/plans"
            isSelected={selected === MenuEnum.plans}
            setIsSelected={setIsSelected}
            title={MenuEnum.plans}
            Icon={<DocumentIcon className="w-[18px] h-[18px]" />}
          />
        </div>

        <div className="horizontal w-full h-[1px] my-2 bg-gray-300"></div>
        {/* <MenuItem
          href="pricing"
          isSelected={selected === MenuEnum.pricing}
          setIsSelected={setIsSelected}
          title={MenuEnum.pricing}
          // isCollapsed={isCollapsed}
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
        /> */}
        {/* <MenuItem
          href="fund"
          isSelected={selected === MenuEnum.fund}
          setIsSelected={setIsSelected}
          title={MenuEnum.fund}
          // isCollapsed={isCollapsed}
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
        /> */}

        <MenuItem
          href="account"
          isSelected={selected === MenuEnum.account}
          setIsSelected={setIsSelected}
          title={MenuEnum.account}
          // isCollapsed={isCollapsed}
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
        className={`sticky bottom-0 mt-auto w-[90%] flex gap-[2px] ease-in duration-300
        px-2 max-md:px-0 max-md:justify-center
        items-center cursor-pointer pb-2 py-4 border-t border-stone-200`}
      >
        <div
          className={`absolute max-md:left-0  -top-12 ${
            !openOptions ? 'hidden' : 'flex'
          }`}
        >
          <a href="/api/auth/logout">
            <Button
              hasGradient={true}
              hasShadow={false}
              bgColor="bg-yellow rounded-xl"
              width="w-44"
            >
              Logout
            </Button>
          </a>
        </div>
        {user?.picture ? (
          <Image
            className="rounded-full w-[30px] h-[30px]"
            src={user?.picture ?? ''}
            width={28}
            height={28}
            alt={user?.name ?? ''}
            onClick={() => toggleOptions(!openOptions)}
          />
        ) : null}

        <>
          <div className={`flex flex-col ml-1`}>
            <span className="text-xs font-semibold">{user?.name}</span>
            <span className="text-[0.5rem] text-stone-500">{user?.email}</span>
          </div>
          <button
            onClick={() => toggleOptions(!openOptions)}
            className={`ml-auto h-full`}
          >
            <EllipsisIcon width="16" />
          </button>
        </>
      </div>
    </div>
  );
};

export default Sidebar;
