'use client';
import React, { useState } from 'react';
import Menu from './Menu';
import GeneralSettings from './GeneralSettings';
import { type Prisma } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import { Tabs } from './types';
import { SnackbarProvider } from 'notistack';
import LoaderOne from '~/components/LoaderOne';
import ServiceSettings from './ServiceSettings';

type Props = {
  merchant: Prisma.MerchantGetPayload<Prisma.MerchantDefaultArgs<DefaultArgs>>;
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
      ) : null}
    </>
  );
};

export default PageClient;
