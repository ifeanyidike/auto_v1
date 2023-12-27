import React, { useEffect, useState } from "react";
import ServicesPageCard from "~/components/ServicesPageCard";
import ServiceBanner from "~/components/ServiceBanner";
import { ServiceData } from "~/components/Data";
import { useInView, animated } from "@react-spring/web";

const Services = () => {
  const [visibleServices, setVisibleServices] = useState(3);

  const [ref, inView] = useInView();

  const isInView: boolean = inView || false;

  const loadMoreServices = () => {
    if (isInView) {
      setVisibleServices((prevCount) => prevCount + 3);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMoreServices);
    return () => {
      window.removeEventListener("scroll", loadMoreServices);
    };
  }, [isInView]);

  return (
    <div ref={ref}>
      <ServiceBanner />
      <div className="flex flex-col gap-12 px-14 pb-28 pt-20">
        <div className="grid grid-cols-3 gap-x-3 gap-y-12 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1">
          {ServiceData.slice(0, visibleServices).map((service, index) => (
            <animated.div key={index} style={{ opacity: isInView ? 1 : 0 }}>
              <ServicesPageCard
                category={service.category}
                details={service.details}
                imgSrc={service.imgSrc}
                title={service.title}
                href={service.href}
              />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
