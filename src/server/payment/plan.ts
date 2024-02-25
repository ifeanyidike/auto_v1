import axios from 'axios';
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
    return this.process(async () => {
      const response = await axios.post(
        `${this.endpoint}`,
        {
          name,
          amount,
          interval,
        },
        {
          headers: {
            Authorization: `Bearer ${this.gateway_secret}`,
          },
        }
      );
      return response.data as PlanResponse;
    });
  }

  public async update(id: number, data: Partial<Omit<PlanParams, 'interval'>>) {
    return this.process(async () => {
      const response = await axios.put(
        `${this.endpoint}/${id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${this.gateway_secret}`,
          },
        }
      );
      return response.data as UpdateResponse;
    });
  }

  public async getOne(id_or_code: string) {
    return this.process(async () => {
      const response = await axios.get(`${this.endpoint}/${id_or_code}`, {
        headers: {
          Authorization: `Bearer ${this.gateway_secret}`,
        },
      });
      return response.data as PlanResponse;
    });
  }

  public async listAll() {
    return this.process(async () => {
      const response = await axios.get(`${this.endpoint}`, {
        headers: {
          Authorization: `Bearer ${this.gateway_secret}`,
        },
      });
      return response.data as PlanListResponse;
    });
  }

  public async createOrUpdateMany(data: PlanParams[]) {
    const plans = await this.listAll();

    return await Promise.all(
      data.map(async d => {
        const plan = plans.data.find(p => p.interval === d.interval);

        if (!plan) {
          const result = await this.create(d.interval, d.name, d.amount);
          return result.data;
        }
        if (plan.amount !== d.amount) {
          await this.update(plan.id, d);
        }
        return plan;
      })
    );
  }
}
