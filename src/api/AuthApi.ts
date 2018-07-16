import { API_PREFIX } from '../config';
import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { HttpClient } from './HttpClient';

export class AuthApi {
  public static async getProfile(): Promise<IProfileDTO> {
    const response = await HttpClient.get(`${API_PREFIX}/auth/profile`);
    return response.json();
  }

  public static async logOut(): Promise<void> {
    await HttpClient.post(`${API_PREFIX}/auth/logout`, undefined);
  }
}
