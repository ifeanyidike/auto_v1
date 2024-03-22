'use client';
import React, { useState } from 'react';
import Menu from './Menu';
import GeneralSettings from './GeneralSettings';
import { Tabs } from './types';
import { SnackbarProvider } from 'notistack';
import LoaderOne from '~/components/LoaderOne';
import ServiceSettings from './ServiceSettings';
import APIKeySettings from './APIKeySettings';
import { type MerchantType } from '~/app/api/merchant/logic';

type Props = {
  merchant: MerchantType;
};
const PageClient = (props: Props) => {
  const [tab, setTab] = useState<Tabs>(Tabs.general);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <SnackbarProvider maxSnack={1} />
      {loading && <LoaderOne />}
      <Menu getActiveTab={tab => setTab(tab)} />
      {tab === Tabs.general ? (
        <GeneralSettings setLoading={setLoading} merchant={props.merchant!} />
      ) : tab === Tabs.serviceSettings ? (
        <ServiceSettings setLoading={setLoading} merchant={props.merchant!} />
      ) : tab === Tabs.apiKeys ? (
        <APIKeySettings setLoading={setLoading} merchant={props.merchant!} />
      ) : null}
    </>
  );
};

export default PageClient;
