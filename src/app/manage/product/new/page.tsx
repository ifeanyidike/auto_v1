import React from 'react';
import DragAndDrop from '~/components/DragAndDrop';
import ProductPane from '../components/ProductPane';
import TextInput from '~/components/TextInput';
import Select from '~/components/Select';

const AddNewProduct = () => {
  return (
    <div
      className={`h-screen w-full text-inherit pt-5 px-8 flex max-md:flex-col gap-5`}
    >
      <div className="flex flex-col flex-[0.4] w-2/5 max-md:w-full max-md:flex-1">
        <div className="w-full h-72">
          <DragAndDrop />
        </div>
      </div>
      <div className="flex flex-col flex-[0.6] w-3/5">
        <ProductPane
          initExpanded
          numCompleted={2}
          numItems={2}
          paneTitle="General Information"
        >
          {/* <TextInput placeholder="Enter the title" /> */}

          <div className="w-2/5">
            <label className="text-sm mb-2" htmlFor="service_type">
              Service Type
            </label>
            <Select
              name="service_type"
              placeholder="Service type"
              data={[
                {
                  value: 'REPAIR',
                  label: 'Repairs',
                },
                {
                  value: 'SERVICE',
                  label: 'service',
                },
              ]}
            />
          </div>
          <div className="w-full">
            <label className="text-sm mb-2" htmlFor="service">
              Service
            </label>
            <Select
              name="service"
              placeholder="Select the service"
              data={[
                {
                  value: 'Oil Change',
                  label: 'Oil Change',
                },
                {
                  value: 'white',
                  label: 'White',
                },
              ]}
            />
          </div>
        </ProductPane>
      </div>
    </div>
  );
};

export default AddNewProduct;
