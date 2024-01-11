'use client';
import React, { useEffect, useState } from 'react';
import { useInView, animated } from '@react-spring/web';
import ServicesPageCard from '~/components/ServicesCard';
import { type MerchantServiceType } from '../api/merchant_service/logic';

type Props = {
  services: MerchantServiceType[] | null;
};

const ServiceClient = (props: Props) => {
  const { services } = props;
  const [visibleServices, setVisibleServices] = useState(3);

  const [ref, inView] = useInView();

  const isInView: boolean = inView || false;

  const loadMoreServices = () => {
    if (isInView) {
      setVisibleServices(prevCount => prevCount + 3);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', loadMoreServices);
    return () => {
      window.removeEventListener('scroll', loadMoreServices);
    };
  }, [isInView]);
  return (
    <div ref={ref} className="flex flex-col gap-12 px-14 pb-28 pt-20">
      <div className="grid grid-cols-3 gap-x-3 gap-y-12 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1">
        {services?.slice(0, visibleServices).map(s => (
          <animated.div key={s.id} style={{ opacity: isInView ? 1 : 0 }}>
            <ServicesPageCard
              category={s.service?.type ?? ''}
              details={s.service?.description ?? ''}
              imgSrc={s.imgUrl ?? s.service?.imgUrl ?? ''}
              title={s.service?.title ?? ''}
              href={`/service/${s.service?.title ?? ''}`}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceClient;
