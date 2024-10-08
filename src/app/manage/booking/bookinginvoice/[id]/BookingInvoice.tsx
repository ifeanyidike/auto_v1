'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import { BookingData } from '~/components/Data';
import InvoicePage from '~/app/manage/components/InvoicePage';

const BookingInvoice = () => {
  const { id: invoiceId } = useParams<{ id: string }>();

  const invoice = BookingData.find(
    item => String(item._id) === String(invoiceId)
  );
  console.log(invoice);
  return (
    <div>
      {/* {invoice ? (
        <InvoicePage />
      ) : (
        <div className="text-center text-gray-700 mt-8"></div>
      )} */}
    </div>
  );
};

export default BookingInvoice;
