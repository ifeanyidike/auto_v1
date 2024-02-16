import React from 'react';

type Props = {
  classNames?: string;
  fillColor?: string;
};
const MenuToggle = (props: Props) => {
  const { classNames = 'w-[22.25px] h-4', fillColor = '#222' } = props;
  return (
    <svg className={classNames} viewBox="0 0 22.25 16">
      <path
        fill={fillColor}
        d="M7.5 2h12a1.5 1.5 0 1 1 0 3h-12a1.5 1.5 0 1 1 0-3zM2.5 11h12a1.5 1.5 0 0 1 0 3h-12a1.5 1.5 0 1 1 0-3zM2.5 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 1 1 0-3zM19.5 11a1.5 1.5 0 0 1 0 3 1.5 1.5 0 0 1 0-3z"
      ></path>
    </svg>
  );
};

export default MenuToggle;
