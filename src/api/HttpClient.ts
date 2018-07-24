import { HttpError } from "../errors";

export class HttpClient {
  public static async request(url: string, options?: RequestInit) {
    let requestOptions: RequestInit = {
      ...options,
      credentials: 'include',
    };
    if (typeof requestOptions.body === 'object') {
      const requestOptionsWithBody = HttpClient.prepareRequestWithBody(
        requestOptions.body,
        requestOptions.method || 'GET',
        requestOptions
      );
      requestOptions = {
        ...requestOptions,
        ...requestOptionsWithBody,
      };
    }
    const request = new Request(url, requestOptions);
    try {
      const response = await fetch(request, requestOptions)
      if (!response.ok) {
        const message = await response.text();
        throw new HttpError(response.status, response.statusText, message);
      }
      return response;
    } catch (error) {
      throw error;
    }

  }

  public static async get(url: string, options?: RequestInit) {
    const getOptions: RequestInit = {
      ...options,
      method: 'GET',
    };
    return await HttpClient.request(url, getOptions);
  }

  public static async patch(url: string, body: any, options?: RequestInit) {
    const putOptions = HttpClient.prepareRequestWithBody(body, 'PATCH', options);
    return await HttpClient.request(url, putOptions);
  }

  public static async put(url: string, body: any, options?: RequestInit) {
    const putOptions = HttpClient.prepareRequestWithBody(body, 'PUT', options);
    return await HttpClient.request(url, putOptions);
  }

  public static async post(url: string, body: any, options?: RequestInit) {
    const postOptions = HttpClient.prepareRequestWithBody(body, 'POST', options);
    return await HttpClient.request(url, postOptions);
  }

  public static async delete(url: string, options?: RequestInit) {
    const deleteOptions: RequestInit = {
      ...options,
      method: 'DELETE',
    };
    return await HttpClient.request(url, deleteOptions);
  }

  private static prepareRequestWithBody(body: any, method: string, options?: RequestInit): RequestInit {
    let modifiedOptions: RequestInit = {
      ...options,
      method,
    };
    if (typeof body === 'object') {
      modifiedOptions = {
        ...modifiedOptions,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } else {
      modifiedOptions = {
        ...modifiedOptions,
        body,
      };
    }

    return modifiedOptions;
  }
}