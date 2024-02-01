'use client';
import React, { useState } from 'react';
import ChevroDownIcon from '~/commons/icons/ChevroDownIcon';
import { useClickOutside } from '~/hooks/useClickOutside';

type Data<T> = {
  caption: string;
  value: T;
};

type Props<T> = {
  data: Data<T>[];
};

const DropdownSelect = <T,>(props: Props<T>) => {
  const [selected, setSelected] = useState<Data<T> | undefined>();
  const [openDropdown, toggleDropdown] = useState<boolean>(false);
  const dropdownRef = useClickOutside(() => {
    toggleDropdown(false);
  }) as React.MutableRefObject<HTMLDivElement | null>;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => toggleDropdown(!openDropdown)}
        className="flex justify-between items-center border border-content-normal/20 hover:border-stone-400 px-3 py-2 rounded-xl w-full "
      >
        <span>{selected?.caption ?? 'Select status'}</span>
        <span className={`${openDropdown && 'rotate-180'}`}>
          <ChevroDownIcon className="w-5 h-5" />
        </span>
      </button>
      {openDropdown && (
        <div className="absolute top-11 border border-stone-200 shadow-md bg-white w-full rounded-xl">
          {props.data.map((item, index) => (
            <div
              onClick={() => {
                setSelected(item);
                toggleDropdown(false);
              }}
              className="flex flex-col w-full px-4 py-3 text-start hover:bg-cyanBlue"
              key={index}
            >
              {item.caption}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
