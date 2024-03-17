'use client';
import React from 'react';
import { Tabs } from './types';

type Props = {
  getActiveTab: (t: Tabs) => void;
};

const Menu = (props: Props) => {
  const [activeTab, setActiveTab] = React.useState<Tabs>(Tabs.general);
  return (
    <div className="menu flex bg-gray-200 px-[3px] py-1 rounded-full w-full gap-10">
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
  );
};

export default Menu;
