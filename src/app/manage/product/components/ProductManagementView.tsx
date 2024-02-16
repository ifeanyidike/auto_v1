'use client';
import React, { useEffect, useState } from 'react';
import DragAndDrop from '~/components/DragAndDrop';
import ProductPane from './ProductPane';
import Select from '~/components/Select';
import MultilineTextInput from '~/components/MultilineTextInput';
import FAQInputItem from '../../components/FAQInputItem';
import PlusIcon from '~/commons/icons/PlusIcon';
import CloseIcon from '~/commons/icons/CloseIcon';
import { type MultiValue, type SingleValue } from 'react-select';
import TopMenu from '../../components/TopMenu';
import BackToPage from '../../components/BackToPage';
import Button from '~/components/Button';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import Spinner from '~/components/Spinner';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import axios from 'axios';
import TextInput from '~/components/TextInput';
import BrandPricingItem from '../../components/BrandPricingItem';
import { type MerchantServiceType } from '~/app/api/merchant_service/logic';

const BookmarkIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
    />
  </svg>
);

const FolderIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
    />
  </svg>
);

const init: CreateMerchantServiceParamType = {
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
  } as CreateMerchantServiceParamType['faq_keypoints'],
};

const suv_sedan_data = [
  {
    value: 'SUV',
    label: 'Sport Utility Vehicles (SUVs)',
  },
  {
    value: 'SEDAN',
    label: 'Sedan',
  },
];

const brand_data = [
  {
    value: 'Toyota Camry',
    label: 'Toyota Camry',
  },
  {
    value: 'Toyota Corolla',
    label: 'Toyota Corolla',
  },
  {
    value: 'Lexus 350',
    label: 'Lexus 350',
  },
  {
    value: 'Honda Accord',
    label: 'Honda Accord',
  },
  {
    value: 'Mercedes C-Class',
    label: 'Mercedes C-Class',
  },
];

const keypoints_data = [
  {
    value: 'Premium Diagnostic Checks',
    label: 'Premium Diagnostic Checks',
  },
  {
    value: 'The Widest Range Of Vehicle',
    label: 'The Widest Range Of Vehicle',
  },
  {
    value: 'In-Depth System Analysis',
    label: 'In-Depth System Analysis',
  },
  {
    value: 'The Highest Level Of Accuracy',
    label: 'The Highest Level Of Accuracy',
  },
];

type Props = {
  merchantId: string | undefined;
  product?: MerchantServiceType | null;
};

const ProductManagementView = (props: Props) => {
  const [data, setData] = useState<CreateMerchantServiceParamType>(init);
  const [saving, setSaving] = useState<boolean>(false);
  const [savingDraft, setSavingDraft] = useState<boolean>(false);

  const modes = [
    {
      value: 'FIXED',
      label: 'Fixed',
    },
    {
      value: 'BRAND',
      label: 'By Brand',
    },
    {
      value: 'SUV_SEDAN',
      label: 'By SUV and Sedan',
    },
  ];

  const service_types = [
    {
      value: 'REPAIR',
      label: 'Repairs',
    },
    {
      value: 'SERVICE',
      label: 'Servicing',
    },
  ];

  const services = [
    {
      value: 'Oil Change',
      label: 'Oil Change',
    },
    {
      value: 'Electrical Repairs',
      label: 'Electrical Repairs',
    },
    {
      value: 'Break Repairs',
      label: 'Break Repairs',
    },
    {
      value: 'Car radiator',
      label: 'Car radiator',
    },
  ];

  const getFAQKeyPointsNumCompleted = () => {
    const { faq, keypoints } = data.faq_keypoints || {};
    if (!faq && !keypoints) return 0;
    let count = 0;
    if (keypoints?.length) {
      count++;
    }

    if (faq?.length) {
      const hasComplete = faq?.some(f => f.answer && f.question);
      if (hasComplete) count++;
    }
    return count;
  };

  const getPricingNumCompleted = () => {
    const { mode, data: pricingData } = data.pricing;
    if (!mode) return 0;

    if (mode === 'FIXED' && pricingData?.[0]?.amount) return 2;

    if (mode === 'SUV_SEDAN') {
      const complete = pricingData.every(d => d.amount && d.type);
      if (complete) return 2;
    }

    const exist = pricingData?.some(d => d.amount && d.type);
    if (exist) return 2;

    return 1;
  };

  const createService = async () => {
    if (!props.merchantId) return;
    const faqs = data.faq_keypoints?.faq.map(faq => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    }));
    data.faq_keypoints.faq = faqs;
    try {
      setSaving(true);
      await axios.post(
        `/api/merchant_service/form-data`,
        {
          merchantId: props.merchantId,
          description: data.description.description,
          product_type: JSON.stringify(data.product_type),
          faq_keypoints: JSON.stringify(data.faq_keypoints),
          pricing: JSON.stringify(data.pricing),
          isDraft: props.product?.isDraft,
          existingProductId: props.product?.id,
          image: data.image.file,
          mode: 'publish',
          ...(props.product?.imgUrl && { imageUrl: props.product?.imgUrl }),
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSaving(false);
      return enqueueSnackbar('Product successfully saved!', {
        variant: 'success',
      });
    } catch (error) {
      const errData = error as {
        message: string;
        response: { data: { error: string } };
      };

      const errorMessage = errData.response.data?.error;
      if (errorMessage) {
        console.log('Error:', errorMessage);
        enqueueSnackbar(errorMessage, { variant: 'error' });
        return;
      }
      console.log('error', errData.response.data);
    } finally {
      setSaving(false);
    }
  };

  const saveServiceAsDraft = async () => {
    if (!props.merchantId) return;
    const faqs = data.faq_keypoints?.faq.map(faq => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    }));
    data.faq_keypoints.faq = faqs;

    try {
      setSavingDraft(true);
      await axios.post(
        `/api/merchant_service/form-data`,
        {
          merchantId: props.merchantId,
          description: data.description.description,
          product_type: JSON.stringify(data.product_type),
          faq_keypoints: JSON.stringify(data.faq_keypoints),
          pricing: JSON.stringify(data.pricing),

          ...(props.product?.imgUrl && { imageUrl: props.product?.imgUrl }),
          ...(props.product?.isDraft !== undefined && {
            isDraft: props.product?.isDraft,
          }),
          ...(props.product?.id && { existingProductId: props.product?.id }),
          image: data.image.file,
          mode: 'draft',
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSavingDraft(false);
      return enqueueSnackbar('Product successfully saved as draft!', {
        variant: 'success',
      });
    } catch (error) {
      const errData = error as {
        message: string;
        response: { data: { error: string } };
      };

      const errorMessage = errData.response.data?.error;
      if (errorMessage) {
        console.log('Error:', errorMessage);
        enqueueSnackbar(errorMessage, { variant: 'error' });
        return;
      }
      console.log('error', errData.response.data);
    } finally {
      setSavingDraft(false);
    }
  };

  useEffect(() => {
    if (props.product?.pricingMode) {
      const pricingData = props.product?.pricing;
      handleSelectMode(props.product.pricingMode, pricingData);
    }

    const newData = { ...data };
    if (props.product?.description) {
      newData.description.description = props.product.description;
    }

    if (props.product?.service) {
      newData.product_type.service_name = props.product.service.title;
      newData.product_type.service_type = props.product.service.type;
    }

    if (props.product?.keyPoints?.length) {
      newData.faq_keypoints.keypoints = props.product.keyPoints.map(
        k => k.point
      );
    }

    const faqs = props.product?.faqs;
    if (faqs?.length) {
      const faqData = faqs.map(faq => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        isDefault: true,
      }));
      newData.faq_keypoints.faq = faqData;
    }
    setData(newData);
  }, []);

  const handleSelectMode = (
    value: string,
    pricingData: MerchantServiceType['pricing'] | null = null
  ) => {
    const newData = { ...data };
    newData.pricing.mode = value as 'FIXED' | 'BRAND' | 'SUV_SEDAN';
    const pricing_data = pricingData?.map(({ id, type, amount }) => ({
      id,
      type,
      amount,
    }));

    if (value === 'SUV_SEDAN') {
      const data = pricingData?.length
        ? pricing_data
        : [
            {
              type: 'SUV',
              id: globalThis.crypto.randomUUID(),
            },
            {
              type: 'SEDAN',
              id: globalThis.crypto.randomUUID(),
            },
          ];
      newData.pricing.data =
        data as CreateMerchantServiceParamType['pricing']['data'];
    } else if (value === 'BRAND') {
      const data = pricingData?.length
        ? pricingData.map(({ id, type, amount }) => ({ id, type, amount }))
        : [{ id: globalThis.crypto.randomUUID() }];

      newData.pricing.data =
        data as CreateMerchantServiceParamType['pricing']['data'];
    }

    setData(newData);
  };

  const renderFixedPricingView = () => (
    <div>
      <label className="text-sm mb-2 font-semibold" htmlFor="amount">
        Amount
      </label>
      <TextInput
        customStyle="text-xs"
        prefixSign="₦"
        name="amount"
        placeholder="Please enter amount for this product"
        defaultValue={
          props.product?.pricingMode === 'FIXED'
            ? Number(props.product?.pricing?.[0]?.amount).toString() ?? ''
            : ''
        }
        getValue={amountString => {
          let amount: number | undefined = parseFloat(amountString);
          if (isNaN(amount)) {
            enqueueSnackbar('Please enter a number', {
              variant: 'error',
            });
            amount = undefined;
          }
          const newData = { ...data };
          newData.pricing.data = [
            {
              amount,
            },
          ];

          console.log('newData', newData);
          setData(newData);
        }}
      />
    </div>
  );

  const renderBySuvSedanPricingView = () => (
    <div className="flex flex-col gap-6 mt-4">
      {data.pricing.data?.map(item => {
        return (
          <BrandPricingItem
            key={item.id}
            id={item.id!}
            data={data}
            setData={setData}
            currItem={item}
            listItems={suv_sedan_data.filter(s => {
              const values = data.pricing.data.map(d => d.type);
              return !values.includes(s.value);
            })}
            defaultList={suv_sedan_data.filter(s => s.value === item.type)}
          />
        );
      })}
    </div>
  );

  const renderByBrandPricingView = () => (
    <div className="flex flex-col gap-6 mt-4 relative">
      {data.pricing.data?.map((item, index) => {
        return (
          <div key={item.id}>
            <button
              onClick={() => {
                const newData = { ...data };
                const filtered = newData.pricing.data.filter(
                  d => d.id !== item.id
                );
                newData.pricing.data = filtered;

                setData(newData);
              }}
              className={`${index === 0 && 'hidden'} absolute top-0 right-0`}
            >
              <CloseIcon classNames="h-4 w-4" />
            </button>
            <BrandPricingItem
              id={item.id!}
              data={data}
              setData={setData}
              currItem={item}
              listItems={brand_data.filter(s => {
                const values = data.pricing.data.map(d => d.type);
                return !values.includes(s.value);
              })}
              defaultList={brand_data.filter(s => s.value === item.type)}
            />
          </div>
        );
      })}

      <button
        onClick={() => {
          const newData = { ...data };
          newData.pricing.data.push({
            id: globalThis.crypto.randomUUID(),
          });
          setData(newData);
        }}
        className="ml-auto hover-target flex justify-between items-center hover:w-[150px] transition ease-in-out duration-300 bg-stone-200 p-2 rounded-md relative"
      >
        <span className="hide absolute right-2 -top-2 p-2 text-sm font-medium rounded mt-2">
          Add more items
        </span>
        <PlusIcon classNames="h-5 w-5" />
      </button>
    </div>
  );

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
                onClick={saveServiceAsDraft}
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
                onClick={createService}
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

      <div className="pt-5 px-8 flex max-lg:flex-col gap-5 w-full">
        <div className="flex sticky top-2 h-screen flex-col flex-[0.4] w-2/5 max-lg:w-full max-lg:flex-1 gap-5">
          <div className="w-full h-72">
            <DragAndDrop
              defaultValue={props.product?.imgUrl}
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
            numCompleted={getPricingNumCompleted()}
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
                defaultValue={modes.filter(
                  m => m.value === props.product?.pricingMode
                )}
                data={modes}
                getValue={e => {
                  const value = (
                    e as SingleValue<Record<'label' | 'value', string>>
                  )?.value;
                  if (value) {
                    handleSelectMode(value);
                  }
                }}
              />
            </div>

            {data.pricing.mode === 'FIXED'
              ? renderFixedPricingView()
              : data.pricing.mode === 'BRAND'
                ? renderByBrandPricingView()
                : renderBySuvSedanPricingView()}
          </ProductPane>
        </div>
        <div className="flex flex-col flex-[0.6] w-3/5 gap-5 max-lg:w-full max-lg:flex-1">
          <ProductPane
            initExpanded
            numCompleted={Object.values(data.product_type).length}
            numItems={2}
            paneTitle="Product Type"
          >
            {/* <TextInput placeholder="Enter the title" /> */}

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
                defaultValue={service_types.filter(
                  m => m.value === props.product?.service?.type
                )}
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
                defaultValue={services.filter(
                  m => m.value === props.product?.service?.title
                )}
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
              defaultValue={props.product?.description ?? ''}
              getValue={e => {
                const newData = { ...data };
                newData.description.description = e;
                setData(newData);
              }}
            />
          </ProductPane>

          <ProductPane
            initExpanded
            numCompleted={getFAQKeyPointsNumCompleted()}
            numItems={2}
            paneTitle="FAQ And KeyPoints"
          >
            <div className="w-full mb-3">
              <label className="text-sm mb-2 font-semibold" htmlFor="service">
                Key points
              </label>
              <Select
                name="keypoints"
                placeholder="Service keypoints"
                isMulti
                isCreateable
                maxLength={4}
                defaultValue={keypoints_data.filter(
                  m => props.product?.keyPoints?.some(p => p.point === m.value)
                )}
                getValue={e => {
                  const values = (
                    e as MultiValue<Record<'label' | 'value', string>>
                  )?.map(v => v.value);
                  if (values) {
                    const newData = { ...data };
                    newData.faq_keypoints.keypoints = values;
                    setData(newData);
                  }
                }}
                data={keypoints_data}
              />
            </div>

            <div className="w-full relative">
              <div className="w-full border-b mb-4 pb-1">
                <label className="text-sm mb-2 font-semibold" htmlFor="service">
                  FAQ
                </label>
              </div>

              <div className="mb-6 gap-6 flex flex-col">
                {data.faq_keypoints?.faq.map((item, index) => (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => {
                        const newData = { ...data };
                        const filtered = newData.faq_keypoints.faq.filter(
                          d => d.id !== item.id
                        );
                        newData.faq_keypoints.faq = filtered;

                        setData(newData);
                      }}
                      className={`${
                        index === 0 && 'hidden'
                      } absolute top-0 right-0`}
                    >
                      <CloseIcon classNames="h-4 w-4" />
                    </button>
                    <FAQInputItem
                      id={item.id}
                      question={item.question}
                      answer={item.answer}
                      isDefault={item.isDefault}
                      data={data}
                      setData={setData}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const newData = { ...data };
                  newData.faq_keypoints.faq.push({
                    id: globalThis.crypto.randomUUID(),
                    question: '',
                    answer: '',
                  });
                  setData(newData);
                }}
                className="ml-auto hover-target flex justify-between items-center hover:w-[150px] transition ease-in-out duration-300 bg-stone-200 p-2 rounded-md relative"
              >
                <span className="hide absolute right-2 -top-2 p-2 text-sm font-medium rounded mt-2">
                  Add more FAQs
                </span>
                <PlusIcon classNames="h-5 w-5" />
              </button>
            </div>
          </ProductPane>
        </div>
      </div>
    </>
  );
};

export default ProductManagementView;
