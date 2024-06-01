'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import InvoicePage from './InvoicePage';
import { type bookingByUserItem } from '~/app/api/booking/logic';
type Props = {
  bookings: bookingByUserItem[];
};

const UserBookingInvoice = ({ bookings }: Props) => {
  const { id: invoiceId } = useParams<{ id: string }>();

  const invoice = bookings.find(item => String(item.id) === String(invoiceId));

  return (
    <div className="p-8">{invoice && <InvoicePage invoice={invoice} />}</div>
  );
};

export default UserBookingInvoice;
