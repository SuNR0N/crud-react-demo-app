import {
  all,
  fork,
} from 'redux-saga/effects';

import { authorSagas } from './AuthorSagas';
import { bookSagas } from './BookSagas';
import { categorySagas } from './CategorySagas';
import { publisherSagas } from './PublisherSagas';

export function* rootSaga() {
  yield all([
    fork(authorSagas),
    fork(bookSagas),
    fork(categorySagas),
    fork(publisherSagas),
  ]);
}