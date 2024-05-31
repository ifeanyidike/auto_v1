'use client';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { useUser } from '@auth0/nextjs-auth0/client';
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
  pricingMode: string;
  discounts: [];
  service: string;
  status: string;

  //   info: string;
  //   location: string;
  //   userId: string;
  user: string;
  amount: any;
  //   isPaid: boolean;
  //   isFulfilled: boolean;
  //   paymentMode: string;
};

const InvoicePage = ({ invoice }: Props) => {
  console.log(invoice.createdAt);
  const { user } = useUser();

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

  return (
    <div ref={invoiceRef} className="bg-white rounded-lg p-4 shadow-2xl">
      <div className="w-full px-3 bg-blue-200 border flex justify-between items-center rounded-lg shadow-lg">
        <p className="">
          <span className="font-bold text-center text-blue-500">
            {invoice.merchantService.service.type}
          </span>
        </p>
        <p
          className={`font-bold text-center p-2 rounded-full ${
            invoice.status === 'active' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {' '}
          {invoice.status.toUpperCase()}
        </p>{' '}
        <p className="">
          <h5 className="text-xl font-bold">
            {' '}
            InvoiceNo.{' '}
            <span className="text-sm text-italic">{invoice.id?.slice(-5)}</span>
          </h5>{' '}
        </p>
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
        {user && (
          <div className="text-center md:text-left p-4">
            <h5 className="font-bold">Subscriber's Detail:</h5>
            <p className="font-bold">
              {' '}
              Name: <span className="font-normal">{user.name}</span>{' '}
            </p>
            <p className="font-bold">
              {' '}
              Email: <span className="font-normal">{user.email}</span>
            </p>
            {user && user.picture ? (
              <Image
                src={user?.picture}
                width={50}
                height={50}
                alt={''}
                className="rounded-full"
              />
            ) : (
              <Image
                src={'/images/avatar.webp'}
                width={20}
                height={20}
                alt={''}
                className="rounded-lg"
              />
            )}
          </div>
        )}

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
      <div className={`w-[55%] flex flex-col m-auto my-0 border-1`}>
        <h4 className="mb-3 font-bold underline text-center">
          Why You Should Subscribe to Our Services:
        </h4>
        <p className="text-center">
          {invoice.merchant.shortDescription.substring(0, 150)}{' '}
          <span className="font-bold">..</span>
        </p>
      </div>
      <div className="p-4">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="text-left">
            <tr>
              <th className="border border-gray-200 px-4 py-2">Service</th>
              <th className="border border-gray-200 px-4 py-2">Service ID</th>
              <th className="border border-gray-200 px-4 py-2">Mode</th>
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
                  {invoice.merchantService.service.description?.slice(0, 40)}...
                </p>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <h5>{invoice.id?.slice(-5)}</h5>
              </td>
              <td className="border border-gray-200 px-4 py-2 w-1/6">
                <h5>{invoice.merchantService.pricingMode}</h5>
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
                  {invoice.merchantService.service.discounts
                    ? invoice.merchantService.service.discounts
                    : '0.00'}
                </h5>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-200 px-4 py-2" colSpan={3}></td>
              <td className="border border-gray-200 px-4 py-2 text-left">
                <p>Discount</p>
                <p>VAT</p>
                <h3 className="text-blue-600 font-bold">Total</h3>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-left w-1/5">
                <p>
                  {' '}
                  {invoice.merchantService?.discounts?.length
                    ? invoice.merchantService.discounts[0]
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
                  {(invoice.amount
                    ? invoice.amount -
                      (invoice.merchantService?.discounts[0] || 0) +
                      (invoice.merchantService?.vat || 0)
                    : '000'
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
