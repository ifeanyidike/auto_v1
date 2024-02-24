import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class Discount extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.DiscountCreateInput) {
    return this.process(async () => {
      return await this.db.discount.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.discount.delete({ where: { id } });
    });
  }

  public async getMany(limit?: number) {
    return this.process(async () => {
      return await this.db.discount.findMany({
        ...(limit && { take: limit }),
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.discount.findFirst({ where: { id } });
    });
  }

  public async getManyByData(
    data: Record<'code' | 'value' | 'type', string>[]
  ) {
    return this.process(async () => {
      return await Promise.all(
        data.map(d =>
          this.db.discount.findFirst({
            where: { ...d },
          })
        )
      );
    });
  }

  public async findItem(data: Record<'code' | 'value' | 'type', string>) {
    return this.process(async () => {
      return await this.db.discount.findFirst({
        where: { ...data },
      });
    });
  }

  public async getOrCreateMany(
    data: Record<'code' | 'value' | 'type', string>[]
  ) {
    return await Promise.all(
      data.map(async d => {
        const discount = await this.findItem(d);
        if (discount) return discount.id;
        const discount_data = await this.create({ ...d });
        return discount_data.id;
      })
    );
  }
}
