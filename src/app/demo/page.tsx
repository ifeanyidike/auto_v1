import React from 'react';
import Script from 'next/script';
import PageClient from './PageClient';
import ParentHeader from '~/components/ParentHeader';

const page = () => {
  return (
    <div>
      <ParentHeader />
      {/* <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        type="text/javascript"
        async
      />
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      ></link> */}
      <PageClient />
    </div>
  );
};

export default page;
