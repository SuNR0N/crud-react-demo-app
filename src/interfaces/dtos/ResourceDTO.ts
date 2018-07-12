import { IHATEOASLink } from '../HATEOASLink';

export interface IResourceDTO {
  _links?: { [key: string]: IHATEOASLink | undefined };
}