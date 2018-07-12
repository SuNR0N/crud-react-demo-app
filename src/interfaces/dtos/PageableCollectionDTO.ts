import { IHATEOASLink } from '../HATEOASLink';
import { IResourceDTO } from './ResourceDTO';

export interface IPageableCollectionDTO<T> extends IResourceDTO {
  content: T;
  currentPage: number;
  totalItems: number;
  totalPageS: number;
  _links: {
    first?: IHATEOASLink,
    previous?: IHATEOASLink,
    next?: IHATEOASLink,
    last?: IHATEOASLink, 
  }
}