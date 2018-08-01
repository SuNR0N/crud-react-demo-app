import * as reduxForm from 'redux-form';

import { actions } from '../../../../actions/CategoryActions';
import { EDIT_CATEGORY_FORM } from '../../../../constants/forms';
import {
  ICategoryDTO,
  IHATEOASLink,
  INewCategoryDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './EditCategoryPageConnected';

describe('EditCategoryPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the loadCategory function', () => {
      const loadCategorySpy = jest.spyOn(actions, 'loadCategory');
      const { loadCategory } = mapDispatchToProps(jest.fn());
      const idMock = 1;
      loadCategory(idMock);

      expect(loadCategorySpy).toHaveBeenCalledWith(idMock);
    });

    it('should map the saveCategory function', () => {
      const updateCategorySpy = jest.spyOn(actions, 'updateCategory');
      const { saveCategory } = mapDispatchToProps(jest.fn());
      const categoryMock = {} as INewCategoryDTO;
      const idMock = 1;
      const linkMock = {} as IHATEOASLink;
      saveCategory(categoryMock, idMock, linkMock);

      expect(updateCategorySpy).toHaveBeenCalledWith(categoryMock, idMock, linkMock);
    });

    it('should map the submitForm function', async () => {
      const submitSpy = jest.spyOn(reduxForm, 'submit');
      const { submitForm } = mapDispatchToProps(jest.fn());
      submitForm();

      expect(submitSpy).toHaveBeenCalledWith(EDIT_CATEGORY_FORM);
    });
  });

  describe('mapStateToProps', () => {
    const categoryMock: Partial<ICategoryDTO> = {
      id: 1,
      name: 'Foo',
    };
    const state = {
      category: {
        currentCategory: categoryMock,
      },
    } as IRootState;

    it('should map currentCategory', () => {
      const { currentCategory } = mapStateToProps(state);

      expect(currentCategory).toBe(categoryMock);
    });

    it('should map initialFormData', () => {
      const { initialFormData } = mapStateToProps(state);

      expect(initialFormData).toEqual({
        id: categoryMock.id,
        name: categoryMock.name,
      });
    });

    it('should map isFormValid', async () => {
      jest.resetModules();
      jest.doMock('redux-form', () => ({
        isValid: (name: string) => jest.fn(() => name === EDIT_CATEGORY_FORM ? true : false),
        reduxForm: () => jest.fn(),
      }));
      const { mapStateToProps: mapStateToPropsDynamic } = (await import('./EditCategoryPageConnected'));
      const { isFormValid } = mapStateToPropsDynamic(state);

      expect(isFormValid).toBe(true);
    });
  });
});
