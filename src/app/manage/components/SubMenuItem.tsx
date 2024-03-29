'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  text: string;
  href: string;
  // isCollapsed: boolean;
  Icon?: React.ReactNode;
};
export const SubMenuItem = (props: Props) => {
  const href = `/manage/${props.href}`;
  const pathname = usePathname();
  const isSelected = href === pathname;
  return (
    <Link
      className={`text-sm rounded-xl w-[90%] px-4 mx-1 py-2 mb-1 flex gap-2 items-center justify-center ${
        isSelected && 'bg-gray-300'
      }`}
      href={`/manage/${props.href}`}
    >
      {props.Icon}

      {/* {!props.isCollapsed && ( */}
      <span className="text-sm max-md:hidden">{props.text}</span>
      {/* )} */}
    </Link>
  );
};
