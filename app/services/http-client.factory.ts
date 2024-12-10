import type { EmptyObject } from '@unicornify/utils';

export type RoutesShape = {
  get?: Record<string, unknown>;
  post?: Record<string, unknown>;
  put?: Record<string, unknown>;
  delete?: Record<string, unknown>;
};

type ExtractPath<Routes extends Record<string, unknown>, BaseUrl extends string> = {
  [Path in keyof Routes as Path extends `${BaseUrl}${infer RemainingPath}`
    ? RemainingPath
    : never]: Routes[Path];
};

export type HttpClient<Routes extends RoutesShape, Base extends string> = {
  get<Path extends keyof ExtractPath<Routes['get'] & EmptyObject, Base>>(
    path: Path & string,
    query?: RequestOptions['query'],
    requestOptions?: Omit<RequestOptions, 'query'>,
  ): Promise<Routes['get'][`${Base}${Path}` & keyof Routes['get']]>;
  post<Path extends keyof ExtractPath<Routes['post'] & EmptyObject, Base>>(
    path: Path & string,
    body?: RequestOptions['body'],
    requestOptions?: Omit<RequestOptions, 'query'>,
  ): Promise<Routes['post'][`${Base}${Path}` & keyof Routes['post']]>;
  put<Path extends keyof ExtractPath<Routes['put'] & EmptyObject, Base>>(
    path: Path & string,
    body?: RequestOptions['body'],
    requestOptions?: Omit<RequestOptions, 'query'>,
  ): Promise<Routes['put'][`${Base}${Path}` & keyof Routes['put']]>;
  delete<Path extends keyof ExtractPath<Routes['delete'] & EmptyObject, Base>>(
    path: Path & string,
    query?: RequestOptions['query'],
    requestOptions?: Omit<RequestOptions, 'query'>,
  ): Promise<Routes['delete'][`${Base}${Path}` & keyof Routes['delete']]>;
};

export const createHttpClient =
  <BaseUrl extends string>(base: BaseUrl) =>
  <Routes extends RoutesShape>(
    sharedOptions: CreateHttpClientOptions = {},
  ): HttpClient<Routes, BaseUrl> => {
    const baseUrl =
      !base.startsWith('http') && 'location' in globalThis
        ? new URL(base, globalThis.location.origin).href
        : base;
    const baseOptions = typeof sharedOptions === 'function' ? sharedOptions() : sharedOptions;
    async function doRequest(
      path: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE',
      { query, body, headers, ...requestOptions }: RequestOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any> {
      return $fetch(path, {
        baseURL: baseUrl,
        method,
        query: {
          ...baseOptions.query,
          ...query,
        },
        headers: {
          ...baseOptions.headers,
          ...headers,
        },
        body,
        retryDelay: 2500,
        ...requestOptions,
      });
    }

    return {
      async get(path, query = {}, requestOptions = {}) {
        return doRequest(path, 'GET', {
          query,
          ...requestOptions,
        });
      },
      async post(path, body, requestOptions = {}) {
        return doRequest(path, 'POST', {
          body,
          ...requestOptions,
        });
      },
      async put(path, body, requestOptions = {}) {
        return doRequest(path, 'PUT', {
          body,
          ...requestOptions,
        });
      },
      async delete(path, query, requestOptions = {}) {
        return doRequest(path, 'DELETE', {
          query,
          ...requestOptions,
        });
      },
    };
  };

type CreateHttpClientOptions = RequestOptions | (() => RequestOptions);

type RequestOptions = {
  headers?: HeadersInit;
  query?: Record<string, unknown>;
  body?: Record<string, unknown> | unknown[];
  responseType?: 'blob' | 'text' | 'arrayBuffer' | 'stream' | 'json';
};
