'use client';
import React, {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { type MenuEnum } from '../types/menu';
import { useRouter, usePathname } from 'next/navigation';
import { getSubdomain, hideAdminBar } from '~/states/utility';

type ItemProps = {
  title: MenuEnum;
  Icon: ReactNode;
  IconRight?: ReactNode;
  isSelected?: boolean;
  // isCollapsed: boolean;
  setIsSelected?: Dispatch<SetStateAction<MenuEnum | null>>;
  href: string;
};
const MenuItem = (props: ItemProps) => {
  const subdomain = getSubdomain();
  const route = `/manage/${props.href}`;
  const pathname = usePathname();
  const isInPath = route === pathname;
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (props.href === 'visit_page') {
          return router.push(
            `${window.location.protocol}//${subdomain}.${
              window.location.hostname.includes('localhost')
                ? 'localhost:3000'
                : 'moxxil.com'
            }`
          );
        }
        props.setIsSelected && props.setIsSelected(props.title);
        if (window.innerWidth < 650) {
          hideAdminBar.set(true);
        }
        router.push(`/manage/${props.href}`);
      }}
      className={`flex  max-md:pl-5 gap-2 py-3 px-5 max-md:px-0 text-gray-500 items-end
  ${props.isSelected || isInPath ? 'pl-4' : '-pl-4'}
  hover:bg-content-normal/5 hover:text-content-normal hover:font-medium
  ${
    (props.isSelected || isInPath) &&
    'border-l-4 border-content-normal bg-content-normal/5 text-content-normal font-medium'
  }`}
    >
      {props.Icon} <span>{props.title}</span>
      {props.IconRight}
    </button>
  );
};

export default MenuItem;
