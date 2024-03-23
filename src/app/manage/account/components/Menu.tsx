'use client';
import React, { useState } from 'react';
import { Tabs } from './types';
import MenuToggle from '~/commons/icons/MenuToggle';
import { useHookstate } from '@hookstate/core';
import { hideAdminBar } from '~/states/utility';
import { useClickOutside } from '~/hooks/useClickOutside';
import { useSearchParams } from 'next/navigation';

type Props = {
  getActiveTab: (t: Tabs) => void;
};

const Menu = (props: Props) => {
  const queryParam = useSearchParams();
  const [activeTab, setActiveTab] = React.useState<Tabs>(
    queryParam.get('path') === 'apiKeys' ? Tabs.apiKeys : Tabs.general
  );
  const hideBar = useHookstate(hideAdminBar);
  const [dropdown, toggleDropdown] = useState(false);

  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  return (
    <>
      {/* Large screen */}
      <div
        className={`menu flex bg-gray-200 px-[3px] py-1 rounded-full w-full gap-4 ${
          hideBar.get() ? 'max-md:hidden' : 'max-lg:hidden'
        }`}
      >
        {Object.entries(Tabs).map(([k, v]) => {
          const isActive = activeTab === v;
          return (
            <button
              onClick={() => {
                setActiveTab(v);
                props.getActiveTab(v);
              }}
              className={`text-base font-medium w-48 h-10 ${
                isActive && 'shadow shadow-gray-400 bg-white rounded-full'
              }`}
              key={k}
            >
              {v}
            </button>
          );
        })}
      </div>

      {/* Small screens */}
      <div
        ref={dropdownRef}
        className={` flex-col hidden relative ${
          hideBar.get() ? 'max-md:flex' : 'max-lg:flex'
        }`}
      >
        <div
          onClick={() => toggleDropdown(!dropdown)}
          className="w-full cursor-pointer rounded-xl border border-stone-300 flex px-4 py-2 justify-between items-center"
        >
          <span className="font-medium text-lg">{activeTab}</span>{' '}
          <button>
            <MenuToggle />
          </button>
        </div>
        {dropdown && (
          <div className="z-50 absolute rounded-xl flex flex-col bg-white w-full top-12 border border-stone-300">
            {Object.entries(Tabs).map(([k, v], idx) => {
              const isActive = activeTab === v;
              const isFirst = idx === 0;
              const isLast = idx === Object.keys(Tabs).length - 1;
              return (
                <button
                  onClick={() => {
                    setActiveTab(v);
                    props.getActiveTab(v);
                    toggleDropdown(false);
                  }}
                  className={`text-base font-medium px-4 py-3 ${
                    isFirst && 'rounded-t-xl'
                  } ${isLast && 'rounded-b-xl'} text-left hover:bg-gray-200 ${
                    isActive && 'bg-white'
                  }`}
                  key={k}
                >
                  {v}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
