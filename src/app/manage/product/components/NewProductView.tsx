'use client';
import React, { useEffect, useState } from 'react';
import DragAndDrop from '~/components/DragAndDrop';
import ProductPane from './ProductPane';
import Select from '~/components/Select';
import MultilineTextInput from '~/components/MultilineTextInput';
import { type SingleValue } from 'react-select';
import TopMenu from '../../components/TopMenu';
import BackToPage from '../../components/BackToPage';
import Button from '~/components/Button';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import {
  getFAQKeyPointsNumCompleted,
  getPricingNumCompleted,
  handleSelectMode,
  payment_modes,
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
import SubscriptionTogglerSettings from './SubscriptionTogglerSettings';
import Link from 'next/link';
import { type MerchantType } from '~/app/api/merchant/logic';
import { useFormState } from 'react-dom';
import { save } from '../action';
import LoaderOne from '~/components/LoaderOne';
import ActionButton from './ActionButton';

type Props = {
  merchant: MerchantType;
  hasApiKey: boolean;
};

const NewProductView = (props: Props) => {
  const [data, setData] = useState<CreateMerchantServiceParamType>({
    product_type: {} as CreateMerchantServiceParamType['product_type'],
    image: {} as CreateMerchantServiceParamType['image'],
    description: {} as CreateMerchantServiceParamType['description'],
    pricing: {
      discounts: [
        {
          id: globalThis.crypto.randomUUID(),
          code: '',
          type: 'monthly',
        },
        {
          id: globalThis.crypto.randomUUID(),
          code: '',
          type: 'quarterly',
        },
        {
          id: globalThis.crypto.randomUUID(),
          code: '',
          type: 'biannually',
        },
        {
          id: globalThis.crypto.randomUUID(),
          code: '',
          type: 'annually',
        },
      ],
    } as CreateMerchantServiceParamType['pricing'],
    subscriptions: [],
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
  const [actionCount, setActionCount] = useState(0);
  const [saving, setSaving] = useState<boolean>(false);
  const pricingCompleted = getPricingNumCompleted(data);
  const faqKeyPointsCompleted = getFAQKeyPointsNumCompleted(data);

  const [state, formAction] = useFormState(save, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      enqueueSnackbar('Data successfully saved!', {
        variant: 'success',
      });
    }
  }, [state.success, actionCount]);
  useEffect(() => {
    if (state.error) {
      enqueueSnackbar(state.error, {
        variant: 'error',
      });
    }
  }, [state.error, actionCount]);

  return (
    <form action={formAction}>
      <SnackbarProvider maxSnack={1} />
      {saving && <LoaderOne />}
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
              <ActionButton setLoading={setSaving}>
                <Button
                  px="px-6"
                  radius="rounded-2xl"
                  hasGradient={false}
                  hasShadow={false}
                  bgColor="bg-content-normal/50"
                  type={undefined}
                  name="draft"
                  onClick={() => setActionCount(prev => prev + 1)}
                >
                  <div className="flex gap-2 items-center">
                    <BookmarkIcon />
                    <span>Save to Draft</span>
                  </div>
                </Button>
              </ActionButton>
              <ActionButton setLoading={setSaving}>
                <Button
                  px="px-6"
                  radius="rounded-2xl"
                  hasGradient={true}
                  hasShadow={true}
                  gradientStart="from-content-normal"
                  gradientEnd="to-content-light"
                  shadowColor="shadow-content-light"
                  bgColor="bg-content-light"
                  name="publish"
                  onClick={() => setActionCount(prev => prev + 1)}
                >
                  <div className={`flex gap-2 items-center`}>
                    <FolderIcon />
                    <span>Publish Product</span>
                  </div>
                </Button>
              </ActionButton>
            </div>
          </div>
        }
      />
      <small className="flex items-center justify-center pt-5 gap-2 max-md:w-full max-md:flex-col px-4">
        <span className="text-center max-md:w-full">
          *You need to configure paystack online payment to successfully add a
          product.{'  '}
        </span>
        <Link className="text-red-1" href="/manage/account?path=apiKeys">
          Configure now
        </Link>
      </small>
      <input type="hidden" name="merchantId" value={props.merchant.id} />

      <div className="pt-5 mb-8 max-sm:mb-24 px-8 flex max-lg:flex-col gap-5 w-full">
        <div className="flex sticky top-2 flex-col flex-[0.4] w-2/5 max-lg:w-full max-lg:flex-1 gap-5 order-11">
          <div className="w-full h-72">
            <DragAndDrop
              name="product_image"
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
            numCompleted={data.subscriptions.length ? 1 : 0}
            numItems={1}
            paneTitle="Set up subscription plans"
          >
            <SubscriptionTogglerSettings data={data} setData={setData} />
          </ProductPane>

          {/* {Boolean(data.subscriptions.length) && (
            <ProductPane
              initExpanded
              numCompleted={discountCompleted}
              numItems={data.pricing.discounts.length}
              paneTitle="Discounts"
            >
              <div className="flex flex-col gap-6">
                <input
                  type="hidden"
                  name="discounts"
                  value={JSON.stringify(data.pricing.discounts)}
                />
                {data.pricing.discounts?.map(discount => (
                  <DiscountView
                    key={discount.id}
                    item={discount}
                    data={data}
                    setData={setData}
                    merchant={props.merchant}
                  />
                ))}
              </div>
            </ProductPane>
          )} */}
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
              <RenderFixedPricingView data={data} setData={setData} />
            ) : data.pricing.mode === 'BRAND' ? (
              <RenderBrandPricingView data={data} setData={setData} />
            ) : data.pricing.mode === 'SUV_SEDAN' ? (
              <RenderSuvSedanPricingView data={data} setData={setData} />
            ) : null}
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
              name="description"
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
            <KeypointList data={data} setData={setData} />

            <FAQList data={data} setData={setData} />
          </ProductPane>
        </div>
      </div>
    </form>
  );
};

export default NewProductView;
