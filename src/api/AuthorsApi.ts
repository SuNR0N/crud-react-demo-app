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

  public static async createAuthor(author: INewAuthorDTO): Promise<number> {
    const locationRegExp = /\/(\d{1,})$/;
    const response = await HttpClient.post(`${API_PREFIX}/authors`, author);
    const locationHeaderValue = response.headers.get('Location');
    const locationRegExpExec = locationRegExp.exec(locationHeaderValue!);
    if (!locationRegExpExec) {
      throw new Error('Invalid location header');
    }
    return parseInt(locationRegExpExec[1], 10);
  }
}
