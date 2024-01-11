'use client';
import React, { useEffect, useState } from 'react';
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

type Props = {
  subdomain: string;
  topServices: MerchantServiceType[] | null;
};
const Client = ({ topServices, subdomain }: Props) => {
  const { slug } = useParams<{ slug: string }>();
  const [merchantService, setService] = useState<MerchantServiceType | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://${subdomain}.localhost:3000/api/merchant_service/${slug}/`
      );

      const _service = (await data.json()) as MerchantServiceType | null;
      setService(_service);
    };

    fetchData()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, [slug]);

  const otherServices = topServices?.filter(
    s => s.service?.title?.toLowerCase() !== decodeURI(slug)
  );
  const handleAction = () => router.push('/booking');

  return (
    <>
      <div
        className={`flex h-[500px] w-full flex-col justify-center gap-10 bg-stone-900/100 bg-[url("/images/car_radiator.jpg")] bg-cover bg-center bg-no-repeat px-20 py-5 text-white bg-blend-overlay max-md:h-[550px] max-md:items-center max-md:px-3 max-md:text-center`}
      >
        <LeftDashText lineColor="border-white" text="Service" />
        <h2
          className={` ${dmSans.className} w-1/2 text-5xl capitalize max-lg:w-full max-md:text-5xl`}
        >
          {/* Radiator & Engine Cooling */}
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
        <div className="sticky top-0 flex w-[300px] max-md:w-full">
          <Button
            hasGradient
            hasShadow
            text="Book Now"
            shadowColor="shadow-stone-400"
            width="w-full"
            onClick={handleAction}
          />
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
            <Button
              hasShadow
              bgColor="bg-dark"
              text="Request Appointment"
              width="w-full"
            />
            <Link className="flex gap-2" href="#">
              <span className="inset-x-0  bottom-0 w-fit border-b border-transparent transition-all duration-1000 ease-in-out hover:border-content-normal">
                Learn More
              </span>
              <ArrowRight />
            </Link>
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
            ?.slice(0, 3)
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
    </>
  );
};

export default Client;
