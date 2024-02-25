import axios from 'axios';
import { Utility } from './utility';
import { type PageListResponse, type PageResponse } from '~/types/payment';

type PageParam = {
  slug?: string;
  name: string;
  description: string;
  amount?: number;
  redirect_url: string;
  metadata: {
    logo: string;
  };
};
export class Page extends Utility {
  private endpoint = this.baseEndpoint + '/page';

  public async create(data: PageParam) {
    return this.process(async () => {
      const response = await axios.post(
        `${this.endpoint}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${this.gateway_secret}`,
          },
        }
      );
      return response.data as PageResponse;
    });
  }

  public async update(
    data: {
      name: string;
      description: string;
      amount: number;
    },
    id_or_slug: string
  ) {
    return this.process(async () => {
      const response = await axios.put(
        `${this.endpoint}/${id_or_slug}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${this.gateway_secret}`,
          },
        }
      );
      return response.data as PageResponse;
    });
  }

  public async getOne(id_or_slug: string) {
    return this.process(async () => {
      const response = await axios.get(`${this.endpoint}/${id_or_slug}`, {
        headers: {
          Authorization: `Bearer ${this.gateway_secret}`,
        },
      });
      return response.data as PageResponse;
    });
  }

  public async list() {
    return this.process(async () => {
      const response = await axios.get(`${this.endpoint}`, {
        headers: {
          Authorization: `Bearer ${this.gateway_secret}`,
        },
      });
      return response.data as PageListResponse;
    });
  }
}
