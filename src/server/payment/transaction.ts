import { Utility } from './utility';
import {
  type TransactionDataResponse,
  type TransactionInitializationResponse,
} from '~/types/payment';
import PaymentAuthorization from '~/app/api/payment_authorization/logic';

export class Transaction extends Utility {
  private endpoint = this.baseEndpoint + '/transaction';

  public async initialize(
    email: string,
    amount: number,
    plan: string | null = null,
    callback_url: string,
    card_payment = false
  ) {
    const body: Record<string, unknown> = { email, amount, callback_url };
    if (plan) body.plan = plan;
    if (card_payment) {
      body.channels = ['card'];
    }
    const data = await this.post(`${this.endpoint}/initialize`, body);
    return data as TransactionInitializationResponse;
  }

  private formatAuthorizationData(response: TransactionDataResponse) {
    const data = response.data.authorization;
    return {
      authorization_code: data.authorization_code,
      bin: data.bin,
      last4: data.last4,
      exp_month: data.exp_month,
      exp_year: data.exp_year,
      card_type: data.card_type,
      channel: data.channel,
      bank: data.bank,
      reusable: data.reusable,
      brand: data.brand,
      signature: data.signature,
    } as TransactionDataResponse['data']['authorization'];
  }

  public async verify(userId: string, reference: string) {
    return await this.get(
      `${this.endpoint}/verify/${reference}`,
      async (response: TransactionDataResponse) => {
        const authorization = new PaymentAuthorization();
        const authorization_data = this.formatAuthorizationData(response);
        await authorization.add(userId, authorization_data);
        return response.message;
      }
    );
  }

  public async charge_authorization(
    userId: string,
    email: string,
    amount: string,
    authorization_code: string
  ) {
    return await this.post(
      `${this.endpoint}/charge_authorization`,
      { email, amount, authorization_code },
      async (response: TransactionDataResponse) => {
        const authorization = new PaymentAuthorization();
        const authorization_data = this.formatAuthorizationData(response);
        await authorization.add(userId, authorization_data);
        return response.message;
      }
    );
  }
}
