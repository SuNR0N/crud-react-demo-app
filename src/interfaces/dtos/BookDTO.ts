import { IHATEOASLink } from '../HATEOASLink';
import { IResourceDTO } from './ResourceDTO';

export interface IBookDTO extends IResourceDTO {
  authors: string[];
  categories: string[];
  id: number;
  isbn10: string;
  isbn13: string;
  publicationDate: string;
  publishers: string[];
  title: string;
  _links: {
    self: IHATEOASLink,
    delete?: IHATEOASLink,
    update?: IHATEOASLink,
  };
}