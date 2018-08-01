import * as reduxForm from 'redux-form';

import { actions } from '../../../../actions/AuthorActions';
import { EDIT_AUTHOR_FORM } from '../../../../constants/forms';
import {
  IAuthorDTO,
  IAuthorUpdateDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './EditAuthorPageConnected';

describe('EditAuthorPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the loadAuthor function', () => {
      const loadAuthorSpy = jest.spyOn(actions, 'loadAuthor');
      const { loadAuthor } = mapDispatchToProps(jest.fn());
      const idMock = 1;
      loadAuthor(idMock);

      expect(loadAuthorSpy).toHaveBeenCalledWith(idMock);
    });

    it('should map the saveAuthor function', () => {
      const updateAuthorSpy = jest.spyOn(actions, 'updateAuthor');
      const { saveAuthor } = mapDispatchToProps(jest.fn());
      const authorMock = {} as IAuthorUpdateDTO;
      const idMock = 1;
      const linkMock = {} as IHATEOASLink;
      saveAuthor(authorMock, idMock, linkMock);

      expect(updateAuthorSpy).toHaveBeenCalledWith(authorMock, idMock, linkMock);
    });

    it('should map the submitForm function', async () => {
      const submitSpy = jest.spyOn(reduxForm, 'submit');
      const { submitForm } = mapDispatchToProps(jest.fn());
      submitForm();

      expect(submitSpy).toHaveBeenCalledWith(EDIT_AUTHOR_FORM);
    });
  });

  describe('mapStateToProps', () => {
    const authorMock: Partial<IAuthorDTO> = {
      firstName: 'John',
      id: 1,
      lastName: 'Doe',
      middleName: 'X',
    };
    const state = {
      author: {
        currentAuthor: authorMock,
      },
    } as IRootState;

    it('should map currentAuthor', () => {
      const { currentAuthor } = mapStateToProps(state);

      expect(currentAuthor).toBe(authorMock);
    });

    it('should map initialFormData', () => {
      const { initialFormData } = mapStateToProps(state);

      expect(initialFormData).toEqual({
        firstName: authorMock.firstName,
        id: authorMock.id,
        lastName: authorMock.lastName,
        middleName: authorMock.middleName,
      });
    });

    it('should map isFormValid', async () => {
      jest.resetModules();
      jest.doMock('redux-form', () => ({
        isValid: (name: string) => jest.fn(() => name === EDIT_AUTHOR_FORM ? true : false),
        reduxForm: () => jest.fn(),
      }));
      const { mapStateToProps: mapStateToPropsDynamic } = (await import('./EditAuthorPageConnected'));
      const { isFormValid } = mapStateToPropsDynamic(state);

      expect(isFormValid).toBe(true);
    });
  });
});
