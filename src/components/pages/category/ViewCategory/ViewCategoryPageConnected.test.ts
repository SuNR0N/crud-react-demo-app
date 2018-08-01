import { actions } from '../../../../actions/CategoryActions';
import { 
  ICategoryDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './ViewCategoryPageConnected';

describe('ViewCategoryPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the deleteCategory function', () => {
      const deleteCategorySpy = jest.spyOn(actions, 'deleteCategory');
      const { deleteCategory } = mapDispatchToProps(jest.fn());
      const categoryMock = {} as ICategoryDTO;
      const linkMock = {} as IHATEOASLink;
      deleteCategory(categoryMock, linkMock);

      expect(deleteCategorySpy).toHaveBeenCalledWith(categoryMock, linkMock, undefined);
    });

    it('should map the loadCategory function', async () => {
      const loadCategorySpy = jest.spyOn(actions, 'loadCategory');
      const { loadCategory } = mapDispatchToProps(jest.fn());
      const idMock = 1;
      loadCategory(idMock);

      expect(loadCategorySpy).toHaveBeenCalledWith(idMock);
    });
  });

  describe('mapStateToProps', () => {
    it('should map category', () => {
      const categoryMock = {} as ICategoryDTO;
      const state = {
        category: {
          currentCategory: categoryMock,
        },
      } as IRootState;
      const { category } = mapStateToProps(state);

      expect(category).toBe(categoryMock);
    });
  });
});
