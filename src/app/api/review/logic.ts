import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class Review extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.ReviewCreateInput) {
    return this.process(async () => {
      return await this.db.review.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.review.delete({ where: { id } });
    });
  }

  public async update(id: string, data: Prisma.ReviewUpdateInput) {
    return this.process(async () => {
      return await this.db.review.update({
        where: { id },
        data,
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.review.findUnique({
        where: { id },
      });
    });
  }

  public async findByMerchant(merchantId: string) {
    return this.process(async () => {
      return await this.db.review.findMany({
        where: { merchantId },
        include: {
          user: true,
        },
      });
    });
  }
}
