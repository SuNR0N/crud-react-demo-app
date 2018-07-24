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
  initialErrorState,
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
  error: {
    ...initialErrorState,
  },
  form: {
  },
  publisher: {
    ...initialPublisherState,
  },
  router: {
    location: null,
  },
  toastr: {
    toastrs: [],
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