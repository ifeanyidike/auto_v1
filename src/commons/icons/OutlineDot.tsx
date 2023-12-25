import React from "react";

type Props = {
  classNames?: string;
};
const OutlineDot = (props: Props) => {
  const { classNames = "h-4 w-4" } = props;
  return (
    <svg viewBox="0 0 24 24" className={classNames}>
      <path
        fillRule="evenodd"
        d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0 1.5a6 6 0 100-12 6 6 0 000 12z"
      />
    </svg>
  );
};

export default OutlineDot;
