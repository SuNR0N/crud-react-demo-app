import {
  applyMiddleware,
  createStore,
} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';

import { initialState as initialAuthorState } from '../reducers/AuthorReducer';
import { initialState as initialBookState } from '../reducers/BookReducer';
import { initialState as initialCategoryState } from '../reducers/CategoryReducer';
import { initialState as initialPublisherState } from '../reducers/PublisherReducer';
import { rootReducer } from '../reducers/RootReducer';
import { IRootState } from '../reducers/RootState';
import { rootSaga } from '../sagas/RootSaga';

const initialStoreState: IRootState = {
  author: {
    ...initialAuthorState,
  },
  book: {
    ...initialBookState,
  },
  category: {
    ...initialCategoryState,
  },
  publisher: {
    ...initialPublisherState,
  },
  router: {
    location: null,
  },
}

const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState: IRootState = initialStoreState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      sagaMiddleware,
      reduxImmutableStateInvariant()
    )
  );
}

export const store = configureStore();
sagaMiddleware.run(rootSaga)