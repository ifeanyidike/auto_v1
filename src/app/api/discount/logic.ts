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

  public async update(id: string, data: Prisma.DiscountUpdateInput) {
    return this.process(async () => {
      return await this.db.discount.update({ where: { id }, data });
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

  public async getManyByMerchant(merchantId: string, limit?: number) {
    return this.process(async () => {
      return await this.db.discount.findMany({
        where: { merchantId },
        ...(limit && { take: limit }),
        include: {
          services: {
            include: {
              service: true,
              subscriptionPlans: true,
              servicePricing: true,
            },
          },
          plans: true,
        },
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

  public async getManyByMerchantAndCode(
    data: Record<'code' | 'merchantId', string>[]
  ) {
    const result = await Promise.all(
      data.map(d =>
        this.process(async () => {
          return this.db.discount.findFirst({
            where: { ...d },
          });
        })
      )
    );
    return result.filter(Boolean);
  }

  public async findItem(
    data: Record<'code' | 'type' | 'merchantServiceId', string>[]
  ) {
    return await Promise.all(
      data.map(d =>
        this.process(async () => {
          return await this.db.discount.findFirst({
            where: { ...d },
          });
        })
      )
    );
  }

  public async getOrCreateMany(
    serviceId: string,
    data: Record<'code' | 'value' | 'type', string>[]
  ) {
    return await Promise.all(
      data.map(async d => {
        const discount = await this.findItem({
          code: d.code,
          type: d.type,
          merchantServiceId: serviceId,
        });

        if (discount && discount.value !== d.value) {
          await this.update(discount.id, { value: d.value });
        }
        if (discount) return discount.id;
        const discount_data = await this.create({ ...d });
        return discount_data.id;
      })
    );
  }

  public async getExpiredDiscounts() {
    return this.process(async () => {
      return await this.db.discount.findMany({
        where: {
          expiresOn: {
            lte: new Date(),
          },
        },
        include: {
          merchant: true,
          services: {
            include: {
              service: true,
              subscriptionPlans: true,
              servicePricing: true,
            },
          },
          plans: {
            include: {
              subscription: {
                include: {
                  user: true,
                  merchantService: {
                    include: {
                      service: true,
                    },
                  },
                },
              },
              merchantService: {
                include: {
                  servicePricing: true,
                },
              },
            },
          },
        },
      });
    });
  }

  public async deleteExpiredDiscounts() {
    return this.process(async () => {
      return await this.db.discount.deleteMany({
        where: {
          expiresOn: {
            lte: new Date(),
          },
        },
      });
    });
  }
}
