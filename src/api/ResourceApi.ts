import { IResourceParams } from '../interfaces/ResourceParams';
import { HttpClient } from './HttpClient';

export class ResourceApi {
  public static async request<T = {}, V = {}>(params: IResourceParams<T>): Promise<V | void> {
    const response = await HttpClient.request(params.link.href, {
      body: params.data ? JSON.stringify(params.data) : undefined,
      headers: {
        ...(params.data ? { 'Content-Type': 'application/json' } : {})
      },
      method: params.link.method,
    });
    if (response.status === 204) {
      return;
    } else {
      return response.json();
    }
  }
}
