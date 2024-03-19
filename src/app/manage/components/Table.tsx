'use client';
import React from 'react';
import EllipsisIcon from '~/commons/icons/EllipsisIcon';
import { dmSans, manRope } from '~/font';
import { type TablePopupData } from '../types/general';

type Header = {
  [key: string]: string | boolean | undefined;
  grow?: boolean;
  customWidth?: string;
};

type Props = {
  _id: string;
  index: number;
  length: number;
  popupOpen: TablePopupData | null;
  togglePopup: React.Dispatch<React.SetStateAction<TablePopupData | null>>;
  headers: Header[];
  data: Record<string, React.ReactNode>;
  hasAction: boolean;
};

const Table = (props: Props) => {
  const isHeader = props._id === 'table_header';

  console.log(props.popupOpen);

  const renderHeader = () => {
    return (
      <div
        className={`flex items-center py-1 min-w-max gap-4 font-semibold text-[10px] relative ${dmSans.className} uppercase bg-cyanBlue rounded-t-xl`}
      >
        {props.headers.map((header, index) => {
          const grow = header.grow;
          const width = header.customWidth ?? 'w-32';

          const newHeader = { ...header } as Partial<typeof header>;
          delete newHeader.grow;
          delete newHeader.customWidth;

          const value = Object.values(header)[0];
          return (
            <div
              key={index}
              className={`flex-shrink-0 ${width} p-4 ${grow && 'flex-grow'}`}
            >
              {value}
            </div>
          );
        })}

        <div
          className={`flex-shrink-0 w-20 right-0 top-1/2 sticky z-40 p-4 bg-cyanBlue flex justify-center border-l border-l-stone-300`}
        >
          Action
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const isLast = props.index === props.length;

    return (
      <>
        <div
          className={`${
            manRope.className
          } flex items-center w-full gap-4 text-xs bg-white hover:bg-slate-100 cursor-pointer min-w-max relative ${
            isLast && 'rounded-b-xl'
          } `}
        >
          {props.headers.map((header, index) => {
            const key = Object.keys(header)[0];
            const width = header.customWidth ?? 'w-32';

            return (
              <div
                key={index}
                className={`flex-shrink-0 ${width} p-4 ${
                  header.grow && 'flex-grow'
                }`}
              >
                {props.data[key!]}
              </div>
            );
          })}

          <div
            className={`flex-shrink-0 w-20 p-4 sticky right-0 bg-white hover:bg-slate-100 flex items-center shadow-md shadow-white border-l border-l-stone-200 justify-center`}
          >
            <button
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                if (props.popupOpen) {
                  props.togglePopup(null);
                } else {
                  props.togglePopup({
                    position: rect.top,
                    id: props._id,
                  });
                }
              }}
              className={`py-1 px-3 h-8 flex rounded-full hover:bg-content-normal/5 items-center hover:shadow-2xl transition-all duration-800 ease-in-out`}
            >
              <div>
                <EllipsisIcon width="16" height="3" />
              </div>
            </button>
          </div>
        </div>
      </>
    );
  };
  isHeader ? renderHeader() : renderContent();
  if (isHeader) return renderHeader();
  return renderContent();
};

export default Table;
