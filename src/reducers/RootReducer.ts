import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import {
  auth,
  author,
  book,
  category,
  publisher,
} from './';
import { IRootState } from './RootState';

export const rootReducer = combineReducers<IRootState>({
  auth,
  author,
  book,
  category,
  form,
  publisher,
  router,
})