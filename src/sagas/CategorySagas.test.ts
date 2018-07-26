import {
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';
import { toastr } from 'react-redux-toastr';
import { runSaga } from 'redux-saga';
import {
  AllEffect,
  takeEvery,
} from 'redux-saga/effects';

import {
  createAction,
  IActionWithPayload,
} from '../actions';
import {
  Actions,
  ActionTypes,
} from '../actions/CategoryActions';
import {
  CategoriesApi,
  ResourceApi,
} from '../api';
import {
  ICategoryDTO,
  IHATEOASLink,
  INewCategoryDTO,
  IResourceParams,
} from '../interfaces';
import {
  categorySagas,
  createCategory,
  deleteCategory,
  loadCategories,
  loadCategory,
  updateCategory,
} from './CategorySagas';

describe('CategorySagas', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('deleteCategory', () => {
    const deleteCategoryAction: IActionWithPayload<ActionTypes.DELETE_CATEGORY_REQUEST, IResourceParams<ICategoryDTO>> = createAction(
      ActionTypes.DELETE_CATEGORY_REQUEST,
      {
        data: {
          id: 1
        } as ICategoryDTO,
        link: {
          href: '/api/v1/categories/1',
          method: 'DELETE', 
        } as IHATEOASLink,
      }
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      beforeEach(() => {
        mockResponseOnce('', { status: 204 });
      });

      it('should call the request function with the payload', async () => {
        const requestSpy = jest.spyOn(ResourceApi, 'request');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteCategory, deleteCategoryAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(deleteCategoryAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteCategory, deleteCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: 1,
          type: '[Category] Delete Category Success',
        });
      });

      it('should dispatch a route change action if the route is defined within the payload', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteCategory, {
          ...deleteCategoryAction,
          payload: {
            ...deleteCategoryAction.payload,
            route: 'foo',
          },
        }).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['foo'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteCategory, deleteCategoryAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Category Deletion Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteCategory, deleteCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            id: 1,
            message: 'Foo',
          },
          type: '[Category] Delete Category Failure',
        });
      });
    });
  });

  describe('createCategory', () => {
    const newCategory: INewCategoryDTO = {
      name: 'Foo',
    };
    const createCategoryAction: IActionWithPayload<ActionTypes.CREATE_CATEGORY_REQUEST, INewCategoryDTO> = createAction(
      ActionTypes.CREATE_CATEGORY_REQUEST,
      newCategory,
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      beforeEach(() => {
        mockResponseOnce('', {
          headers: {
            Location: '/api/v1/categories/1',
          },
          status: 201,
        });
      });

      it('should call the createCategory function with the payload', async () => {
        const createCategorySpy = jest.spyOn(CategoriesApi, 'createCategory');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createCategory, createCategoryAction).done;
  
        expect(createCategorySpy).toHaveBeenCalledWith(createCategoryAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createCategory, createCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: 1,
          type: '[Category] Create Category Success',
        });
      });

      it('should dispatch a route change action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createCategory, createCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['/categories'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createCategory, createCategoryAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Category Creation Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createCategory, createCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            data: newCategory,
            message: 'Foo',
          },
          type: '[Category] Create Category Failure',
        });
      });
    });
  });

  describe('loadCategory', () => {
    const loadCategoryAction: IActionWithPayload<ActionTypes.LOAD_CATEGORY_REQUEST, number> = createAction(
      ActionTypes.LOAD_CATEGORY_REQUEST,
      1
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const categoryMock: ICategoryDTO = {
        _links: {
          self: {
            href: '/api/v1/categories/1',
            method: 'GET',
          },
        },
        id: 1,
        name: 'Foo',
      };
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(categoryMock));
      });

      it('should call the getCategory function with the payload', async () => {
        const getCategorySpy = jest.spyOn(CategoriesApi, 'getCategory');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadCategory, loadCategoryAction).done;
  
        expect(getCategorySpy).toHaveBeenCalledWith(loadCategoryAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadCategory, loadCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: categoryMock,
          type: '[Category] Load Category Success',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadCategory, loadCategoryAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Category Load Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadCategory, loadCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            id: 1,
            message: 'Foo',
          },
          type: '[Category] Load Category Failure',
        });
      });
    });
  });

  describe('loadCategories', () => {
    const loadCategoriesAction: IActionWithPayload<ActionTypes.LOAD_CATEGORIES_REQUEST, string | undefined> = createAction(
      ActionTypes.LOAD_CATEGORIES_REQUEST,
      undefined,
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const categoriesMock: ICategoryDTO[] = [
        {
          _links: {
            self: {
              href: '/api/v1/categories/1',
              method: 'GET',
            },
          },
          id: 1,
          name: 'Foo',
        },
        {
          _links: {
            self: {
              href: '/api/v1/categories/2',
              method: 'GET',
            },
          },
          id: 2,
          name: 'Bar',
        }
      ];
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(categoriesMock));
      });

      it('should call the getCategories function with the payload', async () => {
        const getCategoriesSpy = jest.spyOn(CategoriesApi, 'getCategories');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadCategories, loadCategoriesAction).done;
  
        expect(getCategoriesSpy).toHaveBeenCalledWith(loadCategoriesAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadCategories, loadCategoriesAction).done;

        expect(dispatched).toContainEqual({
          payload: categoriesMock,
          type: '[Category] Load Categories Success',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadCategories, loadCategoriesAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Categories Load Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadCategories, loadCategoriesAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            message: 'Foo',
          },
          type: '[Category] Load Categories Failure',
        });
      });
    });
  });

  describe('updateCategory', () => {
    const categoryUpdate: INewCategoryDTO = {
      name: 'Bar',
    };
    const updateCategoryAction: IActionWithPayload<ActionTypes.UPDATE_CATEGORY_REQUEST, IResourceParams<INewCategoryDTO>> = createAction(
      ActionTypes.UPDATE_CATEGORY_REQUEST,
      {
        data: categoryUpdate,
        id: 1,
        link: {
          href: '/api/v1/categories/1',
          method: 'PUT', 
        } as IHATEOASLink,
      }
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const updatedCategory: ICategoryDTO = {
        _links: {
          self: {
            href: '/api/v1/categories/1',
            method: 'GET',
          },
        },
        id: 1,
        name: 'Bar',
      };

      beforeEach(() => {
        mockResponseOnce(JSON.stringify(updatedCategory));
      });

      it('should call the request function with the payload', async () => {
        const requestSpy = jest.spyOn(ResourceApi, 'request');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateCategory, updateCategoryAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(updateCategoryAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateCategory, updateCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: updatedCategory,
          type: '[Category] Update Category Success',
        });
      });

      it('should dispatch a route change action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateCategory, updateCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['/categories/1'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateCategory, updateCategoryAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Category Update Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateCategory, updateCategoryAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            data: categoryUpdate,
            id: 1,
            message: 'Foo',
          },
          type: '[Category] Update Category Failure',
        });
      });
    });
  });

  describe('categorySagas', () => {
    let value: AllEffect;
    
    beforeEach(() => {
      const iterator = categorySagas();
      value = iterator.next().value;
    })

    it('should trigger createCategory on CREATE_CATEGORY_REQUEST', async () => {      
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.CREATE_CATEGORY_REQUEST, createCategory)
      );
    });

    it('should trigger deleteCategory on DELETE_CATEGORY_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.DELETE_CATEGORY_REQUEST, deleteCategory)
      );
    });

    it('should trigger loadCategory on LOAD_CATEGORY_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_CATEGORY_REQUEST, loadCategory)
      );
    });

    it('should trigger loadCategories on LOAD_CATEGORIES_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_CATEGORIES_REQUEST, loadCategories)
      );
    });

    it('should trigger updateCategory on UPDATE_CATEGORY_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.UPDATE_CATEGORY_REQUEST, updateCategory)
      );
    });
  });
});
