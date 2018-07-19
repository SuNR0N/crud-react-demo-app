import { RouterState } from 'react-router-redux';

import {
  IAuthorState,
  IAuthState,
  IBookState,
  ICategoryState,
  IPublisherState,
} from './';

export interface IRootState {
  auth: IAuthState,
  author: IAuthorState,
  book: IBookState,
  category: ICategoryState,
  form: any,
  publisher: IPublisherState,
  router: RouterState,
}
