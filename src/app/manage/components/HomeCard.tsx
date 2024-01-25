import React from 'react';
import { dmSans } from '~/font';

type Props = {
  Icon: React.ReactNode;
  count: number;
  title: string;
  iconBgColor: string;
};

const HomeCard = (props: Props) => {
  return (
    <div className="bg-white shadow-sm shadow-stone-300 w-[31%] max-h-48 min-w-40 px-6 rounded-xl py-4 flex flex-col items-center justify-center gap-4">
      <div className={`w-fit ${props.iconBgColor} p-3 box-border rounded-full`}>
        {props.Icon}
      </div>
      <span className={`${dmSans.className} font-extrabold text-xl`}>
        {props.count.toLocaleString('en-US')}
      </span>
      <span className="text-xs">{props.title}</span>
    </div>
  );
};

export default HomeCard;
