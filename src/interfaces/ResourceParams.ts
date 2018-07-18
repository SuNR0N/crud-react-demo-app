import { IHATEOASLink } from './HATEOASLink';

export interface IResourceParams<T = {}> {
  data?: T,
  link: IHATEOASLink;
  route?: string;
}