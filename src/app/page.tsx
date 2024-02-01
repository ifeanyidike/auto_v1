import Image from 'next/image';
import { dmSans, robotoMono } from '~/font';
import Button from '~/components/Button';
import LeftDashText from '~/components/LeftDashText';
import HomeServicesCard from '~/components/HomeServicesCard';
import ReviewCards from '~/components/ReviewCards';
import Link from 'next/link';
import ArrowRight from '~/commons/icons/ArrowRight';
import AllFAQs from '~/components/AllFAQs';
import Util from '~/server/utils';
import { redirect } from 'next/navigation';
import MerchantService from './api/merchant_service/logic';

export default async function Home() {
  const { isAdminLogin, slug } = Util.getRouteType();
  if (isAdminLogin) redirect('/manage');

  const merchantService = new MerchantService();
  const { merchant, services } = await merchantService.getAllByMerchant(slug);
  const unshuffledFaqs = services?.map(s => s.faqs).flat();
  const faqs = Util.shuffleArray(unshuffledFaqs ?? []).slice(0, 7);
  return (
    <>
      <main>
        <div className="flex items-center justify-between bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end px-14 py-28 max-md:flex-col">
          <div className="flex w-[50%] flex-col gap-8 max-md:w-full max-md:text-center">
            <p
              className={`${robotoMono.className} text-8xl uppercase  text-content-light max-lg:text-6xl max-md:text-4xl `}
            >
              {merchant?.caption ?? 'One-stop auto service solution.'}
            </p>
            <p className={`text-dark`}>
              {merchant?.shortDescription ??
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam provident placeat doloremque id laborum aliquid.'}
            </p>
            <div className="flex justify-between max-md:flex-col max-md:gap-3">
              <Button hasGradient={true} hasShadow={true}>
                REQUEST APPOINTMENT
              </Button>
              <Button hasGradient={false} hasShadow={false} bgColor="bg-dark">
                GET AN ESTIMATE
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
        <div className="flex flex-col gap-12 px-14 pb-28 pt-20">
          <div className="ml-4 flex flex-col justify-center gap-5 max-md:items-center">
            <LeftDashText text="Our Services" />
            <div className="flex items-end justify-between max-lg:flex-col max-lg:gap-5 max-md:items-center max-md:justify-center max-md:text-center">
              <span
                className={`text-5xl font-semibold  max-md:text-4xl max-sm:text-3xl ${dmSans.className}`}
              >
                Your One-Stop Auto Repairs Solutions
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
            {services
              ?.slice(0, 5)
              ?.map(s => (
                <HomeServicesCard
                  key={s.id}
                  category={s.service?.type ?? 'Repair'}
                  details={
                    s.service?.description ??
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quos recusandae earum itaque quis iste quibusdam amet magni nobis labore.'
                  }
                  imgSrc={s.imgUrl ?? s.service?.imgUrl ?? ''}
                  title={s.service?.title ?? ''}
                  href={`/service/${s.service?.title?.toLowerCase() ?? ''}`}
                />
              ))}
          </div>
        </div>

        <div className="flex items-start justify-between bg-gradient-to-r from-gradient-bg-start to-gradient-bg-end px-14 py-28 max-md:flex-col max-md:gap-20 max-md:px-7 max-md:text-center">
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
                10+
              </span>{' '}
              clients
            </p>

            <ReviewCards />
          </div>
        </div>

        <div className="flex flex-col gap-12 px-14 pb-28 pt-20 max-md:text-center">
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
      </main>
    </>
  );
}
