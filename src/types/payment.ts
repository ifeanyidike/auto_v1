export type SubscriptionPlanDuration =
  | 'monthly'
  | 'quarterly'
  | 'biannually'
  | 'annually';

export type PlanParams = {
  interval: SubscriptionPlanDuration;
  name: string;
  amount: number;
  autoBrand: string;
};

export type SubscriptionResponse = {
  customer: number;
  plan: number;
  integration: number;
  domain: string;
  start: number;
  status: 'complete';
  quantity: number;
  amount: number;
  subscription_code: string;
  email_token: string;
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string;
  };
  cron_expression: string;
  next_payment_date: Date;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PlanResponseData = {
  subscriptions?: SubscriptionResponse[];
  description?: string | null;
  name: string;
  amount: number;
  interval: SubscriptionPlanDuration;
  integration: number;
  domain: string;
  plan_code: string;
  send_invoices: boolean;
  send_sms: boolean;
  hosted_page: boolean;
  is_deleted: boolean;
  is_archived: boolean;
  currency: 'NGN';
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
export type PlanResponse = {
  status: boolean;
  message: 'Plan created' | 'Plan retrieved';
  data: PlanResponseData;
};

export type PlanListResponse = {
  status: boolean;
  message: 'Plans retrieved';
  data: PlanResponseData[];
};

export type UpdateResponse = {
  status: true;
  message: string;
};

export type PageResponseData = {
  name: string;
  description: string;
  amount: number;
  split_code?: string;
  integration: number;
  plan?: number;
  domain: string;
  slug: string;
  currency: 'NGN';
  type?: string;
  collect_phone?: boolean;
  active: boolean;
  published?: boolean;
  migrate: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PageResponse = {
  status: boolean;
  message: 'Page created' | 'Page retrieved' | 'Page updated';
  data: PageResponseData;
};

export type PageListResponse = {
  status: boolean;
  message: 'Pages retrieved';
  data: PageResponseData[];
};

export type TransactionInitializationResponse = {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export type TransactionDataResponse = {
  status: boolean;
  message: 'Verification successful' | 'Charge attempted' | 'Invalid key';
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    gateway_response: string;
    channel: string;
    currency: string;
    fees: number;
    transaction_date?: Date;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: true;
      signature: string;
    };
    customer: {
      id: number;
      email: string;
      customer_code: string;
    };
    plan: string | null;
    plan_object: {
      id: number;
      name: string;
      plan_code: string;
      description: string;
      amount: number;
      interval: 'monthly' | 'quarterly' | 'biannually' | 'annually';
      send_invoices: boolean;
      send_sms: boolean;
      currency: 'NGN';
    } | null;
    paidAt?: Date;
    createdAt?: Date;
  };
};

export type TransactionTotalResponse = {
  status: boolean;
  message: 'Transaction totals';
  data: {
    total_transactions: number;
    unique_customers: number;
    total_volume: number;
    total_volume_by_currency: [
      {
        currency: 'NGN';
        amount: number;
      },
    ];
    pending_transfers: number;
    pending_transfers_by_currency: [
      {
        currency: 'NGN';
        amount: number;
      },
    ];
  };
};

export type TransactionList = {
  status: boolean;
  message: 'Transactions retrieved';
  data: [
    {
      id: number;
      status: 'success' | 'failed';
      reference: string;
      amount: number;
      message: string | null;
      gateway_response: string;
      paid_at: Date;
      created_at: Date;
      channel: string;
      currency: 'NGN';
      ip_address: '102.215.57.116';
      fees: number;
      customer: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        customer_code: string;
      };
      paidAt: Date;
      createdAt: Date;
      requested_amount: number;
    },
  ];
};
