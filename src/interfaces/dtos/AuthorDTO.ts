import { IHATEOASLink } from '../HATEOASLink';
import { IResourceDTO } from './ResourceDTO';

export interface IAuthorDTO extends IResourceDTO {
  firstName: string;
  fullName: string;
  id: number;
  lastName: string;
  middleName?: string;
  _links: {
    self: IHATEOASLink,
    delete?: IHATEOASLink,
    update?: IHATEOASLink,
  }
}