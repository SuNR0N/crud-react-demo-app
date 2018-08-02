import { IHATEOASLink } from '../HATEOASLink';
import { IResourceDTO } from './ResourceDTO';

export interface IPublisherDTO extends IResourceDTO {
  id: number;
  name: string;
  _links: {
    self: IHATEOASLink,
    delete?: IHATEOASLink,
    update?: IHATEOASLink,
  };
}