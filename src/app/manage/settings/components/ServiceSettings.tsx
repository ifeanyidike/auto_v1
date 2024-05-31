'use client';
import React, {
  type SetStateAction,
  useState,
  type Dispatch,
  useEffect,
} from 'react';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import { enqueueSnackbar } from 'notistack';
import Toggler from '~/components/Toggler';
import PlusIcon from '~/commons/icons/PlusIcon';
import CloseIcon from '~/commons/icons/CloseIcon';
import { updateMerchantServiceSettings } from '../action';
import { type MerchantType } from '~/app/api/merchant/logic';

type Props = {
  merchant: MerchantType;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type LocData = Record<'location' | 'cost', string>;

type Data = {
  allowOutsideWork: boolean;
  locationData: LocData[] | null;
};
const ServiceSettings = (props: Props) => {
  const getSavedLocationData = () => {
    const { allowOutsideWork, miscellanous } = props.merchant;
    if (!allowOutsideWork && !miscellanous) return null;

    const locationData = miscellanous.map(m => ({
      location: m.location,
      cost: m.cost,
    }));
    return {
      allowOutsideWork,
      locationData,
    };
  };

  const [data, setData] = useState<Data | null>(getSavedLocationData());
  const [locCost, setLocCost] = useState<LocData>();

  useEffect(() => {}, []);

  async function handleUpdateMerchant() {
    try {
      props.setLoading(true);

      if (!data) {
        return enqueueSnackbar('Please sent some data before submitting', {
          variant: 'error',
        });
      }

      if (data?.allowOutsideWork && !data.locationData) {
        return enqueueSnackbar('Location data is required for outside work', {
          variant: 'error',
        });
      }

      if (!data?.allowOutsideWork && data.locationData) {
        return enqueueSnackbar(
          'Please enable outside work to set location data',
          {
            variant: 'error',
          }
        );
      }

      const locationToRemove = props.merchant.miscellanous
        .filter(m => {
          return !data.locationData?.some(l => l.location === m.location);
        })
        .map(m => m.id);

      const { success } = await updateMerchantServiceSettings(
        props.merchant.id,
        {
          ...data,
          locationToAdd: data.locationData || [],
          locationToRemove,
        }
      );
      props.setLoading(false);

      if (!success) {
        return enqueueSnackbar(
          'An unexpected error occurred, please tryagain later or contact support!',
          {
            variant: 'error',
          }
        );
      }
      enqueueSnackbar('Merchant sucessfully updated', {
        variant: 'success',
      });
    } catch (error: any) {
    } finally {
      props.setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex max-lg:flex-col gap-8 px-2 py-8">
        <div className="flex flex-col w-1/2 max-lg:w-full gap-10">
          <div className="flex items-center text-sm gap-2">
            <Toggler
              classNames="!h-4"
              value={!!data?.allowOutsideWork}
              setToggled={() => {
                const newData = { ...(data || {}) };
                newData.allowOutsideWork = !!!newData.allowOutsideWork;
                setData(newData as Data);
              }}
            />
            <span>Will you be offering outside work to your users?</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="location"
                className="text-[10px] uppercase font-semibold"
              >
                Locations you'd be offering outside work
              </label>
              <TextInput
                name="location"
                customStyle="text-xs"
                placeholder="Please enter location you'd be offering outside work to"
                value={locCost?.location?.toString() || ''}
                getValue={(loc: string) => {
                  const newLocCost = { ...(locCost || {}) };
                  newLocCost.location = loc;
                  setLocCost(newLocCost as LocData);
                }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="cost"
                className="text-[10px] uppercase font-semibold"
              >
                Miscellanous cost for this location
              </label>
              <TextInput
                name="cost"
                suffixSign="₦"
                customStyle="text-xs"
                placeholder="Please enter the miscellanous amount you'd charge for this location"
                value={locCost?.cost?.toString() || ''}
                getValue={(costString: string) => {
                  const newLocCost = { ...(locCost || {}) };
                  const costValue = parseFloat(costString);
                  let cost = costValue.toString();

                  if (isNaN(costValue)) {
                    enqueueSnackbar('Cost must be a number', {
                      variant: 'error',
                    });
                    cost = '';
                  }

                  newLocCost.cost = cost;
                  setLocCost(newLocCost as LocData);
                }}
              />
              <button
                onClick={() => {
                  if (!locCost?.cost || !locCost.location) {
                    return enqueueSnackbar('Please enter location and cost', {
                      variant: 'error',
                    });
                  }
                  const newData = { ...data };
                  //check if location already exist and flag
                  const locIndex = newData.locationData?.findIndex(
                    l => l.location === locCost.location
                  );
                  console.log('locIndex', locIndex);
                  if (locIndex === undefined || locIndex === -1) {
                    newData.locationData = [
                      ...(newData.locationData || []),
                      locCost,
                    ];
                  } else {
                    newData.locationData![locIndex]!.cost = locCost.cost;
                  }

                  setLocCost(undefined);
                  setData(newData as Data);
                }}
                className="ml-auto hover-target flex justify-between items-center hover:w-[140px] transition ease-in-out duration-300 bg-stone-200 p-2 rounded-md relative mt-2"
              >
                <span className="hide absolute right-2 -top-2 p-2 text-sm font-medium rounded mt-2">
                  Add Location
                </span>
                <PlusIcon classNames="h-5 w-5" />
              </button>

              <div className="flex gap-2 flex-wrap py-4">
                {data?.locationData?.map(locData => (
                  <div className="relative text-xs flex gap-2 whitespace-nowrap text-white rounded-2xl bg-indigo-700 pl-4 pr-7 py-2">
                    <button
                      className="absolute right-2 top-2/5 text-red-300"
                      onClick={() => {
                        const newData = { ...data };
                        newData.locationData = newData.locationData!.filter(
                          d => d.location !== locData.location
                        );
                        setData(newData);
                      }}
                    >
                      <CloseIcon classNames="w-4 h-4" strokeWidth={4} />
                    </button>
                    <p className="max-w-40 overflow-hidden text-ellipsis">
                      {locData.location}
                    </p>
                    <span>{`₦${locData?.cost}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 max-lg:w-full gap-10"></div>
      </div>
      <div className="mb-4 px-2">
        <Button
          bgColor="bg-slate-700"
          radius="rounded-xl"
          onClick={handleUpdateMerchant}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default ServiceSettings;
