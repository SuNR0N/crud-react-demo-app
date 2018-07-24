import { ToastrState } from 'react-redux-toastr';
import { RouterState } from 'react-router-redux';
import { FormStateMap } from 'redux-form';

import {
  IAuthorState,
  IAuthState,
  IBookState,
  ICategoryState,
  IErrorState,
  IPublisherState,
} from '.';

export interface IRootState {
  auth: IAuthState,
  author: IAuthorState,
  book: IBookState,
  category: ICategoryState,
  error: IErrorState,
  form: FormStateMap,
  publisher: IPublisherState,
  router: RouterState,
  toastr: ToastrState,
}
