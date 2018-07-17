import { API_PREFIX } from '../config';
import {
  INewPublisherDTO,
  IPublisherDTO,
} from '../interfaces/dtos';
import { HttpClient } from './HttpClient';

export class PublishersApi {
  public static async getPublishers(query?: string): Promise<IPublisherDTO[]> {
    const queryString = query ? `?q=${query}` : '';
    const response = await HttpClient.get(`${API_PREFIX}/publishers${queryString}`);
    return response.json();
  }

  public static async getPublisher(id: number): Promise<IPublisherDTO> {
    const response = await HttpClient.get(`${API_PREFIX}/publishers/${id}`);
    return response.json();
  }

  public static async createPublisher(category: INewPublisherDTO): Promise<void> {
    await HttpClient.post(`${API_PREFIX}/publishers`, category);
  }
}
