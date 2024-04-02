import {
  type PlanResponse,
  type UpdateResponse,
  type PlanListResponse,
  type PlanParams,
  PlanResponseData,
} from '~/types/payment';
import { Utility } from './utility';
import Discount from '~/app/api/discount/logic';
import SubscriptionPlan from '~/app/api/subscription_plan/logic';

export class Plan extends Utility {
  private endpoint = this.baseEndpoint + '/plan';

  public async create(
    interval: PlanParams['interval'],
    name: PlanParams['name'],
    amount: PlanParams['amount']
  ) {
    return (await this.post(this.endpoint, {
      name,
      amount,
      interval,
    })) as PlanResponse;
  }

  public async update(
    id_or_code: string,
    data: Partial<Omit<PlanParams, 'interval'>>
  ) {
    return (await this.put(
      `${this.endpoint}/${id_or_code}`,
      data
    )) as UpdateResponse;
  }

  public async getOne(id_or_code: string) {
    return (await this.get(`${this.endpoint}/${id_or_code}`)) as PlanResponse;
  }

  public async listAll() {
    return (await this.get(
      this.endpoint + '?perPage=100000'
    )) as PlanListResponse;
  }

  public async createOrUpdateMany(data: PlanParams[]) {
    const plans = await this.listAll();

    console.log('plans', plans, '\n');
    return (await Promise.all(
      data.map(async d => {
        const plan = plans.data.find(
          p => !p.is_deleted && p.interval === d.interval && p.name === d.name
        );

        if (!plan) {
          const result = await this.create(d.interval, d.name, d.amount);
          return { ...result.data, autoBrand: d.autoBrand };
        }

        const subscriptionPlanClient = new SubscriptionPlan();
        const subscriptionPlan = await subscriptionPlanClient.getOneByCode(
          plan.plan_code
        );
        const discount = subscriptionPlan?.discount;
        const amount = this.updateAmountByDiscount(discount, d.amount);

        if (plan.amount !== d.amount) {
          await this.update(plan.plan_code, {
            amount,
            name: d.name,
          });
        }
        return { ...plan, autoBrand: d.autoBrand };
      })
    )) as (PlanResponseData & { autoBrand: string })[];
  }

  private updateAmountByDiscount(
    discount: Record<'type' | 'value', string> | undefined | null,
    amount: number
  ) {
    if (!discount) return amount;
    if (discount.type === 'percentage') {
      const unit = 1 - parseFloat(discount.value) / 100;
      return amount * unit;
    }
    return amount - parseFloat(discount.value) * 100;
  }

  public async updatePlansAmount(data: { code: string; amount: number }[]) {
    return await Promise.all(
      data.map(async d => {
        return await this.update(d.code, {
          amount: d.amount,
        });
      })
    );
  }
}
