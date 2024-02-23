'use client';
import React from 'react';

type Props = {
  value: boolean;
  setToggled: () => void;
};
const Toggler = (props: Props) => {
  const { setToggled, value } = props;
  return (
    <button
      className={`text-sm w-11 transition duration-300 ease-in-out relative h-[18px] ${
        value ? 'bg-green-600' : 'bg-stone-400'
      } rounded-full p-[1px] cursor-pointer`}
      onClick={() => {
        setToggled();
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`w-4 h-full transition duration-300 ease-in-out bg-white rounded-full ${
          value && 'ml-auto'
        }`}
      />
    </button>
  );
};

export default Toggler;
