import {
  ICategoryDTO,
  IHATEOASLink,
  INewCategoryDTO,
} from '../interfaces';
import { IActionWithPayload } from './ActionHelpers';
import {
  actions,
  ActionTypes,
} from './CategoryActions';

describe('CategoryActions', () => {
  describe('createCategory', () => {
    const category = {} as INewCategoryDTO;
    let action: IActionWithPayload<ActionTypes.CREATE_CATEGORY_REQUEST, INewCategoryDTO>;
    
    beforeAll(() => {
      action = actions.createCategory(category);
    });

    it('should create an action with type CREATE_CATEGORY_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.CREATE_CATEGORY_REQUEST);
    });

    it('should create an action which contains the category to be created as its payload', () => {
      expect(action.payload).toBe(category);
    });
  });

  describe('createCategoryFailed', () => {
    const category = {} as INewCategoryDTO;
    let action: IActionWithPayload<ActionTypes.CREATE_CATEGORY_FAILURE, { data: INewCategoryDTO, message: string }>;
    
    beforeAll(() => {
      action = actions.createCategoryFailed(category, 'foo');
    });

    it('should create an action with type CREATE_CATEGORY_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.CREATE_CATEGORY_FAILURE);
    });

    it('should create an action which contains the category to be created within the payload as data', () => {
      expect(action.payload.data).toBe(category);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('createCategorySucceeded', () => {
    let action: IActionWithPayload<ActionTypes.CREATE_CATEGORY_SUCCESS, number>;
    
    beforeAll(() => {
      action = actions.createCategorySucceeded(1);
    });

    it('should create an action with type CREATE_CATEGORY_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.CREATE_CATEGORY_SUCCESS);
    });

    it('should create an action which contains the id of the created category as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('deleteCategory', () => {
    const category = {} as ICategoryDTO;
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.DELETE_CATEGORY_REQUEST, { data: ICategoryDTO, link: IHATEOASLink, route?: string }>;
    
    beforeAll(() => {
      action = actions.deleteCategory(category, link);
    });

    it('should create an action with type DELETE_CATEGORY_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.DELETE_CATEGORY_REQUEST);
    });

    it('should create an action which contains the category to be deleted within the payload as data', () => {
      expect(action.payload.data).toBe(category);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });

    it('should create an action which does not contain the route within the payload if it was not provided', () => {
      expect(action.payload.route).toBeUndefined();
    });

    it('should create an action which contains the route within the payload as route if it was provided', () => {
      action = actions.deleteCategory(category, link, 'foo');

      expect(action.payload.route).toBe('foo');
    });
  });

  describe('deleteCategoryFailed', () => {
    let action: IActionWithPayload<ActionTypes.DELETE_CATEGORY_FAILURE, { id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.deleteCategoryFailed(1, 'foo');
    });

    it('should create an action with type DELETE_CATEGORY_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.DELETE_CATEGORY_FAILURE);
    });

    it('should create an action which contains the id of the category to be deleted within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('deleteCategorySucceeded', () => {
    let action: IActionWithPayload<ActionTypes.DELETE_CATEGORY_SUCCESS, number>;
    
    beforeAll(() => {
      action = actions.deleteCategorySucceeded(1);
    });

    it('should create an action with type DELETE_CATEGORY_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.DELETE_CATEGORY_SUCCESS);
    });

    it('should create an action which contains the id of the deleted category as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('loadCategory', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_CATEGORY_REQUEST, number>;
    
    beforeAll(() => {
      action = actions.loadCategory(1);
    });

    it('should create an action with type LOAD_CATEGORY_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.LOAD_CATEGORY_REQUEST);
    });

    it('should create an action which contains the id of the category to be loaded as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('loadCategoryFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_CATEGORY_FAILURE, { id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.loadCategoryFailed(1, 'foo');
    });

    it('should create an action with type LOAD_CATEGORY_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_CATEGORY_FAILURE);
    });

    it('should create an action which contains the id of the category to be loaded within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadCategorySucceeded', () => {
    const category = {} as ICategoryDTO;
    let action: IActionWithPayload<ActionTypes.LOAD_CATEGORY_SUCCESS, ICategoryDTO>;
    
    beforeAll(() => {
      action = actions.loadCategorySucceeded(category);
    });

    it('should create an action with type LOAD_CATEGORY_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_CATEGORY_SUCCESS);
    });

    it('should create an action which contains the loaded category as its payload', () => {
      expect(action.payload).toBe(category);
    });
  });

  describe('loadCategories', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_CATEGORIES_REQUEST, string | undefined>;
    
    beforeAll(() => {
      action = actions.loadCategories('foo');
    });

    it('should create an action with type LOAD_CATEGORIES_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.LOAD_CATEGORIES_REQUEST);
    });

    it('should create an action which contains the query string as its payload', () => {
      expect(action.payload).toBe('foo');
    });

    it('should create an action which does not contain the query string as its payload if it was not provided', () => {
      action = actions.loadCategories();
      
      expect(action.payload).toBeUndefined();
    });
  });

  describe('loadCategoriesFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_CATEGORIES_FAILURE, { message: string }>;
    
    beforeAll(() => {
      action = actions.loadCategoriesFailed('foo');
    });

    it('should create an action with type LOAD_CATEGORIES_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_CATEGORIES_FAILURE);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadCategoriesSucceeded', () => {
    const categories: ICategoryDTO[] = [];
    let action: IActionWithPayload<ActionTypes.LOAD_CATEGORIES_SUCCESS, ICategoryDTO[]>;
    
    beforeAll(() => {
      action = actions.loadCategoriesSucceeded(categories);
    });

    it('should create an action with type LOAD_CATEGORIES_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_CATEGORIES_SUCCESS);
    });

    it('should create an action which contains the loaded categories as its payload', () => {
      expect(action.payload).toBe(categories);
    });
  });

  describe('updateCategory', () => {
    const category = {} as INewCategoryDTO;
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.UPDATE_CATEGORY_REQUEST, { data: INewCategoryDTO, id: number, link: IHATEOASLink }>;
    
    beforeAll(() => {
      action = actions.updateCategory(category, 1, link);
    });

    it('should create an action with type UPDATE_CATEGORY_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_CATEGORY_REQUEST);
    });

    it('should create an action which contains the new category properties within the payload as data', () => {
      expect(action.payload.data).toBe(category);
    });

    it('should create an action which contains the id of the category within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });
  });

  describe('updateCategoryFailed', () => {
    const category = {} as INewCategoryDTO;
    let action: IActionWithPayload<ActionTypes.UPDATE_CATEGORY_FAILURE, { data: INewCategoryDTO, id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.updateCategoryFailed(category, 1, 'foo');
    });

    it('should create an action with type UPDATE_CATEGORY_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_CATEGORY_FAILURE);
    });

    it('should create an action which contains the new category properties within the payload as data', () => {
      expect(action.payload.data).toBe(category);
    });

    it('should create an action which contains the id of the category within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('updateCategorySucceeded', () => {
    const category = {} as ICategoryDTO;
    let action: IActionWithPayload<ActionTypes.UPDATE_CATEGORY_SUCCESS, ICategoryDTO>;
    
    beforeAll(() => {
      action = actions.updateCategorySucceeded(category);
    });

    it('should create an action with type UPDATE_CATEGORY_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_CATEGORY_SUCCESS);
    });

    it('should create an action which contains the updated category as its payload', () => {
      expect(action.payload).toBe(category);
    });
  });
});
