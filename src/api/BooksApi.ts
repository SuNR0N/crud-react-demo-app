import { API_PREFIX } from '../config';
import {
  IBookDTO,
  INewBookDTO,
  IPageableCollectionDTO,
} from '../interfaces';
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

  public static async createBook(book: INewBookDTO): Promise<void> {
    await HttpClient.post(`${API_PREFIX}/books`, book);
  }
}
