import * as reduxForm from 'redux-form';

import { actions } from '../../../../actions/BookActions';
import { CREATE_BOOK_FORM } from '../../../../constants/forms';
import { INewBookDTO } from '../../../../interfaces/dtos/NewBookDTO';
import { IRootState } from '../../../../reducers';
import { mapDispatchToProps } from './CreateBookPageConnected';

describe('CreateBookPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the saveBook function', () => {
      const createBookSpy = jest.spyOn(actions, 'createBook');
      const { saveBook } = mapDispatchToProps(jest.fn());
      const bookMock = {} as INewBookDTO;
      saveBook(bookMock);

      expect(createBookSpy).toHaveBeenCalledWith(bookMock);
    });

    it('should map the submitForm function', async () => {
      const submitSpy = jest.spyOn(reduxForm, 'submit');
      const { submitForm } = mapDispatchToProps(jest.fn());
      submitForm();

      expect(submitSpy).toHaveBeenCalledWith(CREATE_BOOK_FORM);
    });
  });

  describe('mapStateToProps', () => {
    it('should map isFormValid', async () => {
      const state = {} as IRootState;
      jest.resetModules();
      jest.doMock('redux-form', () => ({
        isValid: (name: string) => jest.fn(() => name === CREATE_BOOK_FORM ? true : false),
        reduxForm: () => jest.fn(),
      }));
      const { mapStateToProps } = (await import('./CreateBookPageConnected'));
      const { isFormValid } = mapStateToProps(state);

      expect(isFormValid).toBe(true);
    });
  });
});
