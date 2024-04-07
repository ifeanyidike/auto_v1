'use client';
import React, { type ReactNode, useState } from 'react';
import { dmSans, manRope } from '~/font';

type Props = {
  paneTitle: string;
  numItems?: number;
  numCompleted?: number;
  initExpanded?: boolean;
  children: ReactNode;
};

const ChevronIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const CheckFilledIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="black"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const ProductPane = (props: Props) => {
  const { numItems, numCompleted } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(!!props.initExpanded);
  const calcIsIncomplete = () => {
    if (numCompleted && numItems) {
      return numCompleted < numItems;
    }
    return false;
  };
  const isIncomplete = calcIsIncomplete();

  return (
    <div
      className={`bg-white rounded-xl ${
        !isExpanded ? 'pb-14' : 'pb-3'
      } relative`}
    >
      <div className="border border-b-stone-200 py-3 px-3 flex justify-between rounded-t-xl">
        <span className={`${dmSans.className} font-bold`}>
          {props.paneTitle}
        </span>
        <div className="ml-auto flex justify-center gap-4">
          <div
            className={`text-[10px] ${dmSans.className} flex ${
              isIncomplete
                ? 'gap-2 text-content-normal'
                : 'gap-1 bg-content-normal text-white'
            } border border-stone-200 rounded-xl items-center px-2`}
          >
            {isIncomplete ? (
              <div className="gap-[2px]  whitespace-nowrap flex">
                {[...Array(numItems).keys()].map((item, index) => (
                  <div
                    key={index}
                    className={`w-2 h-1 rounded-full ${
                      numCompleted && numCompleted - 1 < item
                        ? 'bg-content-normal/30'
                        : 'bg-content-normal'
                    }`}
                  ></div>
                ))}
              </div>
            ) : (
              <CheckFilledIcon />
            )}
            {numCompleted && numItems && (
              <span>
                {numCompleted}/{numItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1 border border-stone-200 ${
              !isExpanded && 'rotate-180'
            }`}
          >
            <ChevronIcon />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col py-4 px-4 gap-3 transition duration-300 ${
          manRope.className
        } ${isExpanded ? 'flex h-full' : 'h-0 hidden'}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ProductPane;
