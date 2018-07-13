import { API_PREFIX } from '../config';
import {
  IAuthorDTO,
  INewAuthorDTO,
} from '../interfaces/dtos';
import { HttpClient } from './HttpClient';

export class AuthorsApi {
  public static async getAuthors(): Promise<IAuthorDTO[]> {
    const response = await HttpClient.get(`${API_PREFIX}/authors`);
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
