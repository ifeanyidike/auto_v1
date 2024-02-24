import React from 'react';
import Logo from '~/commons/icons/Logo';

type Props = {
  invoice: Invoice;
};

type Invoice = {
  _id: string;
  name: string;
  title: string;
  date: string;
  status: string;
};

const InvoicePage = ({ invoice }: Props) => {
  return (
    <div className="border-2 relative rounded-xl mt-3 bg-white p-4">
      <div className="p-4">
        <h5 className="text-2xl font-bold"> Invoice - #VEN009985</h5>
      </div>
      <div className="w-full md:flex md:justify-between md:items-center">
        <div className=" w-full p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Logo />
            </div>
            <div className="text-right">
              <p>Venus Llc, 9990 St.</p>
              <p>5000 Church Street,</p>
              <p>Suite 550 Huntsville, Alabama, 99990</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p> {invoice.name},</p>
              <p> 7500 Oakdale Ave,</p>
              <p>San Francisco, California(CA), 9450</p>
            </div>
            <div className="text-right">
              <p>
                Invoice - <span className="text-red-700">#010</span>
              </p>
              <p>{invoice.date}</p>
              <span className="rounded-full bg-red-700 px-2 text-white mt-3 font-bold">
                {invoice.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="text-left">
            <tr>
              <th className="border border-gray-200 px-4 py-2">Items</th>
              <th className="border border-gray-200 px-4 py-2">Products ID</th>
              <th className="border border-gray-200 px-4 py-2">Unit Price</th>
              <th className="border border-gray-200 px-4 py-2">
                Extra charges
              </th>
              <th className="border border-gray-200 px-4 py-2">Amount (Net)</th>
            </tr>
          </thead>
          <tbody className="text-left">
            <tr>
              <td className="border border-gray-200 px-4 py-2">
                <h5>{invoice.title}</h5>
                <p>
                  Create quality mockups and prototypes and Design mobile-based
                  features.
                </p>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <h5>#{invoice._id}</h5>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <h5>$ 6000</h5>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <h5>$2000</h5>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <h5>$ 8000</h5>
              </td>
            </tr>

            <tr>
              <td className="border border-gray-200 px-4 py-2" colSpan={3}></td>
              <td className="border border-gray-200 px-4 py-2 text-left">
                <p>Subtotal</p>
                <p>Discount</p>
                <p>VAT</p>
                <h3 className="text-blue-600 font-bold">Total USD</h3>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-left">
                <p>$ 8,000</p>
                <p>$ 0</p>
                <p>$ 10</p>
                <h3 className="text-blue-600 font-bold">$ 8,010</h3>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <div className="border-b border-gray-200 py-4">
            <h5 className="font-bold">NOTES</h5>
            <p className="text-base ">
              We really appreciate your business and if there’s anything else we
              can do, please let us know! Also, should you need us to add VAT or
              anything else to this order, it’s super easy since this is a
              template, so just ask!
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 text-right">
        <button className="border-[1px] border-green-700 mr-2 px-4 py-2 rounded-lg text-green-700">
          Download
        </button>
        <button className="border-[1px] border-gray-600 mr-2 px-4 py-2 rounded-lg text-gray-600">
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
