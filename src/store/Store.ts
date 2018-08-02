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
  initialRequestState,
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
  request: {
    ...initialRequestState,
  },
  router: {
    location: null,
  },
  toastr: {
    toastrs: [],
  },
};

export const history = createBrowserHistory();

const immutableStateMiddleware = reduxImmutableStateInvariant();
const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState: IRootState = initialStoreState) {
  const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
    immutableStateMiddleware,
  ];
  if (process.env.NODE_ENV === 'production') {
    middlewares.splice(middlewares.indexOf(immutableStateMiddleware), 1);
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}

export const store = configureStore();
sagaMiddleware.run(rootSaga);