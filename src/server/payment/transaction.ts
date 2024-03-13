import { Utility } from './utility';
import {
  type TransactionDataResponse,
  type TransactionInitializationResponse,
} from '~/types/payment';
import PaymentAuthorization from '~/app/api/payment_authorization/logic';
import Subscription from '~/app/api/subscription/logic';
import SubscriptionPlan from '~/app/api/subscription_plan/logic';
import SubscriptionFulfillment from '~/app/api/subscription_fulfillment/logic';

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

  private getNextCycleStartDate(
    interval: 'monthly' | 'quarterly' | 'biannually' | 'annually'
  ) {
    let cycle = 1;
    if (interval === 'quarterly') {
      cycle = 3;
    } else if (interval === 'biannually') {
      cycle = 6;
    } else if (interval === 'annually') {
      cycle = 12;
    }

    const currentDate = new Date();
    const nextCycle = new Date(currentDate);
    nextCycle.setDate(currentDate.getMonth() + cycle);
    return nextCycle;
  }

  public async verify(
    userId: string,
    reference: string,
    subscriptionData: Record<'merchantId' | 'serviceId', string> | null = null
  ) {
    return (await this.get(
      `${this.endpoint}/verify/${reference}`,
      async (response: TransactionDataResponse) => {
        console.log('response', response);
        const authorization = new PaymentAuthorization();
        const authorization_data = this.formatAuthorizationData(response);
        await authorization.add(userId, authorization_data);

        if (response.data.plan && subscriptionData) {
          const subscriptionPlan = new SubscriptionPlan();
          const plan = await subscriptionPlan.getOneByCode(response.data.plan);

          if (plan) {
            const subscription = new Subscription();
            const newSubscription = await subscription.create(
              subscriptionData.serviceId,
              subscriptionData.merchantId,
              plan.id,
              userId
            );

            const nextCycleStarts = this.getNextCycleStartDate(
              plan.interval as
                | 'monthly'
                | 'quarterly'
                | 'biannually'
                | 'annually'
            );

            const subscriptionFuilfillment = new SubscriptionFulfillment();
            await subscriptionFuilfillment.create(newSubscription.id, {
              nextCycleStarts,
              isPaid: true,
              paidOn: new Date(),
              amountPaid: response.data.amount,
            });
          }
        }
        return response;
      }
    )) as TransactionDataResponse;
  }

  public async charge_authorization(
    userId: string,
    email: string,
    amount: string,
    authorization_code: string
  ) {
    return (await this.post(
      `${this.endpoint}/charge_authorization`,
      { email, amount, authorization_code },
      async (response: TransactionDataResponse) => {
        const authorization = new PaymentAuthorization();
        const authorization_data = this.formatAuthorizationData(response);
        await authorization.add(userId, authorization_data);
        return response;
      }
    )) as TransactionDataResponse;
  }
}
