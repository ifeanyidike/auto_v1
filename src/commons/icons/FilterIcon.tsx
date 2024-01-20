import React from 'react';

type Props = {
  width?: string;
  viewBox?: string;
  fillColor?: string;
  className?: string;
};
const FilterIcon = (props: Props) => {
  const {
    className = 'w-5',
    viewBox = '0 0 24 24',
    fillColor = 'currentColor',
  } = props;
  return (
    <svg viewBox={viewBox} fill={fillColor} className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 6c0-.41.34-.75.75-.75h18a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 6Zm3 6c0-.41.34-.75.75-.75h12a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Zm4 6c0-.41.34-.75.75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
      ></path>
    </svg>
  );
};

export default FilterIcon;
