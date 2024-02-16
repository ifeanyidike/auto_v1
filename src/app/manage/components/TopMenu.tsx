'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
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
  const hour = getHour();
  const isMorning = hour < 12;
  const isAfternoon = hour > 12 && hour < 4;

  const greeting = `Good ${
    isMorning ? 'Morning' : isAfternoon ? 'Afternoon' : 'Evening'
  }`;

  const {
    showToggle = true,
    component = (
      <span>
        {greeting} {user?.name && `${user.name}!`}
      </span>
    ),
  } = props;
  return (
    <div
      className={`${customStyle} flex max-sm:justify-between gap-4 items-center text-lg px-8 py-5 font-medium w-full bg-white ${dmSans.className}`}
    >
      {showToggle && (
        <button
          onClick={() => hideAdminBar.set(false)}
          className=" bg-white text-stone-200 hidden max-sm:flex"
        >
          <MenuToggle />
        </button>
      )}
      {component}
    </div>
  );
};

export default TopMenu;
