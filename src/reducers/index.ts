export {
  initialState as initialAuthorState,
  IState as IAuthorState,
  reducer as author,
} from './AuthorReducer';
export {
  initialState as initialAuthState,
  IState as IAuthState,
  reducer as auth,
} from './AuthReducer';
export {
  initialState as initialBookState,
  IState as IBookState,
  reducer as book,
} from './BookReducer';
export {
  initialState as initialCategoryState,
  IState as ICategoryState,
  reducer as category,
} from './CategoryReducer';
export {
  initialState as initialErrorState,
  IState as IErrorState,
  reducer as error,
} from './ErrorReducer';
export {
  initialState as initialRequestState,
  IState as IRequestState,
  reducer as request,
} from './RequestReducer';
export {
  initialState as initialPublisherState,
  IState as IPublisherState,
  reducer as publisher,
} from './PublisherReducer';
export * from './RootReducer';
export * from './RootState';