import React from 'react';

type Props = {
  classNames?: string;
  strokeWidth?: string;
  strokeColor?: string;
};
const AddItemIcon = (props: Props) => {
  const {
    classNames = 'h-6 w-6',
    strokeWidth = '1.5',
    strokeColor = 'currentColor',
  } = props;
  return (
    <svg className={classNames} viewBox="0 0 18 18" fill="none">
      <path
        d="M11 14H17M14 17V11M1.857 1H6.143C6.61631 1 7 1.38369 7 1.857V6.143C7 6.61631 6.61631 7 6.143 7H1.857C1.38369 7 1 6.61631 1 6.143V1.857C1 1.38369 1.38369 1 1.857 1ZM11.857 1H16.143C16.6163 1 17 1.38369 17 1.857V6.143C17 6.61631 16.6163 7 16.143 7H11.857C11.3837 7 11 6.61631 11 6.143V1.857C11 1.38369 11.3837 1 11.857 1ZM1.857 11H6.143C6.61631 11 7 11.3837 7 11.857V16.143C7 16.6163 6.61631 17 6.143 17H1.857C1.38369 17 1 16.6163 1 16.143V11.857C1 11.3837 1.38369 11 1.857 11Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddItemIcon;
