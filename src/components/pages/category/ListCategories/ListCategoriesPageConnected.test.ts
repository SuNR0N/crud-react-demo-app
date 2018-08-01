import { actions } from '../../../../actions/CategoryActions';
import { 
  ICategoryDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './ListCategoriesPageConnected';

describe('ListCategoriesPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the deleteCategory function', () => {
      const deleteCategorySpy = jest.spyOn(actions, 'deleteCategory');
      const { deleteCategory } = mapDispatchToProps(jest.fn());
      const categoryMock = {} as ICategoryDTO;
      const linkMock = {} as IHATEOASLink;
      deleteCategory(categoryMock, linkMock);

      expect(deleteCategorySpy).toHaveBeenCalledWith(categoryMock, linkMock, undefined);
    });

    it('should map the searchCategories function', async () => {
      const loadCategoriesSpy = jest.spyOn(actions, 'loadCategories');
      const { searchCategories } = mapDispatchToProps(jest.fn());
      const queryMock = 'foo';
      searchCategories(queryMock);

      expect(loadCategoriesSpy).toHaveBeenCalledWith(queryMock);
    });
  });

  describe('mapStateToProps', () => {
    const categoriesMock: ICategoryDTO[] = [];
    const state = {
      auth: {
        profile: null,
      },
      category: {
        categories: categoriesMock,
      },
    } as IRootState;
    
    it('should map categories', () => {
      const { categories } = mapStateToProps(state);

      expect(categories).toBe(categoriesMock);
    });

    it('should map loggedIn', () => {
      const { loggedIn } = mapStateToProps(state);

      expect(loggedIn).toBe(false);
    });
  });
});
