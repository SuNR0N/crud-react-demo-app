import { API_PREFIX } from '../config';
import {
  IBookDTO,
  IPageableCollectionDTO,
} from '../interfaces';

export class BooksApi {
  public static async getBooks(): Promise<IPageableCollectionDTO<IBookDTO>> {
    try {     
      const response = await fetch(`${API_PREFIX}/books`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
