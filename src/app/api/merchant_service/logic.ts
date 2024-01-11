import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import Merchant from '../merchant/logic';
import { type DefaultArgs } from '@prisma/client/runtime/library';
// import Service from './service';

export type MerchantServiceType = {
  id: string;
  imgUrl: string | null;
  faqs: Prisma.FAQGetPayload<Prisma.FAQDefaultArgs<DefaultArgs>>[];
  keyPoints: Prisma.ServiceKeyPointGetPayload<
    Prisma.ServiceKeyPointDefaultArgs<DefaultArgs>
  >[];
  service: Prisma.ServiceGetPayload<
    Prisma.ServiceDefaultArgs<DefaultArgs>
  > | null;
};

export default class MerchantService extends Utility {
  constructor() {
    super();
  }

  public async create(
    merchantId: string,
    keypoints: string[],
    parent_data: Prisma.ServiceCreateInput,
    data: Prisma.MerchantServiceCreateInput
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
          keyPoints: {
            connect: keypoints.map(k => ({ id: k })),
          },
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
    keyPoints?: string[]
  ) {
    return this.process(async () => {
      return await this.db.merchantService.update({
        where: { id },
        data: {
          ...data,
          ...(keyPoints && {
            keyPoints: { connect: keyPoints.map(k => ({ id: k })) },
          }),
        },
      });
    });
  }

  public async getOne(data: { id?: string; title?: string }) {
    const { id, title } = data;
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
        serviceId = serviceData?.id;
      }

      const service = await this.db.merchantService.findFirst({
        where: { ...(serviceId ? { serviceId } : { id }) },
        include: {
          faqs: true,
          keyPoints: true,
          service: true,
        },
      });

      if (!service) return null;

      const formattedService = {
        id: service.id,
        imgUrl: service.imgUrl,
        faqs: service.faqs,
        keyPoints: service.keyPoints,
        service: service.service,
      };

      return formattedService;
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
        },
      });

      // Map the services to the desired structure
      const formattedServices = services.map(service => ({
        id: service.id,
        imgUrl: service.imgUrl,
        faqs: service.faqs,
        keyPoints: service.keyPoints,
        service: service.service,
      }));

      return { merchant: merchantData, services: formattedServices };
    });
  }

  //   public async addToMerchant() {
  //     return this.process(async () => {
  //       return await this.db.merchantService.update({

  //       });
  //     });
  //   }
}
