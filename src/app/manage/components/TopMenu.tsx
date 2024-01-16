'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';

const getHour = () => {
  const date = new Date();
  const hour = date.getHours();
  return hour;
};

const TopMenu = () => {
  const { user } = useUser();
  const hour = getHour();
  const isMorning = hour < 12;
  const isAfternoon = hour > 12 && hour < 4;

  const greeting = `Good ${
    isMorning ? 'Morning' : isAfternoon ? 'Afternoon' : 'Evening'
  }`;
  return (
    <div className={`text-sm px-8 py-5 font-bold `}>
      {greeting} {user?.name && `${user.name}!`}
    </div>
  );
};

export default TopMenu;
