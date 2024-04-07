import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { manRope } from '~/font';

type Props = {
  transactions: {
    id: string;
    serviceName: string;
    serviceType: string;
    imgUrl: string;
    userName: string;
    email: string | undefined;
    amount: number;
    type: string;
    date: Date;
  }[];
};
// max-lg:flex-1
const LatestCustomers = (props: Props) => {
  return (
    <div
      className={`${manRope.className} font-serif flex-[0.47]  max-lg:w-[96%] flex flex-col w-1/2 px-2 pt-6 pb-12 bg-white shadow shadow-white ml-5 max-md:ml-2 max-md:mx-auto rounded-xl h-fit`}
    >
      <span className="flex justify-between w-full">
        <h3 className="text-lg font-semibold">Latest Customers</h3>{' '}
        {Boolean(props.transactions.length) && (
          <Link className="text-xs flex items-center" href="#">
            View All
          </Link>
        )}
      </span>
      <div className="py-8 flex flex-col gap-5">
        {Boolean(props.transactions.length) ? (
          props.transactions.map(data => (
            <div key={data.id} className="flex gap-4 items-center">
              <Image
                className="rounded-full w-10 h-10"
                src={data.imgUrl}
                alt={data.userName}
                width={40}
                height={40}
              />
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-medium font-medium">
                    {data.userName}
                  </span>
                  <div className="flex gap-1 items-center">
                    <span className="uppercase text-[8px]">
                      {data.serviceName}
                    </span>
                    <div className="w-[3px] h-[3px] bg-content-normal rounded-full"></div>
                    <span className="text-[10px]">{data.email}</span>
                  </div>
                </div>
                <span className="text-sm font-mono">{`₦${data.amount}`}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center pt-8">You have no transaction</div>
        )}
      </div>
    </div>
  );
};

export default LatestCustomers;
