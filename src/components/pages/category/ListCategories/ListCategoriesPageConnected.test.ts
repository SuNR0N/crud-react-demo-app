import {
  actions,
  ActionTypes,
} from '../../../../actions/CategoryActions';
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
    const initialState = {
      auth: {
        profile: null,
      },
      category: {
        categories: categoriesMock,
      },
      request: {
        pendingRequests: {},
      },
    } as IRootState;
    
    it('should map categories', () => {
      const { categories } = mapStateToProps(initialState);

      expect(categories).toBe(categoriesMock);
    });

    describe('isLoading', () => {
      let state: IRootState;

      beforeEach(() => {
        state = {
          ...initialState,
          request: {
            pendingRequests: {},
          },
        };
      });

      it('should be mapped to true if the request count for LOAD_CATEGORIES_REQUEST is greater than 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_CATEGORIES_REQUEST] = 3;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(true);
      });

      it('should be mapped to false if the request count for LOAD_CATEGORIES_REQUEST equals to 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_CATEGORIES_REQUEST] = 0;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(false);
      });

      it('should be mapped to false if there is no key for LOAD_CATEGORIES_REQUEST', () => {
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(false);
      });
    });

    it('should map loggedIn', () => {
      const { loggedIn } = mapStateToProps(initialState);

      expect(loggedIn).toBe(false);
    });
  });
});
