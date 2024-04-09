'use server';
import { z } from 'zod';
import Discount from '~/app/api/discount/logic';
import Merchant from '~/app/api/merchant/logic';
import MerchantApiKey from '~/app/api/merchant_apikey/logic';
import MerchantMiscellanous from '~/app/api/merchant_miscellanous/logic';
import Util from '~/server/utils';
import { Plan } from '~/server/payment/plan';

type GeneralSettingsData = {
  name: string;
  address: string | null;
  phoneNo: string;
  caption: string | null;
  shortDescription: string | null;
};

type ApiKeySettingsData = {
  paystackSecretKey: string;
  calendlyLink: string;
};

type ServiceSettingsData = {
  allowOutsideWork: boolean;
  locationToAdd: Record<'location' | 'cost', string>[];
  locationToRemove: string[];
};

type DiscountSettingsData = {
  type: 'percentage' | 'fixed';
  code: string;
  value: string;
  expiresOn: Date;
};

const generalSettingsSchema = z.object({
  address: z.string({
    required_error: 'Merchant address is required',
    invalid_type_error: 'Auto merchant address must be a string',
  }),
  name: z
    .string({
      required_error: 'Auto merchant name is required',
      invalid_type_error: 'Auto merchant name must be a string',
    })
    .min(3, { message: 'Auto merchant name cannot be less than 3 characters' }),
  phoneNo: z.string({ required_error: 'Phone Number is required' }),
  caption: z
    .string({
      required_error: 'Caption is required',
      invalid_type_error: 'Caption must be a string',
    })
    .min(5, { message: 'Caption cannot be less than 5 characters' }),
  shortDescription: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(5, { message: 'Description cannot be less than 5 characters' }),
});

const apiKeySettingsSchema = z.object({
  paystackSecretKey: z
    .string({
      required_error: 'The paystack secret key is required',
      invalid_type_error: 'The paystack secret key must be a string',
    })
    .length(48, {
      message: 'Your paystack secret key must be 48 characters long',
    }),
});

const discountSettingsSchema = z.object({
  type: z.string({
    required_error: 'type is required',
    invalid_type_error: 'type must be a string',
  }),
  code: z.string({
    required_error: 'Discount code is required',
    invalid_type_error: 'Discount code must be a string',
  }),
  value: z
    .number({
      required_error: 'Value is required',
      invalid_type_error: 'Value must be a number',
    })
    .nonnegative()
    .safe()
    .finite(),
});

export async function updateMerchantGeneralSettings(
  id: string,
  data: GeneralSettingsData
) {
  const validatedFields = generalSettingsSchema.safeParse({
    ...data,
  });

  console.log('In here', data);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorValues = Object.values(errors);
    if (errorValues[0]?.length) {
      return {
        error: errorValues[0][0],
      };
    }
  }
  console.log('data', data);

  const merchantClient = new Merchant();
  await merchantClient.update(id, {
    ...data,
  });

  return { success: true };
}

export async function updateMerchantServiceSettings(
  id: string,
  data: ServiceSettingsData
) {
  const miscClient = new MerchantMiscellanous();
  await miscClient.createMany(id, data!);

  return { success: true };
}

export async function updateMerchantApiKeySettings(
  merchantId: string,
  data: ApiKeySettingsData | null
) {
  const validatedFields = apiKeySettingsSchema.safeParse({
    paystackSecretKey: data?.paystackSecretKey || '',
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorValues = Object.values(errors);
    if (errorValues[0]?.length) {
      return {
        error: errorValues[0][0],
      };
    }
  }

  const util = new Util();
  const paystackSecret = util.encryptSecret(data!.paystackSecretKey);

  const apiKeyClient = new MerchantApiKey();
  try {
    await apiKeyClient.createOrUpdate(
      merchantId,
      paystackSecret,
      data!.calendlyLink
    );
  } catch (error: any) {
    return { error: error.message };
  }

  return { success: true };
}

type FormState = {
  merchantId: string;
  success: boolean;
  error: string | null;
};

type PlainFieldState = {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  tiktok: string;
};

type FormFieldState = Partial<
  {
    file: File;
  } & PlainFieldState
>;

export async function updateMerchantSocialSettings(
  prevState: FormState,
  formData: FormData
) {
  const plainData = {} as PlainFieldState;
  let logo: File | null = null;

  const entries = formData.entries();
  let done = false;
  let isEmpty = true;

  while (!done) {
    const { value, done: doneLooping } = entries.next();
    if (doneLooping) break;
    const [key, val] = value as [keyof FormFieldState, string | File];

    if (key === 'file' && (val as File).size) {
      isEmpty = false;
      logo = val as File;
    }

    if (key !== 'file' && val) {
      isEmpty = false;
      plainData[key] = val as string;
    }

    done = doneLooping!;
  }

  if (isEmpty) {
    return {
      merchantId: prevState.merchantId,
      success: false,
      error: 'No input was provided. Please provide some input!',
    };
  }
  const merchantClient = new Merchant();
  let uploadedImage: Record<'uploadId' | 'url', string> | undefined = undefined;

  if (logo) {
    const merchantData = await merchantClient.getOne({
      id: prevState.merchantId,
    });
    const existingImage = { id: merchantData?.logoId, url: merchantData?.logo };
    const util = new Util();
    uploadedImage = await util.uploadOrUpdate(logo, 'logo', existingImage);
  }

  await merchantClient.update(prevState.merchantId, {
    ...plainData,
    ...(uploadedImage && {
      logoId: uploadedImage.uploadId,
      logo: uploadedImage.url,
    }),
  });

  return {
    merchantId: prevState.merchantId,
    success: true,
    error: null,
  };
}

export async function updateDiscountSettings(
  merchantId: string,
  data: DiscountSettingsData | null
) {
  const validatedFields = discountSettingsSchema.safeParse({
    ...data,
    value: data?.value ? parseInt(data.value) : '',
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorValues = Object.values(errors);
    if (errorValues[0]?.length) {
      return {
        error: errorValues[0][0],
      };
    }
  }

  const discountClient = new Discount();
  try {
    await discountClient.create({
      ...data,
      code: data?.code!,
      value: data?.value!,
      type: data?.type!,
      merchant: {
        connect: {
          id: merchantId,
        },
      },
    });
    const discounts = await discountClient.getManyByMerchant(merchantId);
    return { success: true, discounts };
  } catch (error: any) {
    const err_message =
      error.message === 'unique_constraint_failed'
        ? 'You have already created a discount with the same code. Please try another code'
        : error.message;
    return { success: false, error: err_message };
  }
}

export async function linkOrUnlinkServicesToDiscount(
  merchantId: string,
  id: string,
  servicesToConnect: string[],
  servicesToDisconnect: string[]
) {
  console.log('services', servicesToConnect, servicesToDisconnect);
  try {
    const discountClient = new Discount();
    await discountClient.update(id, {
      services: {
        disconnect: servicesToDisconnect.map(s => ({ id: s })),
        connect: servicesToConnect.map(s => ({ id: s })),
      },
    });
    const discounts = await discountClient.getManyByMerchant(merchantId);
    return { success: true, discounts };
  } catch (error: any) {
    const err_message =
      error.message === 'unique_constraint_failed'
        ? 'You have already created a discount with the same code. Please try another code'
        : error.message;
    return { success: false, error: err_message };
  }
}

export async function linkOrUnlinkPlansToDiscount(
  merchantId: string,
  id: string,
  plansToConnect: { id: string; code: string; amount: number }[],
  plansToDisconnect: { id: string; code: string; amount: number }[]
) {
  try {
    const discountClient = new Discount();
    await discountClient.update(id, {
      plans: {
        disconnect: plansToDisconnect?.map(p => ({ id: p.id })),
        connect: plansToConnect?.map(p => ({ id: p.id })),
      },
    });

    const plansToUpdate = [...plansToConnect, ...plansToDisconnect];
    console.log('plansToUpdate', plansToUpdate);
    if (plansToUpdate.length) {
      const planClient = new Plan();
      await planClient.updatePlansAmount(plansToUpdate);
    }

    const discounts = await discountClient.getManyByMerchant(merchantId);
    return { success: true, discounts };
  } catch (error: any) {
    const err_message =
      error.message === 'unique_constraint_failed'
        ? 'You have already created a discount with the same code. Please try another code'
        : error.message;
    return { success: false, error: err_message };
  }
}

export async function editDiscount(
  merchantId: string,
  id: string,
  data: Record<'value' | 'type', string>,
  plans: {
    id: string;
    code: string;
    amount: number;
  }[]
) {
  try {
    const discountClient = new Discount();
    await discountClient.update(id, {
      ...data,
    });
    // console.log('plansToUpdate', plansToUpdate);
    if (plans.length) {
      const planClient = new Plan();
      await planClient.updatePlansAmount(plans);
    }
    const discounts = await discountClient.getManyByMerchant(merchantId);
    return { success: true, discounts };
  } catch (error: any) {
    const err_message =
      error.message === 'unique_constraint_failed'
        ? 'You have already created a discount with the same code. Please try another code'
        : error.message;
    return { success: false, error: err_message };
  }
}

export async function deleteDiscount(
  merchantId: string,
  id: string,
  plans: {
    id: string;
    code: string;
    amount: number;
  }[]
) {
  try {
    const discountClient = new Discount();
    await discountClient.delete(id);
    // console.log('plansToUpdate', plansToUpdate);
    if (plans.length) {
      const planClient = new Plan();
      await planClient.updatePlansAmount(plans);
    }
    const discounts = await discountClient.getManyByMerchant(merchantId);
    return { success: true, discounts };
  } catch (error: any) {
    const err_message =
      error.message === 'unique_constraint_failed'
        ? 'You have already created a discount with the same code. Please try another code'
        : error.message;
    return { success: false, error: err_message };
  }
}
