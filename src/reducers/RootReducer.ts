import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';

import { reducer as author } from './AuthorReducer';
import { reducer as book } from './BookReducer';
import { reducer as category } from './CategoryReducer';
import { reducer as publisher } from './PublisherReducer';
import { IRootState } from './RootState';

export const rootReducer = combineReducers<IRootState>({
  author,
  book,
  category,
  publisher,
  router,
})