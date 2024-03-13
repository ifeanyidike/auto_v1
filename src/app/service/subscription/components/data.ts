export type ServicePricing = {
  id: string;
  merchantServiceId: string | null;
  mode: string;
  type: string | null;
  amount: any;
  createdAt: Date;
  updatedAt: Date;
};

export type Discount = {
  code: string;
  value: string;
  type: string;
};

export type Plan = {
  id: string;
  interval: string;
  code: string;
  autoBrand: string;
  merchantServiceId: string | null;
  merchantService: {
    id: string;
    description: string | null;
    pricingMode: string;
    discounts: Discount[];
    servicePricing: ServicePricing[];
  } | null;
};

export const monthly = [
  'Revitalize your ride monthly! Join now for exclusive benefits and savings.',
  'Drive with confidence every month. Subscribe for seamless maintenance and savings.',
  'Unlock monthly perks. Subscribe for a hassle-free journey and special discounts.',
  'Experience continuous care. Monthly subscription for peak performance and convenience.',
];
export const quarterly = [
  'Accelerate with quarterly mastery. Subscribe for precision diagnostics and elite savings.',
  'Every quarter, revamp your ride. Subscribe for expert care and exclusive perks.',
  'Drive confidently, quarterly. Subscribe for proactive service and substantial savings.',
  'Quarterly excellence awaits. Subscribe now for tailored diagnostics and premium savings.',
  'Experience the road anew every quarter. Subscribe for dynamic service and savings.',
  'Quarterly auto care mastery. Subscribe for personalized service and remarkable savings.',
];
export const biannually = [
  'Biannual brilliance! Subscribe for comprehensive care and substantial savings every six months.',
  'Twice the care, half the hassle. Subscribe biannually for unparalleled benefits.',
  'Drive assured every six months. Subscribe for biannual excellence and exclusive perks.',
  'Biannual renewal for your ride. Subscribe now for top-notch service and savings.',
];
export const annually = [
  'Year-round excellence. Subscribe annually for consistent care and significant savings.',
  'Ride confidently all year. Subscribe annually for uninterrupted service and exclusive perks.',
  'Annual auto mastery. Subscribe now for a year of exceptional care and savings.',
  'Maximize savings, drive confidently. Subscribe annually for unbeatable service and benefits.',
];
