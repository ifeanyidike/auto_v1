import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import Merchant from '../merchant/logic';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import { type CreateMerchantServiceParamType } from '~/types/utils';
import Util from '~/server/utils';
import FAQ from '../faq/logic';
import ServiceKeypoint from '../service_keypoint/logic';
import ServicePricing from '../service_pricing/logic';
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
        },
      });

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
        service: service.service,
        isDraft: service.isDraft,
        updatedAt: service.updatedAt,
        createdAt: service.createdAt,
      };

      return formattedService as MerchantServiceType;
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
        service: service.service,
        isDraft: service.isDraft,
        updatedAt: service.updatedAt,
        createdAt: service.createdAt,
      }));

      return { merchant: merchantData, services: formattedServices };
    });
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

    const util = new Util();
    const folder = 'products';

    if (data.image.file) {
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
      data_to_save.imgUrl = uploadedImage?.url;
      data_to_save.imageId = uploadedImage?.uploadId;
    }

    const parent_data = {
      type: data.product_type.service_type,
      title: data.product_type.service_name,
    } as Prisma.ServiceCreateInput;

    const faqData = data.faq_keypoints.faq.filter(f => f.question && f.answer);

    const faq = new FAQ();
    const faqs = await faq.getOrCreateMany(faqData);

    const KeyPoint = new ServiceKeypoint();
    const keypoints = await KeyPoint.getOrCreateMany(
      data.faq_keypoints.keypoints
    );

    data_to_save = {
      ...data_to_save,
      description: data.description.description,
      isDraft: false,
      pricingMode: data.pricing.mode,
    };

    // const data_to_save = {
    //   imgUrl: uploadedImage?.url,
    //   imageId: uploadedImage?.uploadId,
    //   description: data.description.description,
    //   isDraft: false,
    //   pricingMode: data.pricing.mode,
    // } as Prisma.MerchantServiceCreateInput;

    if (existingProduct) {
      let pricing: string[] = [];

      if (data.pricing?.data?.length) {
        const servicePricing = new ServicePricing();
        pricing = await servicePricing.getOrCreateMany(
          data.pricing,
          existingProduct.id
        );
      }
      return await this.update(
        existingProduct.id,
        data_to_save,
        keypoints,
        faqs,
        pricing
      );
    }

    return await this.create(
      merchantId,
      parent_data,
      data_to_save,
      keypoints,
      faqs,
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

    // if (existingProduct && !existingProduct?.isDraft) {
    //   throw new Error(
    //     `Product "${data.product_type.service_name}" is already saved!`
    //   );
    // }

    const data_to_save = { isDraft: true } as Prisma.MerchantServiceCreateInput;

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

    const parent_data = {
      type: data.product_type.service_type,
      title: data.product_type.service_name,
    } as Prisma.ServiceCreateInput;

    let faqs: string[] = [];

    if (data.faq_keypoints.faq.length) {
      const faqData = data.faq_keypoints.faq.filter(
        f => f.question && f.answer
      );

      const faq = new FAQ();
      faqs = await faq.getOrCreateMany(faqData);
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

    data_to_save.description = data.description.description || '';
    data_to_save.pricingMode = data.pricing.mode || 'FIXED';

    if (existingProduct) {
      return await this.update(
        existingProduct.id,
        data_to_save,
        keypoints,
        faqs,
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
