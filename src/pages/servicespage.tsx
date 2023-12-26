import React from "react";
import ServicesPageCard from "~/components/ServicesPageCard";
import { dmSans } from "~/font";

import { ServiceData } from "~/components/Data"; // Renamed the import

const ServicePage = () => {
  return (
    <main>
      <div className="flex flex-col gap-12 px-14 pb-28 pt-20">
        <span
          className={`text-5xl font-semibold  max-md:text-4xl ${dmSans.className}`}
        >
          Our Services
        </span>

        <div className="grid grid-cols-3 gap-x-3 gap-y-12 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1">
          {ServiceData.map((service) => (
            <ServicesPageCard
              category={service.category}
              details={service.details}
              imgSrc={service.imgSrc}
              title={service.title}
              href={service.href}
             
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicePage;
