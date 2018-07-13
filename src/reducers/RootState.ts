import { RouterState } from 'react-router-redux';

import { IState as IAuthorState } from './AuthorReducer';
import { IState as IBookState } from './BookReducer';
import { IState as ICategoryState } from './CategoryReducer';
import { IState as IPublisherState } from './PublisherReducer';

export interface IRootState {
  author: IAuthorState,
  book: IBookState,
  category: ICategoryState,
  publisher: IPublisherState,
  router: RouterState,
}
