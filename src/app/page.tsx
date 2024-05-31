import Image from 'next/image';
import { dmSans, manRope, nunitoSans, openSans } from '~/font';
import Button from '~/components/Button';
import LeftDashText from '~/components/LeftDashText';
import HomeServicesCard from '~/components/HomeServicesCard';
import ReviewCards from '~/components/ReviewCards';
import Link from 'next/link';
import ArrowRight from '~/commons/icons/ArrowRight';
import AllFAQs from '~/components/AllFAQs';
import ReadMore from '~/components/ReadMore';
import Util from '~/server/utils';
import { notFound, redirect } from 'next/navigation';
import MerchantService from './api/merchant_service/logic';
import Auth0 from '~/server/auth0';
import Review from './api/review/logic';
import MainHome from './MainHome';
import Script from 'next/script';
import OpenCalendly from '~/components/OpenCalendly';

export default async function Home() {
  const { isAdminLogin, slug } = Util.getRouteType();
  if (isAdminLogin) redirect('/manage');
  const sessionUser = await Auth0.getSessionUser();

  if (!slug) {
    return <MainHome />;
  }

  const merchantService = new MerchantService();
  const serviceData = await merchantService.getAllByMerchant(slug);
  const { merchant, services } = serviceData || {};

  if (!merchant && slug) return notFound();
  if (!merchant) return null;

  const unshuffledFaqs = services?.flatMap(s => s.faqs);
  const faqs = Util.shuffleArray(unshuffledFaqs ?? []).slice(0, 7);

  const reviewClient = new Review();
  const reviews = await reviewClient.findByMerchant(merchant!.id);

  return (
    <>
      <main>
        <div className="flex items-center justify-between bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end px-14 py-16 max-md:flex-col">
          <div className="flex w-[50%] flex-col gap-8 max-md:w-full max-md:text-center">
            <p
              className={`${nunitoSans.className} font-semibold text-6xl  text-content-light max-md:text-4xl `}
            >
              {merchant?.caption?.substring(0, 43) ??
                'This is a sample caption. Please add your caption in the admin page.'}
            </p>
            <ReadMore
              text={
                merchant?.shortDescription ??
                'This is a sample description please add a short description in the admin page.'
              }
              maxLength={200}
            />

            <div className="flex justify-between max-md:flex-col max-md:gap-3">
              {/* <Button
                hasGradient={true}
                hasShadow={true}
                onClick={showCalendly}
              >
                <a
                  href={
                    !merchant.calendlyLink
                      ? `tel:${merchant.phoneNo}`
                      : merchant.calendlyLink
                  }
                  target={merchant.calendlyLink ? '_blank' : '_self'}
                >
                  REQUEST APPOINTMENT
                </a>
              </Button> */}
              <OpenCalendly
                calendlyLink={merchant.calendlyLink}
                phoneNo={merchant.phoneNo}
                text="REQUEST APPOINTMENT"
                rest={{
                  hasGradient: true,
                  hasShadow: true,
                }}
              />

              <Button hasGradient={false} hasShadow={false} bgColor="bg-dark">
                <a href={`tel:${merchant.phoneNo}`}>GET AN ESTIMATE</a>
              </Button>
            </div>
          </div>
          <div className="ml-auto">
            <Image
              src="/images/engine.webp"
              alt="engine"
              width="450"
              height="463"
            ></Image>
          </div>
        </div>
        <div className="flex flex-col gap-12 px-14 py-16 max-sm:px-7">
          <div className="ml-4 flex flex-col justify-center gap-5 max-md:items-center">
            <LeftDashText text="Our Services" />
            <div className="flex items-end justify-between max-lg:flex-col max-lg:gap-5 max-md:items-center max-md:justify-center max-md:text-center">
              <span
                className={`text-5xl font-semibold  max-md:text-4xl max-sm:text-3xl ${dmSans.className}`}
              >
                Your One-Stop Auto Repairs Solutions
              </span>
              {Boolean(services?.length) && (
                <Link className="flex gap-2" href="/services">
                  <span className="inset-x-0 bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out hover:border-content-normal">
                    View All
                  </span>
                  <ArrowRight />
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-12 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:flex max-md:flex-col max-md:gap-6 max-md:items-center max-md:justify-center">
            {services
              ?.slice(0, 5)
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

            {merchant?.email === sessionUser?.email ? (
              <>
                {Boolean(services?.length) ? (
                  <div className="flex col-span-3 justify-center mt-4">
                    <Link
                      href={`http://${slug}.admin.moxxil.com/manage/product`}
                    >
                      <Button
                        bgColor="bg-stone-800"
                        width="full"
                        hasShadow={true}
                      >
                        Add a new service
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full col-span-3 gap-8">
                    <p className="text-lg">
                      Want your users to book or subscribe to your auto
                      servicing/repairs?
                    </p>
                    <Link
                      href={`http://${slug}.admin.moxxil.com/manage/product`}
                    >
                      <Button
                        bgColor="bg-stone-800"
                        width="full"
                        hasShadow={true}
                      >
                        Add a new service
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              Boolean(services?.length === 0) && (
                <div className="px-8 col-span-3 text-sm text-center">
                  There is currently no service in this store please check back
                  later!
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex items-start justify-between bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end px-14 py-16 max-md:flex-col max-md:gap-20 max-md:px-7 max-md:text-center">
          <div className="w-[50%] items-center justify-center gap-8 max-md:w-full">
            <Image
              src="/images/auto_wheel.webp"
              alt="engine"
              width="500"
              height="514"
            ></Image>
          </div>
          <div className="flex w-[50%] flex-col gap-7 text-left max-lg:w-full max-md:text-center">
            <div className="ml-10 max-md:ml-auto max-md:mr-auto">
              <LeftDashText text="Reviews" />
            </div>
            <p
              className={`ml-10 text-5xl font-semibold  max-md:text-4xl ${dmSans.className} capitalize`}
            >
              {reviews.length ? (
                <>
                  Approved by{' '}
                  <span
                    style={{
                      backgroundImage:
                        'linear-gradient(92deg, #929FAE 49.36%, #807782 88.79%)',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                    }}
                  >
                    {reviews.length > 10 ? '10+' : reviews.length}
                  </span>{' '}
                  {reviews.length > 1 ? 'clients' : 'client'}
                </>
              ) : (
                <span className="text-3xl max-md:text-2xl font-medium">
                  Not yet approved by a client!
                </span>
              )}
            </p>

            <ReviewCards reviews={reviews} />
          </div>
        </div>

        <div className="flex flex-col gap-12 px-14 max-sm:px-7 py-16 max-md:text-center">
          <div className="ml-4 flex flex-col justify-center gap-5 max-md:ml-0 max-md:items-center">
            <LeftDashText text="FAQ" />
            <div className="flex items-end justify-between max-lg:flex-col max-lg:gap-5 max-md:items-center">
              <span
                className={`text-5xl font-semibold  max-md:text-4xl ${dmSans.className}`}
              >
                Frequently Asked Questions
              </span>
              <Link className="flex gap-2" href="#">
                <span className="inset-x-0 bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out hover:border-content-normal">
                  View All
                </span>
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="grid place-items-center gap-6">
            <AllFAQs data={faqs} />
          </div>
        </div>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        ></link>
      </main>
    </>
  );
}
