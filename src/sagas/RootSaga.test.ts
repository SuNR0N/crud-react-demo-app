import {
  AllEffect,
  fork,
} from 'redux-saga/effects';

import { authorSagas } from './AuthorSagas';
import { authSagas } from './AuthSagas';
import { bookSagas } from './BookSagas';
import { categorySagas } from './CategorySagas';
import { publisherSagas } from './PublisherSagas';
import { rootSaga } from './RootSaga';

describe('RootSaga', () => {
  describe('publisherSagas', () => {
    let value: AllEffect;
    
    beforeEach(() => {
      const iterator = rootSaga();
      value = iterator.next().value;
    });

    it('should contain the fork of AuthSagas', async () => {      
      expect(value.ALL).toContainEqual(
        fork(authSagas)
      );
    });

    it('should contain the fork of AuthorSagas', () => {
      expect(value.ALL).toContainEqual(
        fork(authorSagas)
      );
    });

    it('should contain the fork of BookSagas', () => {
      expect(value.ALL).toContainEqual(
        fork(bookSagas)
      );
    });

    it('should contain the fork of CategorySagas', () => {
      expect(value.ALL).toContainEqual(
        fork(categorySagas)
      );
    });

    it('should contain the fork of PublisherSagas', () => {
      expect(value.ALL).toContainEqual(
        fork(publisherSagas)
      );
    });
  });
});
