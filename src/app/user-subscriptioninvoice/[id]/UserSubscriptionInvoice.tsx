'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import InvoicePage from './InvoicePage';
import { type subscriptionByUserItem } from '~/app/api/subscription/logic';

type Props = {
  subscriptions: subscriptionByUserItem[];
};

const UserSubscriptionInvoice = () => {
  const { id: invoiceId } = useParams<{ id: string }>();

  // const invoice = subscriptions.find(
  //   item => String(item.id) === String(invoiceId)
  // );

  return <div className="p-8">{<InvoicePage />}</div>;
};

export default UserSubscriptionInvoice;
