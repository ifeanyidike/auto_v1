import axios from 'axios';

export class Utility {
  protected gateway_secret: string | undefined = undefined;
  constructor() {
    this.gateway_secret = process.env.PAYSTACK_SECRET_KEY;
  }
  protected baseEndpoint = 'https://api.paystack.co';

  protected Header = {
    headers: {
      Authorization: `Bearer ${this.gateway_secret}`,
    },
  };

  protected async process<T>(func: () => Promise<T>): Promise<T> {
    if (!this.gateway_secret)
      throw new Error('The gateway secret key is required');

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
    return this.process(async () => {
      const response = await axios.post(
        `${endpoint}`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${this.gateway_secret}`,
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
    return this.process(async () => {
      const response = await axios.get(`${endpoint}`, {
        headers: {
          Authorization: `Bearer ${this.gateway_secret}`,
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
    return this.process(async () => {
      const response = await axios.put(
        `${endpoint}`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${this.gateway_secret}`,
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
