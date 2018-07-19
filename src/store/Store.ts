import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';

import { 
  initialAuthorState,
  initialBookState,
  initialCategoryState,
  initialPublisherState,
  IRootState,
  rootReducer,
} from '../reducers';
import { rootSaga } from '../sagas/RootSaga';

const initialStoreState: IRootState = {
  auth: {
    profile: null,
  },
  author: {
    ...initialAuthorState,
  },
  book: {
    ...initialBookState,
  },
  category: {
    ...initialCategoryState,
  },
  form: {
  },
  publisher: {
    ...initialPublisherState,
  },
  router: {
    location: null,
  },
}

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState: IRootState = initialStoreState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      reduxImmutableStateInvariant()
    )
  );
}

export const store = configureStore();
sagaMiddleware.run(rootSaga);