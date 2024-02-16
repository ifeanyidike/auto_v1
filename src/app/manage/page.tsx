import React from 'react';
import Auth0 from '~/server/auth0';
import HomeCard from './components/HomeCard';
import DocumentIcon from '~/commons/icons/DocumentIcon';
import HomeChart from './components/HomeChart';
import WalletIcon from '~/commons/icons/WalletIcon';
import CalendarIcon from '~/commons/icons/CalendarIcon';
import SettingsIcon from '~/commons/icons/SettingsIcon';
import LatestCustomers from './components/LatestCustomers';
import HomePieChart from './components/HomePieChart';
import { dmSans } from '~/font';
import Link from 'next/link';
import HomeTransactionList from './components/HomeTransactionList';
import TopMenu from './components/TopMenu';

const Home = async () => {
  return (
    <div className="w-full h-full">
      <TopMenu showToggle />
      <div className="flex max-lg:flex-col gap-4 px-4 py-6 pr-2">
        <div className="flex flex-[0.4] max-lg:flex-1 gap-3 mt-4 flex-wrap ">
          <HomeCard
            title="Total bookings"
            Icon={<DocumentIcon />}
            count={4289}
            iconBgColor="bg-yellow"
          />
          <HomeCard
            title="Total subscriptions"
            Icon={<WalletIcon />}
            count={840281}
            iconBgColor="bg-green-400"
          />
          <HomeCard
            title="Total appointments"
            Icon={<CalendarIcon />}
            count={1287371}
            iconBgColor="bg-red-300"
          />
          <HomeCard
            title="Total earnings"
            Icon={<SettingsIcon />}
            count={5287317}
            iconBgColor="bg-blue-300"
          />
        </div>
        <div className="chart flex-[0.59] max-lg:flex-1 mt-4">
          <HomeChart />
        </div>
      </div>
      <div className="py-20 mt-10 max-lg:flex-col flex gap-5 bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end">
        <LatestCustomers />
        <div className="flex flex-col max-lg:mx-6 p-5 flex-[0.5] w-1/2 max-lg:flex-1 max-lg:w-[95%] items-center gap-4 bg-white shadow shadow-white rounded-xl">
          <span className="flex justify-between w-full">
            <h3 className="text-lg font-semibold">Subscription Overview</h3>{' '}
          </span>
          <div className="w-full h-96 pt-4">
            <HomePieChart />
          </div>
          <div className="flex flex-col w-full px-14 pt-5">
            <div
              className={`flex text-xs uppercase font-semibold justify-between ${dmSans.className}`}
            >
              <span>Services</span> <span>No. of subscriptions</span>
            </div>
            {[
              { id: 1, service: 'Oil change', count: 5238 },
              { id: 2, service: 'Engine repairs', count: 832593 },
              { id: 3, service: 'Wheel & suspension', count: 3852 },
              { id: 4, service: 'Car spraying & painting', count: 25831 },
              { id: 4, service: 'Electrical repairs', count: 1849 },
            ].map(data => (
              <div className="flex text-xs justify-between border-b border-b-stone-200 py-4">
                <span>{data.service}</span>{' '}
                <div className=" flex">{data.count.toLocaleString()}</div>
              </div>
            ))}

            <Link
              href="#"
              className="ml-auto mt-5 text-xs border-b border-red-1/25"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
      <div>
        <HomeTransactionList />
      </div>
    </div>
  );
};

export default Auth0.ProtectedPage(Home, { returnTo: '/manage' });
