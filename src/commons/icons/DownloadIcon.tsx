import React from 'react';

type Props = {
  width?: string;
  viewBox?: string;
  fillColor?: string;
  className?: string;
};
const DownloadIcon = (props: Props) => {
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
        d="M12 1.25c.41 0 .75.34.75.75v10.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4c-.3.3-.77.3-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V2c0-.41.34-.75.75-.75Zm-10 12c.41 0 .75.34.75.75v1.6c0 1.13 0 1.94.05 2.57.05.62.15 1 .3 1.3.32.62.81 1.11 1.42 1.43.3.15.7.25 1.31.3.63.05 1.44.05 2.57.05h7.2c1.13 0 1.94 0 2.57-.05.62-.05 1-.15 1.3-.3.62-.32 1.11-.81 1.43-1.42.15-.3.25-.7.3-1.31.05-.63.05-1.44.05-2.57V14a.75.75 0 0 1 1.5 0v1.63c0 1.1 0 1.96-.06 2.66a4.88 4.88 0 0 1-.46 1.87 4.75 4.75 0 0 1-2.07 2.07c-.55.28-1.16.4-1.87.46-.7.06-1.56.06-2.66.06H8.37c-1.1 0-1.96 0-2.66-.06a4.88 4.88 0 0 1-1.87-.46 4.75 4.75 0 0 1-2.07-2.07 4.88 4.88 0 0 1-.46-1.87c-.06-.7-.06-1.56-.06-2.66V14c0-.41.34-.75.75-.75Z"
      ></path>
    </svg>
  );
};

export default DownloadIcon;
