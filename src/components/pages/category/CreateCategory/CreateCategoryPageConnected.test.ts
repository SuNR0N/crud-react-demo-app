import * as reduxForm from 'redux-form';

import { actions } from '../../../../actions/CategoryActions';
import { CREATE_CATEGORY_FORM } from '../../../../constants/forms';
import { INewCategoryDTO } from '../../../../interfaces/dtos/NewCategoryDTO';
import { IRootState } from '../../../../reducers';
import { mapDispatchToProps } from './CreateCategoryPageConnected';

describe('CreateCategoryPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the saveCategory function', () => {
      const createCategorySpy = jest.spyOn(actions, 'createCategory');
      const { saveCategory } = mapDispatchToProps(jest.fn());
      const categoryMock = {} as INewCategoryDTO;
      saveCategory(categoryMock);

      expect(createCategorySpy).toHaveBeenCalledWith(categoryMock);
    });

    it('should map the submitForm function', () => {
      const submitSpy = jest.spyOn(reduxForm, 'submit');
      const { submitForm } = mapDispatchToProps(jest.fn());
      submitForm();

      expect(submitSpy).toHaveBeenCalledWith(CREATE_CATEGORY_FORM);
    });
  });

  describe('mapStateToProps', () => {
    it('should map isFormValid', async () => {
      const state = {} as IRootState;
      jest.resetModules();
      jest.doMock('redux-form', () => ({
        isValid: (name: string) => jest.fn(() => name === CREATE_CATEGORY_FORM ? true : false),
        reduxForm: () => jest.fn(),
      }));
      const { mapStateToProps } = (await import('./CreateCategoryPageConnected'));
      const { isFormValid } = mapStateToProps(state);

      expect(isFormValid).toBe(true);
    });
  });
});
