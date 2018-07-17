import { API_PREFIX } from '../config';
import {
  IAuthorDTO,
  INewAuthorDTO,
} from '../interfaces/dtos';
import { HttpClient } from './HttpClient';

export class AuthorsApi {
  public static async getAuthors(query?: string): Promise<IAuthorDTO[]> {
    const queryString = query ? `?q=${query}` : '';
    const response = await HttpClient.get(`${API_PREFIX}/authors${queryString}`);
    return response.json();
  }

  public static async getAuthor(id: number): Promise<IAuthorDTO> {
    const response = await HttpClient.get(`${API_PREFIX}/authors/${id}`);
    return response.json();
  }

  public static async createAuthor(author: INewAuthorDTO): Promise<void> {
    await HttpClient.post(`${API_PREFIX}/authors`, author);
  }
}
