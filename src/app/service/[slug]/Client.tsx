'use client';
import React from 'react';
import Link from 'next/link';
import ArrowRight from '~/commons/icons/ArrowRight';
import CheckIcon from '~/commons/icons/CheckIcon';
import Button from '~/components/Button';
import FAQCard from '~/components/FAQCard';
import HomeServicesCard from '~/components/HomeServicesCard';
import LeftDashText from '~/components/LeftDashText';
import { useParams } from 'next/navigation';
import { dmSans } from '~/font';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getSubdomain } from '~/states/utility';

type Props = {
  subdomain: string;
  topServices: MerchantServiceType[] | null;
  merchantService: MerchantServiceType | null;
};
const Client = ({ topServices, merchantService }: Props) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const { user } = useUser();

  const otherServices = topServices?.filter(
    s => s.service?.title?.toLowerCase() !== decodeURI(slug)
  );
  const domain = getSubdomain();

  const isAdmin = user?.email === merchantService?.merchant?.email;

  return (
    <>
      <div
        className={`flex h-[500px] w-full flex-col justify-center gap-10 bg-stone-900/100 bg-[url("/images/car_radiator.jpg")] bg-cover bg-center bg-no-repeat px-20 py-5 text-white bg-blend-overlay max-md:h-[550px] max-md:items-center max-md:px-3 max-md:text-center`}
      >
        <LeftDashText lineColor="border-white" text="Service" />
        <h2
          className={` ${dmSans.className} w-1/2 text-5xl capitalize max-lg:w-full max-md:text-5xl`}
        >
          {merchantService?.service?.title}
        </h2>
        <div className="max-md: grid w-1/2 grid-cols-2 gap-4 text-white max-lg:w-fit max-md:grid-cols-1 ">
          {merchantService?.keyPoints.map(kp => (
            <div key={kp.id} className="flex items-center gap-3">
              <span className="flex w-fit rounded-full bg-[#414146] p-[6px]">
                <CheckIcon classNames="h-4 w-4" />
              </span>
              <p className="text-sm">{kp.point}</p>
            </div>
          ))}
        </div>
        <div className="sticky top-0 flex w-[600px] max-md:w-full gap-5 max-sm:flex-col">
          <div className="flex w-[300px]">
            <Button
              hasGradient
              width="w-full"
              height="h-12"
              onClick={() =>
                router.push(
                  isAdmin
                    ? `${window.location.protocol}//${domain}.admin.${
                        window.location.hostname.includes('localhost')
                          ? 'localhost:3000'
                          : 'moxxil.com'
                      }/manage/booking`
                    : `booking?id=${merchantService?.id}`
                )
              }
            >
              {isAdmin ? 'View Customers Bookings' : 'Book Now'}
            </Button>
          </div>
          <div className="flex w-[300px]">
            {!merchantService?.subscriptions?.length ? (
              <Button
                textColor="text-content-normal"
                bgColor="bg-stone-300"
                width="w-full"
                height="h-12"
                onClick={() =>
                  router.push(
                    isAdmin
                      ? `${window.location.protocol}//${domain}.admin.${
                          window.location.hostname.includes('localhost')
                            ? 'localhost:3000'
                            : 'moxxil.com'
                        }/manage/subscription`
                      : `subscription?service=${slug}&id=${merchantService?.id}`
                  )
                }
              >
                {isAdmin ? 'View Customers Subscriptions' : 'Subscribe Now'}
              </Button>
            ) : (
              <div>
                <div className="flex flex-col text-center items-center justify-center px-9 py-3 text-xs h-12 mb-2 bg-stone-500/50 rounded-full">
                  <span>
                    Already subscribed to{' '}
                    {merchantService?.subscriptions?.[0]?.plan?.autoBrand ===
                    'FIXED'
                      ? merchantService.service?.title
                      : `${merchantService?.subscriptions?.[0]?.plan?.autoBrand} brand`}
                  </span>
                  <span>
                    {merchantService?.subscriptions?.length > 1
                      ? `+${merchantService?.subscriptions?.length - 1} more`
                      : null}
                  </span>
                </div>
                <div className="flex flex-col text-xs items-center mt-4 gap-1 justify-center">
                  {merchantService?.servicePricing?.length! > 1 && (
                    <Link
                      className="hover:text-orange-500"
                      href={`subscription?service=${slug}&id=${merchantService?.id}`}
                    >
                      Subscribe to another brand
                    </Link>
                  )}
                  <Link className="hover:text-orange-500" href="#">
                    Cancel subscription
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col py-12 px-20">
        <div className="ml-4 flex flex-col justify-center gap-5 max-md:items-center">
          <LeftDashText text="Description" />
          <div className="flex items-end justify-between max-lg:flex-col max-lg:gap-5 max-md:items-center max-md:justify-center max-md:text-center">
            <span
              className={`text-3xl font-semibold  max-md:text-4xl max-sm:text-3xl ${dmSans.className}`}
            >
              Why {merchantService?.service?.title}?
            </span>
          </div>
        </div>
        <div className="flex w-full items-center gap-14  py-14 max-md:flex-col-reverse max-md:gap-3 max-md:px-5">
          {merchantService?.description}
        </div>
      </div>

      <div className="flex flex-col py-28 bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end px-20">
        <div className="ml-4 flex flex-col justify-center gap-5 max-md:items-center">
          <LeftDashText text="FAQ" />
          <div className="flex items-end justify-between max-lg:flex-col max-lg:gap-5 max-md:items-center max-md:justify-center max-md:text-center">
            <span
              className={`text-5xl font-semibold  max-md:text-4xl max-sm:text-3xl ${dmSans.className}`}
            >
              Frequently Asked Questions
            </span>
          </div>
        </div>
        <div className="flex w-full items-center gap-14  py-14 max-md:flex-col-reverse max-md:gap-3 max-md:px-5">
          <div className="flex flex-1 flex-col">
            {merchantService?.faqs?.map(faq => (
              <FAQCard
                key={faq.id}
                bottomBorder
                width="w-full"
                questionFontSize="text-lg"
                answerFontSize="text-md"
                decorateActive
                {...faq}
              />
            ))}
          </div>

          <div className="sticky top-0 flex h-full w-1/4 flex-col items-center gap-5 bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end py-8 max-md:w-full">
            <a
              href={
                !merchantService?.merchant?.calendlyLink
                  ? `tel:${merchantService?.merchant?.phoneNo!}`
                  : merchantService.merchant.calendlyLink
              }
              target={
                merchantService?.merchant?.calendlyLink ? '_blank' : '_self'
              }
            >
              <Button hasShadow bgColor="bg-dark" width="w-full">
                Request Appointment
              </Button>
            </a>
            {/* <Link className="flex gap-2" href="#">
              <span className="inset-x-0  bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out hover:border-content-normal">
                Learn More
              </span>
              <ArrowRight />
            </Link> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12 px-14 pb-28 pt-20">
        <div className="ml-4 flex flex-col justify-center gap-5 max-md:items-center">
          <LeftDashText text="Other Services" />
          <div className="flex items-end justify-between max-lg:flex-col max-lg:gap-5 max-md:items-center max-md:justify-center max-md:text-center">
            <span
              className={`text-5xl font-semibold  max-md:text-4xl max-sm:text-3xl ${dmSans.className}`}
            >
              Explore other similar services
            </span>
            <Link className="flex gap-2" href="/services">
              <span className="inset-x-0 bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out hover:border-content-normal">
                View All
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-12 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1">
          {otherServices
            ?.filter(s => s.id !== merchantService?.id)
            ?.slice(0, 3)
            ?.map(s => (
              <HomeServicesCard
                key={s.id}
                category={s.service?.type ?? 'Repair'}
                details={s.description || ''}
                imgSrc={s.imgUrl ?? s.service?.imgUrl ?? ''}
                title={s.service?.title ?? ''}
                href={`/service/${s.service?.title?.toLowerCase() ?? ''}`}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Client;
