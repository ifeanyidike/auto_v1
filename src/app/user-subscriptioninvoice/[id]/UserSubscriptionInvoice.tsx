'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import InvoicePage from './InvoicePage';
import { type subscriptionByUserItem } from '~/app/api/subscription/logic';

type Props = {
  subscriptions: subscriptionByUserItem[];
};

const UserSubscriptionInvoice = ({ subscriptions }: Props) => {
  const { id: invoiceId } = useParams<{ id: string }>();

  const invoice = subscriptions.find(
    item => String(item.id) === String(invoiceId)
  );
  
  return (
    <div className="p-8">{invoice && <InvoicePage invoice={invoice} />}</div>
  );
};

export default UserSubscriptionInvoice;
