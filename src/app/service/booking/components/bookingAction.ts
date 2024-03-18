'use server';

import { headers } from 'next/headers';
import Auth0 from '~/server/auth0';
import { Transaction } from '~/server/payment/transaction';
import { type ItemData } from './DataView';
import Booking from '~/app/api/booking/logic';
import Util from '~/server/utils';
import Merchant from '~/app/api/merchant/logic';
import { z } from 'zod';

const schema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Invalid amount',
      required_error: 'Amount is required',
    })
    .positive(),
  items: z.string().array().nonempty({
    message: 'Items cannot be empty!',
  }),
  serviceId: z.string({ required_error: 'Service is required' }),
});

export async function bookService(data: ItemData, payNow: boolean = true) {
  const validatedFields = schema.safeParse({
    amount: data.amount,
    items: data.items?.map(itm => itm.id),
    location: data.customLocation || data.location,
    serviceId: data.serviceId,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const headersList = headers();
  const hostname = headersList.get('host');
  const user = await Auth0.getSessionUser();

  if (!user) {
    return {
      errors: {
        unauthenticated: ["Please make sure you're logged in"],
      },
    };
  }

  const { slug } = Util.getRouteType();
  const merchantClient = new Merchant();
  const merchant = await merchantClient.getOne({ slug });

  const merchantId = merchant?.id!;

  const bookingClient = new Booking();

  const getLocation = () => {
    if (data.customLocation && !data.location) return data.customLocation;
    if (data.location && !data.customLocation) return data.location;

    if (!data.location && !data.customLocation) return '';

    return `${data.location} - ${data.customLocation}`;
  };
  const location = getLocation();
  console.log('location data consoled', location);
  const createParamData = {
    info: data.info || '',
    location,
    isOutsideWork: !!data.isOutsideWork,
    amount: data.amount,
    paymentMode: payNow ? 'online' : '',
  };

  const pricingItems = data.items.map(item => item.id);
  const newBooking = await bookingClient.create(
    createParamData,
    data.serviceId,
    merchantId,
    pricingItems,
    data.userId
  );

  const bookingVerificationCallbackUrl = `http://${hostname}/service/booking/confirm?service=${data.serviceId}&user_email=${user.email}&bookingId=${newBooking.id}`;
  const bookingChargeAttemptedUrl = `http://${hostname}/service/booking/confirm/existing-card?service=${data.serviceId}&user_email=${user.email}&bookingId=${newBooking.id}`;
  const bookingNotChargedUrl = `http://${hostname}/service/booking/confirm/not-charged?service=${data.serviceId}&user_email=${user.email}&bookingId=${newBooking.id}`;

  if (payNow) {
    const transaction = new Transaction();
    if (data.selectedAuthCode) {
      const chargedAuth = await transaction.charge_authorization(
        data.userId,
        user.email,
        (data.amount * 100).toString(),
        data.selectedAuthCode!
      );
      return {
        message: chargedAuth.message,
        status: chargedAuth.status,
        success_url: bookingChargeAttemptedUrl,
      };
    } else {
      const newTransaction = await transaction.initialize(
        user.email,
        data.amount * 100,
        null,
        bookingVerificationCallbackUrl
      );

      return {
        success_url: newTransaction.data.authorization_url,
        message: newTransaction.message,
        errors: null,
      };
    }
  }

  return { success_url: bookingNotChargedUrl, message: 'Successful' };
}
