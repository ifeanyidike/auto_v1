'use client';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Image from 'next/image';
import Logo from '~/commons/icons/Logo';

type Props = {
  invoice: Invoice;
};

type Invoice = {
  id: string;
  createdAt: Date;
  merchant: any;
  merchantService: any;
  info: string;
  location: string;
  userId: string;
  user: any;
  amount: any;
  isPaid: boolean;
  isFulfilled: boolean;
  paymentMode: string;
};

const InvoicePage = ({ invoice }: Props) => {
  console.log(invoice.createdAt);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (invoiceRef.current) {
      const opt = {
        margin: 0.25,
        filename: `invoice_${invoice.id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };
      html2pdf().from(invoiceRef.current).set(opt).save();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const addressParts = invoice.merchant.address.split(',');
  console.log(invoice.isPaid);
  return (
    <div ref={invoiceRef} className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center">
        <span
          className={` w-40 my-0 mx-auto font-bold text-center p-2 rounded-full ${
            invoice.isPaid ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {' '}
          {invoice.isPaid ? 'PAID' : 'NOT PAID'}
        </span>
        <span
          className={`rounded-full p-2 text-sm mt-4 font-bold ${
            invoice.isFulfilled ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {invoice.isFulfilled ? 'FULFILLED' : 'NOT FULFILLED'}
        </span>
        <h5 className="text-xl font-bold">
          {' '}
          InvoiceNo.{' '}
          <span className="text-sm text-italic">{invoice.id?.slice(-5)}</span>
        </h5>{' '}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center md:px-4 p-4">
        <div className="">
          {invoice.merchant.logo ? (
            <Image
              src={invoice.merchant.logo ? invoice.merchant.logo : ''}
              width={30}
              height={10}
              alt={invoice.merchant.name}
            />
          ) : (
            <Logo />
          )}
        </div>
        <div className="text-center">
          <h3 className="font-bold text-4xl text-shadow-xl">
            {invoice.merchant.name.toUpperCase()}
          </h3>
          <p className="text-sm md:text-10 italic px-3">
            {invoice.merchant.caption}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center mb-4">
        <div className="text-center md:text-left p-4">
          <h5 className="font-bold">Booker's Details:</h5>
          <p className="font-bold">
            {' '}
            Name:{' '}
            <span className="font-normal">
              {invoice.user?.firstName} {invoice.user.lastName}
            </span>{' '}
          </p>
          <p className="font-bold">
            {' '}
            Email: <span className="font-normal">{invoice.user.email}</span>
          </p>
          <Image
            src={invoice.user.imgUrl}
            width={40}
            height={40}
            alt={invoice.user.id}
            className="rounded-full mt-3"
          />
        </div>
        <div className="text-center p-4"></div>
        <div className="text-center md:text-left p-4">
          <p className="mr-1 font-bold">
            Street: <span className="font-normal">{addressParts[0]}</span>
          </p>

          {addressParts.length > 1 && (
            <p className="mr-1 font-bold">
              City: <span className="font-normal"> {addressParts[1]}</span>
            </p>
          )}
          {addressParts.length > 2 && (
            <p className="mr-1 font-bold">
              Country: <span className="font-normal"> {addressParts[2]}</span>
            </p>
          )}

          <p className="font-bold">
            Service location:{' '}
            <span className="font-normal">{invoice.location}</span>
          </p>
          {/* <p>{invoice.merchant.address?.slice(-8)}</p> */}
          <p className="font-bold">
            {' '}
            Email: <span className="font-normal">{invoice.merchant.email}</span>
          </p>
          <p className="font-bold">
            {' '}
            Tel: <span className="font-normal">{invoice.merchant.phoneNo}</span>
          </p>
          <p className="text-blue-600 font-bold">
            Date :
            <span className="font-normal text-black">
              {invoice.createdAt.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
      <div className="p-4">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="text-left">
            <tr>
              <th className="border border-gray-200 px-4 py-2">Service</th>
              <th className="border border-gray-200 px-4 py-2">Service ID</th>
              <th className="border border-gray-200 px-4 py-2">Unit Price</th>
              <th className="border border-gray-200 px-4 py-2">Charges</th>
              <th className="border border-gray-200 px-4 py-2">
                Amount (&#x20a6;)
              </th>
            </tr>
          </thead>
          <tbody className="text-left">
            <tr>
              <td className="border border-gray-200 px-4 py-2">
                <h5>{invoice.merchantService.service.title}</h5>
                <p className="text-sm">
                  {invoice.merchantService.description.slice(0, 40)}...
                </p>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <h5>{invoice.id?.slice(-5)}</h5>
              </td>
              <td className="border border-gray-200 px-4 py-2 w-1/6">
                <h5>
                  {invoice.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </h5>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <h5>
                  {invoice.merchantService?.vat?.length
                    ? invoice.merchantService.vat
                    : 0}
                </h5>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <h5>
                  {(
                    invoice.amount - (invoice.merchantService?.discount || 0)
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h5>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-200 px-4 py-2" colSpan={3}></td>
              <td className="border border-gray-200 px-4 py-2 text-left">
                <p>Subtotal</p>
                <p>Discount</p>
                <p>VAT</p>
                <h3 className="text-blue-600 font-bold">Total</h3>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-left w-1/5">
                <p>
                  {(
                    invoice.amount - (invoice.merchantService?.discount || 0)
                  ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p>
                  {' '}
                  {invoice.merchantService?.discount?.length
                    ? invoice.merchantService.discount[0]
                    : 0}
                </p>
                <p>
                  {' '}
                  {invoice.merchantService?.vat?.length
                    ? invoice.merchantService.vat
                    : 0}
                </p>
                <h3 className="text-blue-600 font-bold">
                  &#x20a6;{' '}
                  {(
                    invoice.amount -
                    (invoice.merchantService?.discount || 0) +
                    (invoice.merchantService?.vat || 0)
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{' '}
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <div className="border-b border-gray-200 py-4 p-4">
            <h5 className="font-bold text-blue-600">NOTE:</h5>
            <p className="text-base ">
              We do appreciate your business and if there’s anything else we can
              do, please let us know!
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 text-right">
        <button
          onClick={handleDownloadPDF}
          className="border-[1px] border-green-700 mr-2 px-4 py-2 rounded-lg text-green-700"
        >
          Download
        </button>
        <button
          onClick={handlePrint}
          className="border-[1px] border-gray-600 mr-2 px-4 py-2 rounded-lg text-gray-600"
        >
          Print
        </button>
        <button className="border-[1px] bg-green-700 px-4 py-2 rounded-lg text-white">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
