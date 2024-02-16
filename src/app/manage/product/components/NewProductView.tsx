'use client';
import React, { useState } from 'react';
import DragAndDrop from '~/components/DragAndDrop';
import ProductPane from './ProductPane';
import Select from '~/components/Select';
import MultilineTextInput from '~/components/MultilineTextInput';
import { type SingleValue } from 'react-select';
import TopMenu from '../../components/TopMenu';
import BackToPage from '../../components/BackToPage';
import Button from '~/components/Button';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import Spinner from '~/components/Spinner';
import { SnackbarProvider } from 'notistack';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';
import {
  createService,
  getFAQKeyPointsNumCompleted,
  getPricingNumCompleted,
  handleSelectMode,
  payment_modes,
  saveServiceAsDraft,
  service_types,
  services,
} from 'utilities/product';
import RenderFixedPricingView from './RenderFixedPricingView';
import RenderBrandPricingView from './RenderBrandPricingView';
import RenderSuvSedanPricingView from './RenderSuvSedanPricingView';
import FAQList from './FAQList';
import KeypointList from './KeypointList';
import BookmarkIcon from '~/commons/icons/BookmarkIcon';
import FolderIcon from '~/commons/icons/FolderIcon';

type Props = {
  merchantId: string | undefined;
  product?: MerchantServiceType | null;
};

const NewProductView = (props: Props) => {
  const [data, setData] = useState<CreateMerchantServiceParamType>({
    product_type: {} as CreateMerchantServiceParamType['product_type'],
    image: {} as CreateMerchantServiceParamType['image'],
    description: {} as CreateMerchantServiceParamType['description'],
    pricing: {} as CreateMerchantServiceParamType['pricing'],
    faq_keypoints: {
      faq: [
        {
          id: globalThis.crypto.randomUUID(),
          question: '',
          answer: '',
        },
      ],
      keypoints: [],
    },
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const pricingCompleted = getPricingNumCompleted(data);
  const faqKeyPointsCompleted = getFAQKeyPointsNumCompleted(data);

  return (
    <>
      <SnackbarProvider maxSnack={1} />
      <TopMenu
        showToggle
        component={
          <div className="flex justify-between items-center w-full">
            <BackToPage
              toHref="/manage/product/"
              prevTitle="products"
              currTitle="Add New Product"
            />
            <div className="z-50 flex gap-3 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:bg-white max-sm:w-full max-sm:p-4 text-sm">
              <Button
                px="px-6"
                radius="rounded-2xl"
                hasGradient={false}
                hasShadow={false}
                bgColor="bg-content-normal/50"
                onClick={() =>
                  saveServiceAsDraft(
                    props.merchantId,
                    data,
                    props.product,
                    setSavingDraft
                  )
                }
              >
                <div className="flex gap-2 items-center">
                  {!savingDraft ? (
                    <BookmarkIcon />
                  ) : (
                    <Spinner customStyle="!w-5 !h-5 !text-white" />
                  )}{' '}
                  <span>
                    {props.product?.isDraft
                      ? 'Update Draft'
                      : props.product?.isDraft === false
                        ? 'Unpublish to Draft'
                        : 'Save to Draft'}
                  </span>
                </div>
              </Button>
              <Button
                px="px-6"
                radius="rounded-2xl"
                hasGradient={true}
                hasShadow={true}
                gradientStart="from-content-normal"
                gradientEnd="to-content-light"
                shadowColor="shadow-content-light"
                bgColor="bg-content-light"
                onClick={() =>
                  createService(
                    props.merchantId,
                    data,
                    props.product,
                    setSaving
                  )
                }
              >
                <div className={`flex gap-2 items-center`}>
                  {!saving ? (
                    <FolderIcon />
                  ) : (
                    <Spinner customStyle="!w-5 !h-5 !text-white" />
                  )}
                  <span>
                    {!props.product?.isDraft
                      ? 'Update Product'
                      : 'Publish Product'}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        }
      />

      <div className="pt-5 mb-8 max-sm:mb-24 px-8 flex max-lg:flex-col gap-5 w-full">
        <div className="flex sticky top-2 h-screen flex-col flex-[0.4] w-2/5 max-lg:w-full max-lg:flex-1 gap-5 order-11">
          <div className="w-full h-72">
            <DragAndDrop
              getFiles={files => {
                if (files.length) {
                  const newData = { ...data };
                  newData.image.file = files[0]!;
                  setData(newData);
                }
              }}
            />
          </div>

          <ProductPane
            initExpanded
            numCompleted={pricingCompleted}
            numItems={2}
            paneTitle="Pricing"
          >
            <div className="">
              <label
                className="text-sm mb-2 font-semibold"
                htmlFor="service_type"
              >
                Payment Mode
              </label>
              <Select
                name="payment_mode"
                placeholder="Payment mode"
                data={payment_modes}
                getValue={e => {
                  const value = (
                    e as SingleValue<Record<'label' | 'value', string>>
                  )?.value;
                  if (value) {
                    handleSelectMode(data, setData, value);
                  }
                }}
              />
            </div>

            {data.pricing.mode === 'FIXED' ? (
              <RenderFixedPricingView
                product={props.product}
                data={data}
                setData={setData}
              />
            ) : data.pricing.mode === 'BRAND' ? (
              <RenderBrandPricingView
                product={props.product}
                data={data}
                setData={setData}
              />
            ) : data.pricing.mode === 'SUV_SEDAN' ? (
              <RenderSuvSedanPricingView
                product={props.product}
                data={data}
                setData={setData}
              />
            ) : null}
          </ProductPane>
        </div>
        <div className="flex flex-col flex-[0.6] w-3/5 gap-5 max-lg:w-full max-lg:flex-1">
          <ProductPane
            initExpanded
            numCompleted={Object.values(data.product_type).length}
            numItems={2}
            paneTitle="Product Type"
          >
            <div className="w-2/5 max-sm:w-full">
              <label
                className="text-sm mb-2 font-semibold"
                htmlFor="service_type"
              >
                Service Type
              </label>
              <Select
                name="service_type"
                placeholder="Service type"
                data={service_types}
                getValue={e => {
                  const value = (
                    e as SingleValue<Record<'label' | 'value', string>>
                  )?.value;
                  if (value) {
                    const newData = { ...data };
                    newData.product_type.service_type = value;
                    setData(newData);
                  }
                }}
              />
            </div>
            <div className="w-full">
              <label className="text-sm mb-2 font-semibold" htmlFor="service">
                Service
              </label>
              <Select
                name="service"
                placeholder="Select the service"
                getValue={e => {
                  const value = (
                    e as SingleValue<Record<'label' | 'value', string>>
                  )?.value;
                  if (value) {
                    const newData = { ...data };
                    newData.product_type.service_name = value;
                    setData(newData);
                  }
                }}
                data={services}
              />
            </div>
          </ProductPane>

          <ProductPane
            initExpanded
            numCompleted={data.description?.description?.length > 0 ? 1 : 0}
            numItems={1}
            paneTitle="Description"
          >
            <MultilineTextInput
              placeholder="Please describe your product"
              customStyle="min-h-20"
              getValue={e => {
                const newData = { ...data };
                newData.description.description = e;
                setData(newData);
              }}
            />
          </ProductPane>

          <ProductPane
            initExpanded
            numCompleted={faqKeyPointsCompleted}
            numItems={2}
            paneTitle="FAQ And KeyPoints"
          >
            <KeypointList
              data={data}
              setData={setData}
              product={props.product}
            />

            <FAQList data={data} setData={setData} />
          </ProductPane>
        </div>
      </div>
    </>
  );
};

export default NewProductView;
