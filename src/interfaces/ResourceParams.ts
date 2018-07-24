import { IHATEOASLink } from './HATEOASLink';

export interface IResourceParams<T = {}> {
  data?: T,
  id?: number,
  link: IHATEOASLink;
  route?: string;
}