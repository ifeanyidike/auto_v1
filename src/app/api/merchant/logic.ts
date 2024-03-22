import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export type MerchantType = Prisma.MerchantGetPayload<{
  include: {
    miscellanous: true;
    apiKeys: true;
  };
}>;
export default class Merchant extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.MerchantCreateInput) {
    return this.process(async () => {
      return await this.db.merchant.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.merchant.delete({ where: { id } });
    });
  }

  public async update(id: string, data: Prisma.MerchantUpdateInput) {
    return this.process(async () => {
      return await this.db.merchant.update({ where: { id }, data });
    });
  }

  public async getOne(data: {
    id?: string;
    slug?: string;
  }): Promise<MerchantType | null> {
    const { id, slug } = data || {};
    return this.process(async () => {
      if (!id && !slug) throw new Error('Either id or slug must be provided');
      return await this.db.merchant.findFirst({
        where: { ...(slug ? { slug } : { id }) },
        include: {
          miscellanous: true,
          apiKeys: true,
        },
      });
    });
  }

  public async getAll(limit?: number) {
    return this.process(async () => {
      return await this.db.merchant.findMany({
        ...(limit && { take: limit }),
      });
    });
  }
}
