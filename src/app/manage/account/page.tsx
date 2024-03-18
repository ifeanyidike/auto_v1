import React from 'react';
import Auth0 from '~/server/auth0';
import TopMenu from '../components/TopMenu';
import BackToPage from '../components/BackToPage';
import Merchant from '~/app/api/merchant/logic';
import Util from '~/server/utils';
import PageClient from './components/PageClient';
import ProtectedPage from '~/server/protectedPage';

const Account = async () => {
  const { slug } = Util.getRouteType();
  const merchantClient = new Merchant();
  const merchant = await merchantClient.getOne({ slug });
  return (
    <div
      className={`h-[300px] w-full flex-1 flex flex-col text-inherit rounded-xl`}
    >
      <TopMenu
        showToggle
        component={
          <div className="flex justify-between items-center w-full">
            <BackToPage
              toHref="/manage/"
              prevTitle="home"
              currTitle="Account"
            />
          </div>
        }
      />

      <div className="px-10 bg-white w-full h-full">
        <h2 className="text-xl font-semibold pt-5 pb-8">Account Settings</h2>

        <PageClient merchant={merchant!} />
      </div>
    </div>
  );
};

export default await ProtectedPage(Account, { returnTo: '/account' });
