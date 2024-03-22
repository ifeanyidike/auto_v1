'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useHookstate } from '@hookstate/core';
import React from 'react';
import MenuToggle from '~/commons/icons/MenuToggle';
import { dmSans } from '~/font';
import { hideAdminBar } from '~/states/utility';

const getHour = () => {
  const date = new Date();
  const hour = date.getHours();
  return hour;
};

type Props = {
  showToggle?: boolean;
  component?: React.ReactNode;
  customStyle?: string;
};
const TopMenu = (props: Props) => {
  const { customStyle } = props;
  const { user } = useUser();
  const hideBar = useHookstate(hideAdminBar);

  const hour = getHour();
  const isMorning = hour < 12;
  const isAfternoon = hour > 12 && hour < 4;

  const greeting = `Good ${
    isMorning ? 'Morning' : isAfternoon ? 'Afternoon' : 'Evening'
  }`;

  const {
    showToggle = true,
    component = (
      <span className={`text-base ${dmSans.className} ml-auto`}>
        {greeting} {user?.name && `${user.name}!`}
      </span>
    ),
  } = props;
  return (
    <div
      className={`${customStyle} ${dmSans.className} flex max-sm:justify-between gap-4 items-center text-lg px-8 py-5 font-medium w-full bg-white ${dmSans.className}`}
    >
      {showToggle && hideBar.get() && (
        <button
          onClick={() => hideAdminBar.set(!hideBar.get())}
          className=" bg-white text-stone-200"
        >
          <MenuToggle />
        </button>
      )}
      {component}
    </div>
  );
};

export default TopMenu;
