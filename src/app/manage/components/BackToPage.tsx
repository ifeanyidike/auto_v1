import Link from 'next/link';
import React from 'react';

const ArrowLeftIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);

type Props = {
  prevTitle: string;
  currTitle: string;
  toHref: string;
};
const BackToPage = (props: Props) => {
  return (
    <div className="flex gap-3">
      <Link
        href={props.toHref}
        className={`p-1 border border-stone-200/80 rounded`}
      >
        <ArrowLeftIcon />
      </Link>
      <div className="flex flex-col">
        <div className="whitespace-nowrap font-light text-stone-300 text-xs">
          <span>Back to</span>{' '}
          <span className="capitalize">{props.prevTitle}</span>
        </div>
        <span className="font-bold text-sm">{props.currTitle}</span>
      </div>
    </div>
  );
};

export default BackToPage;
