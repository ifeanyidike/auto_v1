import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import Merchant from '../merchant/logic';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import Util from '~/server/utils';
import FAQ from '../faq/logic';
import ServiceKeypoint from '../service_keypoint/logic';
import ServicePricing from '../service_pricing/logic';
import Discount from '../discount/logic';
import SubscriptionPlan from '../subscription_plan/logic';
import { Plan } from '~/server/payment/plan';
import {
  type SubscriptionPlanDuration,
  type PlanParams,
} from '~/types/payment';
// import Service from './service';

export type MerchantServiceType = {
  id: string;
  imgUrl: string | null;
  imageId?: string | null;
  pricingMode: string | null;
  description: string | null;
  faqs: Prisma.FAQGetPayload<Prisma.FAQDefaultArgs<DefaultArgs>>[];
  keyPoints: Prisma.ServiceKeyPointGetPayload<
    Prisma.ServiceKeyPointDefaultArgs<DefaultArgs>
  >[];
  service: Prisma.ServiceGetPayload<
    Prisma.ServiceDefaultArgs<DefaultArgs>
  > | null;
  pricing:
    | Prisma.ServicePricingGetPayload<
        Prisma.ServicePricingDefaultArgs<DefaultArgs>
      >[]
    | null;
  discounts:
    | Prisma.DiscountGetPayload<Prisma.DiscountDefaultArgs<DefaultArgs>>[]
    | null;
  subscriptionPlans:
    | Prisma.SubscriptionPlanGetPayload<
        Prisma.SubscriptionPlanDefaultArgs<DefaultArgs>
      >[]
    | null;
  subscriptions?:
    | (Prisma.SubscriptionGetPayload<
        Prisma.SubscriptionDefaultArgs<DefaultArgs>
      > &
        {
          planId: string;
          plan: Prisma.SubscriptionPlanGetPayload<
            Prisma.SubscriptionPlanDefaultArgs<DefaultArgs>
          >;
        }[])
    | null;
  isDraft: boolean;
  updatedAt: Date;
  createdAt: Date;
};

export default class MerchantService extends Utility {
  constructor() {
    super();
  }

  public async create(
    merchantId: string,
    parent_data: Prisma.ServiceCreateInput,
    data: Prisma.MerchantServiceCreateInput,

    keypoints?: string[],
    faqs?: string[],
    discounts?: Record<'code' | 'value' | 'type', string>[],
    planList?: { interval: SubscriptionPlanDuration; code: string }[],
    // faqs?: Record<'question' | 'answer', string>[],
    pricing?: CreateMerchantServiceParamType['pricing']
  ) {
    // const serviceInstance = new Service({ title: parent_data.title });
    // const service = await serviceInstance.getOne();
    // if (!service) {
    //   await serviceInstance.create(parent_data);
    // }
    return this.process(async () => {
      return await this.db.merchantService.create({
        data: {
          ...data,
          service: {
            connectOrCreate: {
              create: {
                ...parent_data,
              },
              where: {
                title: parent_data.title,
              },
            },
          },
          merchant: {
            connect: {
              id: merchantId,
            },
          },

          ...(faqs && {
            faqs: {
              connect: faqs.map(k => ({ id: k })),
            },
          }),

          ...(discounts && {
            discounts: {
              create: discounts.map(({ code, value, type }) => ({
                code,
                value,
                type,
              })),
            },
          }),

          ...(planList && {
            subscriptionPlans: {
              create: planList.map(({ code, interval }) => ({
                code,
                interval,
              })),
            },
          }),

          ...(keypoints && {
            keyPoints: { connect: keypoints.map(k => ({ id: k })) },
          }),

          // ...(keypoints && {
          //   keyPoints: {
          //     connect: keypoints.map(k => ({ id: k })),
          //   },
          // }),

          ...(pricing && {
            servicePricing: {
              create: pricing.data.map(({ type, amount }) => ({
                mode: pricing.mode,
                ...(type && { type }),
                amount: amount!,
              })),
            },
          }),

          // keyPoints: {
          //   connectOrCreate: (keypoints ?? []).map(point => {
          //     return {
          //       where: { point },
          //       create: { point },
          //     };
          //   }),
          // },

          // ...(faqs && {
          //   faqs: {
          //     connectOrCreate: faqs.map(({ question, answer }) => ({
          //       where: { question, answer },
          //       create: { question, answer },
          //     })) as Prisma.FAQCreateOrConnectWithoutMerchantServiceInput[],
          //   },
          // }),
          // ...(pricing && {
          //   servicePricing: {
          //     connectOrCreate: pricing.data.map(({ type, amount }) => ({
          //       where: {
          //         mode: pricing.mode,
          //         type,
          //       },
          //       create: {
          //         mode: pricing.mode,
          //         type,
          //         amount,
          //       },
          //     })) as Prisma.ServicePricingCreateOrConnectWithoutMerchantServiceInput[],
          //   },
          // }),
        },
      });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.merchantService.delete({ where: { id } });
    });
  }

  public async update(
    id: string,
    data: Prisma.MerchantServiceUpdateInput,
    keyPoints?: string[],
    faqs?: string[],
    discounts?: string[],
    // subscriptions?: string[],
    planList?: string[],
    pricing?: string[]
  ) {
    return this.process(async () => {
      return await this.db.merchantService.update({
        where: { id },
        data: {
          ...data,
          ...(keyPoints && {
            keyPoints: { connect: keyPoints.map(k => ({ id: k })) },
          }),
          // ...(keyPoints && {

          // }),

          ...(faqs && {
            faqs: {
              connect: faqs.map(k => ({ id: k })),
            },
          }),

          ...(discounts && {
            discounts: {
              connect: discounts.map(k => ({ id: k })),
            },
          }),

          ...(planList?.length && {
            subscriptionPlans: {
              connect: planList.map(k => ({ id: k })),
            },
          }),

          ...(pricing && {
            servicePricing: {
              connect: pricing.map(k => ({ id: k })),
            },
          }),
        },
      });
    });
  }

  public async getOne(data: {
    id?: string;
    title?: string;
    merchantId?: string;
    userId?: string;
  }) {
    const { id, title, merchantId } = data;

    return this.process(async () => {
      if (!id && !title) {
        throw new Error('ID or title must be provided');
      }
      let serviceId;
      if (title) {
        const serviceData = await this.db.service.findFirst({
          where: {
            title: {
              contains: title,
            },
          },
        });
        console.log('serviceData', serviceData);
        serviceId = serviceData?.id;
      }

      if (!serviceId && !id) return null;

      const service = await this.db.merchantService.findFirst({
        where: {
          ...(serviceId ? { serviceId, merchantId } : { id }),
        },
        include: {
          faqs: true,
          keyPoints: true,
          service: true,
          servicePricing: true,
          discounts: true,
          subscriptionPlans: true,
          ...(data.userId && {
            subscriptions: {
              where: {
                userId: data.userId,
              },
              include: {
                plan: true,
              },
            },
          }),
        },
      });
      console.log('service', service);

      if (!service) return null;

      const formattedService = {
        id: service.id,
        imgUrl: service.imgUrl,
        imageId: service.imageId,
        description: service.description,
        faqs: service.faqs,
        keyPoints: service.keyPoints,
        pricingMode: service.pricingMode,
        pricing: service.servicePricing,
        discounts: service.discounts,
        subscriptionPlans: service.subscriptionPlans,
        subscriptions: service.subscriptions,
        service: service.service,
        isDraft: service.isDraft,
        updatedAt: service.updatedAt,
        createdAt: service.createdAt,
      };

      return formattedService as unknown as MerchantServiceType;
    });
  }

  public async getAllByMerchant(
    slug: string,
    limit?: number
  ): Promise<{
    merchant: Prisma.MerchantGetPayload<
      Prisma.MerchantDefaultArgs<DefaultArgs>
    > | null;
    services: MerchantServiceType[] | null;
  }> {
    return this.process(async () => {
      const merchant = new Merchant();
      const merchantData = await merchant.getOne({ slug });
      if (!merchantData) throw new Error('Merchant does not exist');

      const services = await this.db.merchantService.findMany({
        where: { merchantId: merchantData.id },
        ...(limit && { take: limit }),
        include: {
          faqs: true,
          keyPoints: true,
          service: true,
          servicePricing: true,
          discounts: true,
          subscriptionPlans: true,
        },
      });

      // Map the services to the desired structure
      const formattedServices = services.map(service => ({
        id: service.id,
        imgUrl: service.imgUrl,
        description: service.description,
        faqs: service.faqs,
        keyPoints: service.keyPoints,
        pricingMode: service.pricingMode,
        pricing: service.servicePricing,
        discounts: service.discounts,
        subscriptionPlans: service.subscriptionPlans,
        service: service.service,
        isDraft: service.isDraft,
        updatedAt: service.updatedAt,
        createdAt: service.createdAt,
      }));

      return { merchant: merchantData, services: formattedServices };
    });
  }

  private validateDiscounts(
    pricing: CreateMerchantServiceParamType['pricing']
  ) {
    for (const discount of pricing.discounts) {
      if (
        (discount.value && !discount.code) ||
        (discount.code && !discount.value)
      ) {
        throw new Error('Please complete the discount inputs.');
      }
      if (discount.value && isNaN(parseInt(discount.value))) {
        throw new Error('The discount value must be a number');
      }
      if (parseInt(discount.value) < 1 || parseInt(discount.value) > 100) {
        throw new Error(
          'The discount value must be a positive number and between 1 and 100'
        );
      }
    }
  }

  private validateDataBeforeSave(
    data: CreateMerchantServiceParamType,
    imageUrl: string | undefined
  ) {
    if (!data.image.file && !imageUrl)
      throw new Error('Product image is required.');
    if (!data.description.description) {
      throw new Error('Product description is required');
    }

    if (Object.values(data.product_type).length < 2) {
      throw new Error('Please complete product type section');
    }
    if (data.faq_keypoints.keypoints.length < 3) {
      throw new Error('You should add at least 3 keypoints');
    }

    if (data.faq_keypoints.keypoints.length > 4) {
      throw new Error('You should add at most 4 keypoints');
    }
    console.log('data', data);
    if (!data.pricing?.mode) {
      throw new Error('You need to provide your pricing type!');
    }

    if (data.pricing?.mode === 'FIXED' && !data.pricing.data?.[0]?.amount) {
      throw new Error('The amount is required!');
    }

    const pricing_complete = data.pricing?.data?.every(d => d.type && d.amount);
    if (data.pricing?.mode !== 'FIXED' && !pricing_complete) {
      throw new Error('Please complete the pricing section!');
    }

    let faqCount = 0;

    for (const faq of data.faq_keypoints.faq) {
      if ((faq.question && !faq.answer) || (faq.answer && !faq.question)) {
        throw new Error(
          'Please complete the question and answer pair to proceed.'
        );
      }
      if (faq.answer && faq.question) {
        faqCount++;
      }
    }

    this.validateDiscounts(data.pricing);

    if (faqCount < 3) {
      throw new Error('At least 3 FAQs are required');
    }
  }

  private validateDataBeforeDraftSave(data: CreateMerchantServiceParamType) {
    if (Object.values(data.product_type).length < 2) {
      throw new Error(
        'Please complete product type section before saving as draft.'
      );
    }

    this.validateDiscounts(data.pricing);
  }

  private formatPlanData(data: CreateMerchantServiceParamType) {
    const serviceName = data.product_type.service_name;
    return data.pricing.data
      .flatMap(priceData => {
        let amount = priceData.amount;
        if (!amount) return;
        return data.subscriptions.map(interval => {
          const discount = data.pricing.discounts.find(
            d => d.type === interval
          );
          if (discount?.value && amount) {
            const unit = 1 - parseFloat(discount.value) / 100;

            amount *= unit;
          }
          const name = `${serviceName} - ${priceData.type} - ${interval}`;
          return {
            interval,
            name,
            amount: Math.round(amount! * 100),
            autoBrand: priceData.type || 'NONE',
          };
        });
      })
      .filter(Boolean) as PlanParams[];
  }

  private async handleImageUpload(
    data: CreateMerchantServiceParamType,
    existingProduct: MerchantServiceType | null,
    data_to_save: Prisma.MerchantServiceCreateInput
  ) {
    if (data.image.file) {
      const util = new Util();
      const folder = 'products';

      const uploadedImage = await util.upload(data.image.file, folder);
      if (!uploadedImage) {
        throw new Error('An error occurred in uploading image.');
      }

      if (existingProduct?.imgUrl) {
        const imageId = existingProduct?.imageId;
        const imageUrl = existingProduct?.imgUrl;

        const uploadId = existingProduct?.imageId
          ? `${folder}/${imageId}`
          : imageUrl;

        await util.deleteUpload({ uploadId: uploadId, imageUrl });
      }

      data_to_save.imgUrl = uploadedImage.url;
      data_to_save.imageId = uploadedImage.uploadId;
    }
  }

  private async handleFAQs(data: CreateMerchantServiceParamType) {
    const faqData = data.faq_keypoints.faq.filter(f => f.question && f.answer);

    const faq = new FAQ();
    return await faq.getOrCreateMany(faqData);
  }

  private async handleDiscounts(
    serviceId: string,
    data: CreateMerchantServiceParamType
  ) {
    const discountArr = data.pricing.discounts?.filter(
      d => d.code && d.type && d.value
    );

    if (discountArr.length) {
      const discount = new Discount();
      return await discount.getOrCreateMany(serviceId, discountArr);
    }
  }

  private async handleSubscriptionPlans(
    data: CreateMerchantServiceParamType,
    merchantServiceId: string | null = null
  ) {
    const plan = new Plan();
    console.log(this.formatPlanData(data));

    const planListItems = await plan.createOrUpdateMany(
      this.formatPlanData(data)
    );

    const planList = planListItems.map(plan => ({
      interval: plan.interval,
      code: plan.plan_code,
      autoBrand: plan.autoBrand,
    }));

    if (!merchantServiceId) return planList;

    const subscription = new SubscriptionPlan();
    return await subscription.getOrCreateMany(merchantServiceId, planList);
    // return subscriptionData;
  }

  public async handleCreate(
    merchantId: string,
    data: CreateMerchantServiceParamType,
    existingProductId: string | null,
    imageUrl: string | undefined
  ) {
    this.validateDataBeforeSave(data, imageUrl);

    let existingProduct: MerchantServiceType | null = null;
    if (existingProductId) {
      existingProduct = await this.getOne({ id: existingProductId });
    }

    let data_to_save: Prisma.MerchantServiceCreateInput = {};

    await this.handleImageUpload(data, existingProduct, data_to_save);

    const parent_data = {
      type: data.product_type.service_type,
      title: data.product_type.service_name,
    } as Prisma.ServiceCreateInput;

    const faqs = await this.handleFAQs(data);

    const KeyPoint = new ServiceKeypoint();
    const keypoints = await KeyPoint.getOrCreateMany(
      data.faq_keypoints.keypoints
    );

    const planList = await this.handleSubscriptionPlans(
      data,
      existingProductId
    );

    data_to_save = {
      ...data_to_save,
      description: data.description.description,
      isDraft: false,
      pricingMode: data.pricing.mode,
    };

    if (existingProduct) {
      let pricing: string[] = [];

      if (data.pricing?.data?.length) {
        const servicePricing = new ServicePricing();
        pricing = await servicePricing.getOrCreateMany(
          data.pricing,
          existingProduct.id
        );
      }

      const discountData = await this.handleDiscounts(existingProductId!, data);
      return await this.update(
        existingProduct.id,
        data_to_save,
        keypoints,
        faqs,
        discountData,
        planList as string[],
        pricing
      );
    }

    return await this.create(
      merchantId,
      parent_data,
      data_to_save,
      keypoints,
      faqs,
      data.pricing.discounts?.filter(d => d.code && d.type && d.value),
      planList as { interval: SubscriptionPlanDuration; code: string }[],
      data.pricing
    );
  }

  public async saveDraft(
    merchantId: string,
    data: CreateMerchantServiceParamType,
    existingProductId: string | null
  ) {
    console.log('data', data.pricing.data);
    this.validateDataBeforeDraftSave(data);
    let existingProduct: MerchantServiceType | null = null;

    if (existingProductId) {
      existingProduct = await this.getOne({ id: existingProductId });
    } else {
      existingProduct = await this.getOne({
        title: data.product_type.service_name,
        merchantId,
      });
    }

    const data_to_save = { isDraft: true } as Prisma.MerchantServiceCreateInput;
    await this.handleImageUpload(data, existingProduct, data_to_save);

    const parent_data = {
      type: data.product_type.service_type,
      title: data.product_type.service_name,
    } as Prisma.ServiceCreateInput;

    let faqs: string[] = [];
    if (data.faq_keypoints.faq.length) {
      faqs = await this.handleFAQs(data);
    }

    let keypoints: string[] = [];
    if (data.faq_keypoints.keypoints.length) {
      const KeyPoint = new ServiceKeypoint();
      keypoints = await KeyPoint.getOrCreateMany(data.faq_keypoints.keypoints);
    }

    let pricing: string[] = [];
    if (data.pricing?.data?.length && existingProduct) {
      const servicePricing = new ServicePricing();
      pricing = await servicePricing.getOrCreateMany(
        data.pricing,
        existingProduct.id
      );
    }

    const planList = await this.handleSubscriptionPlans(
      data,
      existingProductId
    );

    data_to_save.description = data.description.description || '';
    data_to_save.pricingMode = data.pricing.mode || 'FIXED';

    if (existingProduct) {
      const discountData = await this.handleDiscounts(existingProductId!, data);

      return await this.update(
        existingProduct.id,
        data_to_save,
        keypoints,
        faqs,
        discountData,
        planList as string[],
        // subscriptionData,
        pricing
      );
    }

    let pricingData: CreateMerchantServiceParamType['pricing'] | undefined =
      undefined;
    if (data.pricing?.mode && data.pricing?.data?.length) {
      pricingData = data.pricing;
    }

    return await this.create(
      merchantId,
      parent_data,
      data_to_save,
      keypoints,
      faqs,
      data.pricing.discounts?.filter(d => d.code && d.type && d.value),
      planList as { interval: SubscriptionPlanDuration; code: string }[],
      pricingData
    );
  }

  //   public async addToMerchant() {
  //     return this.process(async () => {
  //       return await this.db.merchantService.update({

  //       });
  //     });
  //   }
}
