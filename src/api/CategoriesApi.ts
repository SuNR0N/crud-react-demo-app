import { API_PREFIX } from '../config';
import {
  ICategoryDTO,
  INewCategoryDTO,
} from '../interfaces/dtos';
import { HttpClient } from './HttpClient';

export class CategoriesApi {
  public static async getCategories(query?: string): Promise<ICategoryDTO[]> {
    const queryString = query ? `?q=${query}` : '';
    const response = await HttpClient.get(`${API_PREFIX}/categories${queryString}`);
    return response.json();
  }

  public static async getCategory(id: number): Promise<ICategoryDTO> {
    const response = await HttpClient.get(`${API_PREFIX}/categories/${id}`);
    return response.json();
  }

  public static async createCategory(category: INewCategoryDTO): Promise<void> {
    await HttpClient.post(`${API_PREFIX}/categories`, category);
  }
}
