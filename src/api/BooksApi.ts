import { API_PREFIX } from '../config';
import {
  IBookDTO,
  INewBookDTO,
  IPageableCollectionDTO,
} from '../interfaces/dtos';
import { HttpClient } from './HttpClient';

export class BooksApi {
  public static async getBooks(query?: string): Promise<IPageableCollectionDTO<IBookDTO>> {
    const queryString = query ? `?q=${query}` : '';
    const response = await HttpClient.get(`${API_PREFIX}/books${queryString}`);
    return response.json();
  }

  public static async getBook(id: number): Promise<IBookDTO> {
    const response = await HttpClient.get(`${API_PREFIX}/books/${id}`);
    return response.json();
  }

  public static async createBook(book: INewBookDTO): Promise<number> {
    const locationRegExp = /\/(\d{1,})$/;
    const response = await HttpClient.post(`${API_PREFIX}/books`, book);
    const locationHeaderValue = response.headers.get('Location');
    const locationRegExpExec = locationRegExp.exec(locationHeaderValue!);
    if (!locationRegExpExec) {
      throw new Error('Invalid location header');
    }
    return parseInt(locationRegExpExec[1], 10);
  }
}
