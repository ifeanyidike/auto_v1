import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export type PlanByMerchant = Prisma.SubscriptionPlanGetPayload<{
  include: {
    subscription: {
      include: {
        merchantService: {
          include: {
            service: true;
            discounts: true;
          };
        };
        plan: true;
        fufillments: true;
        user: true;
      };
    };
    merchantService: {
      include: {
        discounts: {
          select: {
            code: true;
            value: true;
            type: true;
          };
        };
        servicePricing: {
          select: {
            id: true;
            mode: true;
            type: true;
            amount: true;
          };
        };
        service: {
          select: {
            title: true;
            type: true;
          };
        };
      };
    };
  };
}>;
export default class SubscriptionPlan extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.SubscriptionPlanCreateInput) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.create({ data });
    });
  }

  public async update(id: string, data: Prisma.SubscriptionPlanUpdateInput) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.update({ where: { id }, data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.delete({ where: { id } });
    });
  }

  public async getMany(limit?: number) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.findMany({
        ...(limit && { take: limit }),
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.findFirst({ where: { id } });
    });
  }

  public async getOneByCode(code: string) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.findFirst({
        where: { code },
        include: { discount: true },
      });
    });
  }

  public async getManyByData(data: Record<'code' | 'interval', string>[]) {
    return this.process(async () => {
      return await Promise.all(
        data.map(item =>
          this.db.subscriptionPlan.findFirst({
            where: { ...item },
          })
        )
      );
    });
  }

  public async listByMerchantService(merchantServiceId: string) {
    return this.process(async () =>
      this.db.subscriptionPlan.findMany({
        where: {
          merchantServiceId,
        },
        include: {
          merchantService: {
            include: {
              discounts: {
                select: {
                  code: true,
                  value: true,
                  type: true,
                },
              },
              servicePricing: {
                select: {
                  id: true,
                  mode: true,
                  type: true,
                  amount: true,
                },
              },
              service: {
                select: {
                  title: true,
                  type: true,
                },
              },
            },
          },
        },
      })
    );
  }

  public async listByMerchant(merchantId: string) {
    return this.process(async () => {
      const data = await this.db.subscriptionPlan.findMany({
        where: {
          merchantId,
        },
        include: {
          subscription: {
            include: {
              merchantService: {
                include: {
                  service: true,
                  discounts: true,
                },
              },
              user: true,
              plan: true,
              fufillments: true,
            },
          },
          merchantService: {
            include: {
              discounts: {
                select: {
                  code: true,
                  value: true,
                  type: true,
                },
              },
              servicePricing: {
                select: {
                  id: true,
                  mode: true,
                  type: true,
                  amount: true,
                },
              },
              service: {
                select: {
                  title: true,
                  type: true,
                },
              },
            },
          },
        },
      });

      return data;
    });
  }

  public async findItem(
    item: Record<'code' | 'interval' | 'merchantServiceId', string>
  ) {
    return this.process(async () => {
      return await this.db.subscriptionPlan.findFirst({
        where: { ...item },
      });
    });
  }

  public async getOrCreateMany(
    merchantServiceId: string,
    data: Record<'code' | 'interval' | 'autoBrand', string>[]
  ) {
    console.log('planList', data);

    return await Promise.all(
      data.map(async item => {
        console.log({ ...item, merchantServiceId });
        const plan = await this.findItem({
          code: item.code,
          interval: item.interval,
          merchantServiceId,
        });

        if (plan) {
          await this.update(plan.id, { autoBrand: item.autoBrand });
        }

        if (plan) return plan.id;

        const subscriptionPlan = await this.create(item);
        return subscriptionPlan.id;
      })
    );
  }
}
