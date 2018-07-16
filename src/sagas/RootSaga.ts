import {
  all,
  fork,
} from 'redux-saga/effects';

import { authorSagas } from './AuthorSagas';
import { authSagas } from './AuthSagas';
import { bookSagas } from './BookSagas';
import { categorySagas } from './CategorySagas';
import { publisherSagas } from './PublisherSagas';

export function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(authorSagas),
    fork(bookSagas),
    fork(categorySagas),
    fork(publisherSagas),
  ]);
}