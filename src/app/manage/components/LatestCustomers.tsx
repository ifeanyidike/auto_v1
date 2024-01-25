import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const customerData = [
  {
    id: 1,
    name: 'Neil Sims',
    email: 'email@example.com',
    service: 'Oil Change',
    amount: '₦50,000',
    picture: '/images/avatar.webp',
  },
  {
    id: 2,
    name: 'Bonnie Green',
    email: 'email@example.com',
    service: 'Electrical Repairs',
    amount: '₦72,000',
    picture: '/images/avatar.webp',
  },
  {
    id: 3,
    name: 'Michael Gough',
    email: 'email@example.com',
    service: 'Suspension Repairs',
    amount: '₦66,000',
    picture: '/images/avatar.webp',
  },
  {
    id: 4,
    name: 'Thomas Lean',
    email: 'email@example.com',
    service: 'Engine Work',
    amount: '₦102,000',
    picture: '/images/avatar.webp',
  },
  {
    id: 5,
    name: 'Lana Byrd',
    email: 'email@example.com',
    service: 'Wheels & Tires',
    amount: '₦42,000',
    picture: '/images/avatar.webp',
  },
];

const LatestCustomers = () => {
  return (
    <div className="flex-[0.47] max-lg:flex-1 max-lg:w-[95%] flex flex-col w-1/2 px-6 pt-6 pb-12 bg-white shadow shadow-white ml-5 rounded-xl h-fit">
      <span className="flex justify-between w-full">
        <h3 className="text-lg font-semibold">Latest Customers</h3>{' '}
        <Link className="text-xs flex items-center" href="#">
          View All
        </Link>
      </span>
      <div className="py-8 flex flex-col gap-5">
        {customerData.map(data => (
          <div key={data.id} className="flex gap-4 items-center">
            <Image
              className="rounded-full w-10 h-10"
              src={data.picture}
              alt={data.name}
              width={40}
              height={40}
            />
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <span className="text-medium font-medium">{data.name}</span>
                <div className="flex gap-1 items-center">
                  <span className="uppercase text-[8px]">{data.service}</span>
                  <div className="w-[3px] h-[3px] bg-content-normal rounded-full"></div>
                  <span className="text-[10px]">{data.email}</span>
                </div>
              </div>
              <span className="text-sm">{data.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCustomers;
