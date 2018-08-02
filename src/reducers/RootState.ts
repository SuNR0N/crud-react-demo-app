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
  IRequestState,
} from '.';

export interface IRootState {
  auth: IAuthState,
  author: IAuthorState,
  book: IBookState,
  category: ICategoryState,
  error: IErrorState,
  form: FormStateMap,
  publisher: IPublisherState,
  request: IRequestState,
  router: RouterState,
  toastr: ToastrState,
}
