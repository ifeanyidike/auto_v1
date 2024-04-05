'use server';

import { z } from 'zod';
import Review from '../api/review/logic';
import Util from '~/server/utils';
import User from '../api/user/logic';
import Auth0 from '~/server/auth0';

const schema = z.object({
  rating: z
    .number({
      invalid_type_error: 'Rating must be a number',
      required_error: 'Rating is required',
    })
    .positive()
    .min(1, 'Rating cannot be less than 1')
    .max(5, 'Rating cannot be more than 5'),
});

export async function saveReview(prevState: any, formData: FormData) {
  console.log('prevStae', prevState);
  console.log('formData', formData);

  const rating = parseInt(formData.get('rating') as string);
  const description = formData.get('description') as string;
  const type = formData.get('type') as 'subscription' | 'booking';
  const itemId = formData.get('itemId') as string;

  const validatedFields = schema.safeParse({ rating });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorValues = Object.values(errors);
    if (errorValues[0]?.length) {
      return {
        error: errorValues[0][0],
      };
    }
  }

  const { merchantData } = await Util.getMerchantDataBySubdomain();
  if (!merchantData) {
    return { error: 'Merchant does not exist' };
  }

  const userClient = new User();
  const userSession = await Auth0.getSessionUser();
  const user = await userClient.getOne({ email: userSession.email });
  if (!user) {
    return { error: 'Please login to leave a review' };
  }

  const reviewClient = new Review();
  await reviewClient.create({
    rating,
    merchant: {
      connect: {
        id: merchantData.id,
      },
    },
    user: {
      connect: {
        id: user!.id,
      },
    },
    ...(description && { description }),
    ...(type === 'booking'
      ? {
          booking: {
            connect: { id: itemId },
          },
        }
      : {
          subscriptionFulfillment: {
            connect: { id: itemId },
          },
        }),
  });

  return {
    success: true,
  };
}
