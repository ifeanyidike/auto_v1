import React from 'react';
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
import Booking from '../api/booking/logic';
import Util from '~/server/utils';
import Merchant from '../api/merchant/logic';
import Subscription from '../api/subscription/logic';
import { Transaction } from '~/server/payment/transaction';
import { getShortFormattedDate } from 'utilities/common';
import ProtectedPage from '~/server/protectedPage';
import { unstable_noStore as noStore } from 'next/cache';

const Home = async () => {
  noStore();
  const { slug } = Util.getRouteType();
  const merchantClient = new Merchant();
  const merchant = await merchantClient.getOne({ slug });

  const bookingClient = new Booking();
  const bookings = await bookingClient.findByMerchant(merchant?.id!);

  const subscriptionClient = new Subscription();
  const subscriptions = await subscriptionClient.findByMerchant(merchant?.id!);

  const transactionClient = new Transaction();
  const earnings = await transactionClient.getTotalEarning();

  const transactionList = await transactionClient.getTransactions(
    100000,
    getShortFormattedDate()
  );
  const transactionByMonth =
    await transactionClient.getTransactionAmountByMonths(transactionList);

  const transactionsByDate = Util.sortTransactionsByDate(
    subscriptions,
    bookings
  );

  const subscriptionByMonth = Util.organizeSubscriptionByMonth(subscriptions);

  const subscriptionByService =
    Util.organizeSubscriptionByServiceName(subscriptions);
  return (
    <div className="w-full h-full">
      <TopMenu showToggle />
      <div className="flex max-lg:flex-col gap-4 px-4 py-6 pr-2">
        <div className="flex flex-[0.4] max-lg:flex-1 gap-3 mt-4 justify-center flex-wrap ">
          <HomeCard
            title="Total bookings"
            Icon={<DocumentIcon />}
            count={bookings.length}
            iconBgColor="bg-yellow"
          />
          <HomeCard
            title="Total subscriptions"
            Icon={<WalletIcon />}
            count={subscriptions.length}
            iconBgColor="bg-green-400"
          />
          <HomeCard
            title="Total appointments"
            Icon={<CalendarIcon />}
            count={0}
            iconBgColor="bg-red-300"
          />
          <HomeCard
            title="Total earnings"
            Icon={<SettingsIcon />}
            count={earnings?.data?.total_volume / 100 || 0}
            iconBgColor="bg-blue-300"
            isAmount
          />
        </div>
        <div className="chart flex-[0.59] max-lg:flex-1 mt-4">
          <HomeChart data={transactionByMonth} />
        </div>
      </div>
      <div className="py-20 mt-10 max-lg:flex-col flex gap-5 bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end">
        <LatestCustomers transactions={transactionsByDate.slice(0, 6)} />
        <div className="flex flex-col max-lg:mx-6 p-5 flex-[0.5] w-1/2 max-lg:flex-1 max-lg:w-[96%] items-center gap-4 max-md:mx-auto bg-white shadow shadow-white rounded-xl">
          <span className="flex justify-between w-full">
            <h3 className="text-lg font-semibold">Subscription Overview</h3>{' '}
          </span>

          {Object.keys(subscriptionByService).length ? (
            <>
              <div className="w-full h-96 pt-4">
                <HomePieChart data={subscriptionByMonth} />
              </div>
              <div className="flex flex-col w-full px-14 pt-5">
                <div
                  className={`flex text-xs uppercase font-semibold justify-between ${dmSans.className}`}
                >
                  <span>Services</span> <span>No. of subscriptions</span>
                </div>
                {Object.entries(subscriptionByService).map(
                  ([service, count]) => (
                    <div
                      key={service}
                      className="flex text-xs justify-between border-b border-b-stone-200 py-4"
                    >
                      <span>{service}</span>{' '}
                      <div className=" flex">{count.toLocaleString()}</div>
                    </div>
                  )
                )}

                <Link
                  href="#"
                  className="ml-auto mt-5 text-xs border-b border-red-1/25"
                >
                  View All
                </Link>
              </div>
            </>
          ) : (
            <div className="pt-10">You have no active subscriptions</div>
          )}
        </div>
      </div>
      <div className="mb-8">
        <HomeTransactionList transactions={transactionsByDate} />
      </div>
    </div>
  );
};

export default ProtectedPage(Home, { returnTo: '/manage' });
