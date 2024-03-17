import {
  type PlanResponse,
  type UpdateResponse,
  type PlanListResponse,
  type PlanParams,
} from '~/types/payment';
import { Utility } from './utility';

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
    return await Promise.all(
      data.map(async d => {
        const plan = plans.data.find(
          p => !p.is_deleted && p.interval === d.interval && p.name === d.name
        );

        if (!plan) {
          const result = await this.create(d.interval, d.name, d.amount);
          return { ...result.data, autoBrand: d.autoBrand };
        }
        if (plan.amount !== d.amount) {
          await this.update(plan.plan_code, {
            amount: d.amount,
            name: d.name,
          });
        }
        return { ...plan, autoBrand: d.autoBrand };
      })
    );
  }
}
