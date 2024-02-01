import React from 'react';
import EllipsisIcon from '~/commons/icons/EllipsisIcon';
import { dmSans } from '~/font';

type Props = {
  _id: string;
  index: number;
  name: string;
  duration: string;
  qty: number;
  date: string;
  time: string;
  status: string;
  action: string;
  length: number;
  popupOpen: number | null;
  togglePopup: React.Dispatch<React.SetStateAction<number | null>>;
};

enum Header {
  id = 'id',
  name = 'Subscriber',
  duration = 'Duration',
  qty = 'Qty',
  date = 'Date',
  time = 'Time',
  status = 'Status',
  action = 'Action',
}

const Subscriptions = (props: Props) => {
  const isHeader = props._id === 'table_header';

  const renderHeader = () => {
    return (
      <div
        className={`flex items-center py-1 min-w-max gap-4 font-semibold text-[10px] relative ${dmSans.className} uppercase bg-[#E3E9EE] rounded-t-xl`}
        // style={{ minWidth: '100%' }}
      >
        <div className="flex-shrink-0 w-16 p-4">{Header.id}</div>
        <div className="flex-shrink-0 w-32 flex-grow p-4">{Header.name}</div>
        <div className="flex-shrink-0 w-24 flex-grow p-4">
          {Header.duration}
        </div>
        <div className="flex-shrink-0 w-16 p-4">{Header.qty}</div>
        <div className={`flex-shrink-0 w-24 p-4`}>{Header.date}</div>
        <div className={`flex-shrink-0 w-24 p-4`}>{Header.time}</div>
        <div className={`flex-shrink-0 w-32 p-4`}>{Header.status}</div>

        <div
          className={`flex-shrink-0 w-20 right-0 top-1/2 sticky z-40 p-4 bg-[#E3E9EE] flex justify-center border-l border-l-stone-300`}
        >
          {Header.action}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const isLast = props.index === props.length;

    return (
      <>
        <div
          className={`flex items-center w-full gap-4 text-xs bg-white hover:bg-slate-100 cursor-pointer min-w-max relative ${
            isLast && 'rounded-b-xl'
          } `}
        >
          <div className="flex-shrink-0 w-16 p-4">{props._id}</div>

          <div className="flex-shrink-0 w-32 flex-grow p-4">{props.name}</div>

          <div className="flex-shrink-0 w-24 flex-grow p-4">
            {props.duration}
          </div>
          <div className="flex-shrink-0 w-16 p-4">{props.qty}</div>
          <div className={`flex-shrink-0 w-24 p-4`}>{props.date}</div>

          <div className="flex-shrink-0 w-24 gap-4">{props.time}</div>

          <div className={`flex-shrink-0 w-32 p-4`}>
            <span
              className={`flex-shrink-0 w-12px  border rounded-full px-3 py-1 ${
                props.status === 'Completed'
                  ? 'bg-green-100 text-green-600'
                  : props.status === 'In Progress'
                    ? 'bg-pink-100 text-pink-600'
                    : props.status === 'Requested'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-red-100 text-pink-600'
              }`}
            >
              {props.status}
            </span>
          </div>
          <div
            className={`flex-shrink-0 w-20 p-4 sticky right-0 bg-white hover:bg-slate-100 flex items-center shadow-md shadow-white border-l border-l-stone-200 justify-center`}
          >
            <button
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                console.log(rect);
                if (props.popupOpen) {
                  props.togglePopup(null);
                } else {
                  props.togglePopup(rect.top);
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

export default Subscriptions;
