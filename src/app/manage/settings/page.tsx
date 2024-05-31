import React from 'react';
import TopMenu from '../components/TopMenu';
import BackToPage from '../components/BackToPage';
import Merchant from '~/app/api/merchant/logic';
import Util from '~/server/utils';
import PageClient from './components/PageClient';
import ProtectedPage from '~/server/protectedPage';

const Settings = async () => {
  const { slug } = Util.getRouteType();
  const merchantClient = new Merchant();
  const merchant = await merchantClient.getOne({ slug });

  const util = new Util();

  const apiKeys = merchant?.apiKeys;
  const paystack = util.decryptSecret(apiKeys?.paystack);
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
              currTitle="Settings"
            />
          </div>
        }
      />

      <div className="px-10 bg-white w-full h-full">
        <h2 className="text-xl font-semibold pt-5 pb-8">Settings</h2>

        <PageClient merchant={merchant!} decryptedSecrets={{ paystack }} />
      </div>
    </div>
  );
};

export default ProtectedPage(Settings, { returnTo: '/settings' });
