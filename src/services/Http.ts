import { baseUrl } from '../utils/urls';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface OptionsWithoutMethod {
  timeout?: number
  headers?: Record<string, string>
  data?: unknown
}

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>

interface Options {
  timeout?: number
  headers?: Record<string, string>
  data?: unknown
  method: METHODS
}

export class HTTP {
  _domain: string = baseUrl;
  _baseUrl: string;

  constructor (baseUrl: string) {
    this._baseUrl = this._domain + baseUrl;
  }

  get: HTTPMethod = async (url, options) => {
    return await this.request(url, { data: options?.data, method: METHODS.GET }, options?.timeout);
  };

  post: HTTPMethod = async (url, options) => {
    return await this.request(url, { data: options?.data, method: METHODS.POST }, options?.timeout);
  };

  put: HTTPMethod = async (url, options) => {
    return await this.request(url, { data: options?.data, method: METHODS.PUT }, options?.timeout);
  };

  delete: HTTPMethod = async (url, options) => {
    return await this.request(url, { data: options?.data, method: METHODS.DELETE }, options?.timeout);
  };

  request = async (url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> => {
    const { method, data } = options;

    const queryUrl = this._baseUrl + url;

    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method as string, queryUrl);

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.timeout = timeout;
      xhr.onload = function () {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status < 400) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
