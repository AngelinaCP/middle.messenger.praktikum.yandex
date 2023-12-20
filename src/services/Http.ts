import {baseUrl} from "../utils/urls";

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type HTTPMethod = (url: string, options?: unknown) => Promise<XMLHttpRequest>

interface Options {
    timeout?: number
    headers?: Record<string, string>
    data?: unknown
    method: METHODS
}

export class HTTP {
    _domain: string = baseUrl
    _baseUrl: string

    constructor(baseUrl: string) {
        this._baseUrl = this._domain + baseUrl
    }

    get: HTTPMethod = (url, options?: any): Promise<XMLHttpRequest> => {
        return this.request(url, {data: options, method: METHODS.GET }, options?.timeout);
    };

    post: HTTPMethod = (url, options?: any): Promise<XMLHttpRequest> => {
        return this.request(url, { data: options, method: METHODS.POST }, options?.timeout);
    };

    put: HTTPMethod = (url, options?: any): Promise<XMLHttpRequest> => {
        return this.request(url, { data: options, method: METHODS.PUT }, options?.timeout);
    };

    delete: HTTPMethod = (url, options?: any): Promise<XMLHttpRequest> => {
        return this.request(url, { data: options, method: METHODS.DELETE }, options?.timeout);
    };

    request = (url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> => {
        const { method, data } = options;

        const queryUrl = this._baseUrl + url

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method as string, queryUrl);

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            xhr.timeout = timeout;
            xhr.onload = function () {
                if (xhr.readyState !== 4) {
                    return
                }
                if (xhr.status < 400) {
                    resolve(xhr);
                } else {
                    reject(xhr)
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
                xhr.send(data instanceof FormData ? data : JSON.stringify(data))
            }
        });
    };
}
