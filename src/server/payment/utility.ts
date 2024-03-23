import axios from 'axios';
import Util from '../utils';

export class Utility {
  constructor() {}
  protected baseEndpoint = 'https://api.paystack.co';

  private getGatewaySecret = async () => {
    const data = await Util.getMerchantDataBySubdomain();
    const encryptedKey = data.merchantData?.apiKeys?.paystack;

    const utilClient = new Util();
    const gateway_secret = utilClient.decryptSecret(encryptedKey);
    if (!gateway_secret) return null;
    return gateway_secret;
  };

  protected async process<T>(func: () => Promise<T>): Promise<T> {
    try {
      return await func();
    } catch (error) {
      const errorData = error as {
        code: string;
        errno: number;
        message: string;
        response: {
          data: {
            status: boolean;
            message: string;
            meta: { nextStep: string };
            type: 'validation_error';
            code: 'invalid_params' | 'authorization_key';
          };
        };
      };
      if (errorData.errno === -3008 || errorData.code === 'ENOTFOUND') {
        throw new Error('Please connect your network and try again!');
      }

      if (
        errorData.message?.toLowerCase()?.includes('unique constraint failed')
      ) {
        throw new Error('Record already added');
      }

      throw new Error(errorData.response?.data?.message);
    } finally {
    }
  }

  protected async post<T>(
    endpoint: string,
    body: Record<string, any>,
    func?: (data: any) => Promise<T>
  ) {
    const gateway_secret = await this.getGatewaySecret();
    if (!gateway_secret) return null;

    return this.process(async () => {
      const response = await axios.post(
        `${endpoint}`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${gateway_secret}`,
          },
        }
      );

      if (func && response.data) {
        return await func(response.data);
      }
      return response.data;
    });
  }

  protected async get<T, U>(endpoint: string, func?: (data: U) => Promise<T>) {
    const gateway_secret = await this.getGatewaySecret();
    if (!gateway_secret) return null;

    return this.process(async () => {
      const response = await axios.get(`${endpoint}`, {
        headers: {
          Authorization: `Bearer ${gateway_secret}`,
        },
      });
      if (func && response.data) {
        return await func(response.data);
      }
      return response.data;
    });
  }

  protected async put<T>(
    endpoint: string,
    body: Record<string, any>,
    func?: (data: any) => Promise<T>
  ) {
    const gateway_secret = await this.getGatewaySecret();
    if (!gateway_secret) return null;

    return this.process(async () => {
      const response = await axios.put(
        `${endpoint}`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${gateway_secret}`,
          },
        }
      );
      if (func && response.data) {
        return await func(response.data);
      }
      return response.data;
    });
  }
}
