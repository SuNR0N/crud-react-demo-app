import * as reduxForm from 'redux-form';

import { actions } from '../../../../actions/AuthorActions';
import { CREATE_AUTHOR_FORM } from '../../../../constants/forms';
import { INewAuthorDTO } from '../../../../interfaces/dtos/NewAuthorDTO';
import { IRootState } from '../../../../reducers';
import { mapDispatchToProps } from './CreateAuthorPageConnected';

describe('CreateAuthorPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the saveAuthor function', () => {
      const createAuthorSpy = jest.spyOn(actions, 'createAuthor');
      const { saveAuthor } = mapDispatchToProps(jest.fn());
      const authorMock = {} as INewAuthorDTO;
      saveAuthor(authorMock);

      expect(createAuthorSpy).toHaveBeenCalledWith(authorMock);
    });

    it('should map the submitForm function', async () => {
      const submitSpy = jest.spyOn(reduxForm, 'submit');
      const { submitForm } = mapDispatchToProps(jest.fn());
      submitForm();

      expect(submitSpy).toHaveBeenCalledWith(CREATE_AUTHOR_FORM);
    });
  });

  describe('mapStateToProps', () => {
    it('should map isFormValid', async () => {
      const state = {} as IRootState;
      jest.resetModules();
      jest.doMock('redux-form', () => ({
        isValid: (name: string) => jest.fn(() => name === CREATE_AUTHOR_FORM ? true : false),
        reduxForm: () => jest.fn(),
      }));
      const { mapStateToProps } = (await import('./CreateAuthorPageConnected'));
      const { isFormValid } = mapStateToProps(state);

      expect(isFormValid).toBe(true);
    });
  });
});
