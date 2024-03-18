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
    return (await this.post(this.endpoint, data)) as PageResponse;
  }

  public async update(
    data: {
      name: string;
      description: string;
      amount: number;
    },
    id_or_slug: string
  ) {
    return (await this.put(
      `${this.endpoint}/${id_or_slug}`,
      data
    )) as PageResponse;
  }

  public async getOne(id_or_slug: string) {
    return (await this.get(`${this.endpoint}/${id_or_slug}`)) as PageResponse;
  }

  public async list() {
    return (await this.get(this.endpoint)) as PageListResponse;
  }
}
