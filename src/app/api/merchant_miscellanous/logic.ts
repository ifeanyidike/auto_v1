import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class MerchantMiscellanous extends Utility {
  constructor() {
    super();
  }

  public async create(location: string, cost: string, merchantId: string) {
    return this.process(async () => {
      return await this.db.merchantMiscellanous.create({
        data: {
          location,
          cost,
          merchant: {
            connect: {
              id: merchantId,
            },
          },
        },
      });
    });
  }

  // public async createMany(
  //   data: Record<'location' | 'cost' | 'merchantId', string>[]
  // ) {
  //   return this.process(async () => {
  //     return await this.db.merchantMiscellanous.createMany({
  //       data,
  //     });
  //   });
  // }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.merchantMiscellanous.delete({ where: { id } });
    });
  }

  public async update(
    id: string,
    data: Prisma.MerchantMiscellanousUpdateInput
  ) {
    return this.process(async () => {
      return await this.db.merchantMiscellanous.update({ where: { id }, data });
    });
  }

  public async getMany(merchantId: string, limit?: number) {
    return this.process(async () => {
      return await this.db.merchantMiscellanous.findMany({
        where: { merchantId },
        ...(limit && { take: limit }),
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.merchantMiscellanous.findFirst({ where: { id } });
    });
  }
}
