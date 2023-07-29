enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPMethod = (url: string, options: Options) => Promise<unknown>

interface Options {
  timeout: number
  headers: Record<string, string>
  data: any
  method: METHODS
}

const queryStringify = (data: Record<string, any>) => {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
};

export class HTTPTransport {
  get: HTTPMethod = async (url, options) => {
    return await this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post: HTTPMethod = async (url, options) => {
    return await this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put: HTTPMethod = async (url, options) => {
    return await this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete: HTTPMethod = async (url, options) => {
    return await this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = async (url: string, options: Options, timeout: number = 5000) => {
    const { method, data, headers } = options;
    const queryUrl = url + queryStringify(options.data);

    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.open(method as string, queryUrl);
      xhr.timeout = timeout;
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
