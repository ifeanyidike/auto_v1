import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
// import Service from './service';

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

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.merchantService.findUnique({
        where: { id },
      });
    });
  }

  //   public async addToMerchant() {
  //     return this.process(async () => {
  //       return await this.db.merchantService.update({

  //       });
  //     });
  //   }
}
