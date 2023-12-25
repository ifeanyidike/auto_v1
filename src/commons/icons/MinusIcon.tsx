import React from "react";

type Props = {
  classNames?: string;
};
const MinusIcon = (props: Props) => {
  const { classNames = "h-6 w-6" } = props;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={classNames}>
      <path
        fillRule="evenodd"
        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default MinusIcon;
