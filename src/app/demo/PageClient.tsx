'use client';
import Script from 'next/script';
import React from 'react';
import Footer from '~/components/Footer';
import { dmSans } from '~/font';

const PageClient = () => {
  //   React.useEffect(() => {
  //     window.Calendly?.initBadgeWidget({
  //       url: 'https://calendly.com/ifeanyidike/follow-up-meeting',
  //       text: 'Schedule time with me',
  //       color: '#0069ff',
  //       textColor: '#ffffff',
  //       branding: undefined,
  //     });
  //   }, []);

  //   const showCalendly = () => {
  //     window.Calendly?.initBadgeWidget({
  //       url: 'https://calendly.com/ifeanyidike/follow-up-meeting',
  //       text: 'Schedule time with me',
  //       color: '#0069ff',
  //       textColor: '#ffffff',
  //       branding: undefined,
  //     });
  //   };

  return (
    <div>
      <div className="flex flex-col py-16">
        <div
          className={`flex flex-col text-center w-[950px] my-8 max-md:w-full mx-auto gap-12 px-4 ${dmSans.className} `}
        >
          <h2 className={`text-8xl font-black max-md:text-5xl`}>
            Demo Moxxil Today: See it in Action!
          </h2>
          <span className="w-[800px] max-md:w-full mx-auto text-xl max-md:text-base">
            Experience the power of Moxxil for your auto shop firsthand.
            Simplify bookings and subscriptions effortlessly. Request your demo
            now - no fuss, just straightforward insights.
          </span>
        </div>
        <div
          className={`sticky calendly-inline-widget min-w-64 h-[700px] ${dmSans.className} py-12 bg-stone-100`}
          data-url="https://calendly.com/ifeanyidike/follow-up-meeting"
        />

        <div
          //   style={{ padding: '56.25% 0 0 0', position: 'relative' }}
          className={`${dmSans.className} w-3/5 max-md:w-full gap-6 flex flex-col mx-auto items-center justify-center my-16 px-4`}
        >
          <h2 className={`text-6xl max-md:text-4xl font-black`}>
            Instant Demo Video
          </h2>
          <span className="text-lg max-md:text-base max-md:text-center max-sm:text-left max-sm:px-0">
            Don't have time for a one-on-one demo? Watch this 5-minute product
            tour of Moxxil.
          </span>
        </div>
        <div className="flex relative w-full h-[500px] max-md:h-[400px] max-sm:h-[200px] px-4">
          <iframe
            src="https://player.vimeo.com/video/930577822?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            className="w-full h-full"
            title="Player"
          ></iframe>
        </div>
      </div>
      <Script src="https://player.vimeo.com/api/player.js"></Script>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        type="text/javascript"
        async
      />
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      ></link>
      <Footer />
      {/* <button onClick={showCalendly}>Show calendly</button> */}
    </div>
  );
};

export default PageClient;
