import {
  IAuthorDTO,
  IAuthorUpdateDTO,
  IHATEOASLink,
  INewAuthorDTO,
} from '../interfaces';
import { IActionWithPayload } from './ActionHelpers';
import {
  actions,
  ActionTypes,
} from './AuthorActions';

describe('AuthorActions', () => {
  describe('createAuthor', () => {
    const author = {} as INewAuthorDTO;
    let action: IActionWithPayload<ActionTypes.CREATE_AUTHOR_REQUEST, INewAuthorDTO>;
    
    beforeAll(() => {
      action = actions.createAuthor(author);
    });

    it('should create an action with type CREATE_AUTHOR_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.CREATE_AUTHOR_REQUEST);
    });

    it('should create an action which contains the author to be created as its payload', () => {
      expect(action.payload).toBe(author);
    });
  });

  describe('createAuthorFailed', () => {
    const author = {} as INewAuthorDTO;
    let action: IActionWithPayload<ActionTypes.CREATE_AUTHOR_FAILURE, { data: INewAuthorDTO, message: string }>;
    
    beforeAll(() => {
      action = actions.createAuthorFailed(author, 'foo');
    });

    it('should create an action with type CREATE_AUTHOR_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.CREATE_AUTHOR_FAILURE);
    });

    it('should create an action which contains the author to be created within the payload as data', () => {
      expect(action.payload.data).toBe(author);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('createAuthorSucceeded', () => {
    let action: IActionWithPayload<ActionTypes.CREATE_AUTHOR_SUCCESS, number>;
    
    beforeAll(() => {
      action = actions.createAuthorSucceeded(1);
    });

    it('should create an action with type CREATE_AUTHOR_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.CREATE_AUTHOR_SUCCESS);
    });

    it('should create an action which contains the id of the created author as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('deleteAuthor', () => {
    const author = {} as IAuthorDTO;
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.DELETE_AUTHOR_REQUEST, { data: IAuthorDTO, link: IHATEOASLink, route?: string }>;
    
    beforeAll(() => {
      action = actions.deleteAuthor(author, link);
    });

    it('should create an action with type DELETE_AUTHOR_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.DELETE_AUTHOR_REQUEST);
    });

    it('should create an action which contains the author to be deleted within the payload as data', () => {
      expect(action.payload.data).toBe(author);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });

    it('should create an action which does not contain the route within the payload if it was not provided', () => {
      expect(action.payload.route).toBeUndefined();
    });

    it('should create an action which contains the route within the payload as route if it was provided', () => {
      action = actions.deleteAuthor(author, link, 'foo');

      expect(action.payload.route).toBe('foo');
    });
  });

  describe('deleteAuthorFailed', () => {
    let action: IActionWithPayload<ActionTypes.DELETE_AUTHOR_FAILURE, { id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.deleteAuthorFailed(1, 'foo');
    });

    it('should create an action with type DELETE_AUTHOR_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.DELETE_AUTHOR_FAILURE);
    });

    it('should create an action which contains the id of the author to be deleted within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('deleteAuthorSucceeded', () => {
    let action: IActionWithPayload<ActionTypes.DELETE_AUTHOR_SUCCESS, number>;
    
    beforeAll(() => {
      action = actions.deleteAuthorSucceeded(1);
    });

    it('should create an action with type DELETE_AUTHOR_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.DELETE_AUTHOR_SUCCESS);
    });

    it('should create an action which contains the id of the deleted author as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('loadAuthor', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_AUTHOR_REQUEST, number>;
    
    beforeAll(() => {
      action = actions.loadAuthor(1);
    });

    it('should create an action with type LOAD_AUTHOR_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.LOAD_AUTHOR_REQUEST);
    });

    it('should create an action which contains the id of the author to be loaded as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('loadAuthorFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_AUTHOR_FAILURE, { id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.loadAuthorFailed(1, 'foo');
    });

    it('should create an action with type LOAD_AUTHOR_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_AUTHOR_FAILURE);
    });

    it('should create an action which contains the id of the author to be loaded within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadAuthorSucceeded', () => {
    const author = {} as IAuthorDTO;
    let action: IActionWithPayload<ActionTypes.LOAD_AUTHOR_SUCCESS, IAuthorDTO>;
    
    beforeAll(() => {
      action = actions.loadAuthorSucceeded(author);
    });

    it('should create an action with type LOAD_AUTHOR_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_AUTHOR_SUCCESS);
    });

    it('should create an action which contains the loaded author as its payload', () => {
      expect(action.payload).toBe(author);
    });
  });

  describe('loadAuthors', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_AUTHORS_REQUEST, string | undefined>;
    
    beforeAll(() => {
      action = actions.loadAuthors('foo');
    });

    it('should create an action with type LOAD_AUTHORS_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.LOAD_AUTHORS_REQUEST);
    });

    it('should create an action which contains the query string as its payload', () => {
      expect(action.payload).toBe('foo');
    });

    it('should create an action which does not contain the query string as its payload if it was not provided', () => {
      action = actions.loadAuthors();
      
      expect(action.payload).toBeUndefined();
    });
  });

  describe('loadAuthorsFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_AUTHORS_FAILURE, { message: string }>;
    
    beforeAll(() => {
      action = actions.loadAuthorsFailed('foo');
    });

    it('should create an action with type LOAD_AUTHORS_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_AUTHORS_FAILURE);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadAuthorsSucceeded', () => {
    const authors: IAuthorDTO[] = [];
    let action: IActionWithPayload<ActionTypes.LOAD_AUTHORS_SUCCESS, IAuthorDTO[]>;
    
    beforeAll(() => {
      action = actions.loadAuthorsSucceeded(authors);
    });

    it('should create an action with type LOAD_AUTHORS_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_AUTHORS_SUCCESS);
    });

    it('should create an action which contains the loaded authors as its payload', () => {
      expect(action.payload).toBe(authors);
    });
  });

  describe('updateAuthor', () => {
    const author = {} as IAuthorUpdateDTO;
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.UPDATE_AUTHOR_REQUEST, { data: IAuthorUpdateDTO, id: number, link: IHATEOASLink }>;
    
    beforeAll(() => {
      action = actions.updateAuthor(author, 1, link);
    });

    it('should create an action with type UPDATE_AUTHOR_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_AUTHOR_REQUEST);
    });

    it('should create an action which contains the new author properties within the payload as data', () => {
      expect(action.payload.data).toBe(author);
    });

    it('should create an action which contains the id of the author within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });
  });

  describe('updateAuthorFailed', () => {
    const author = {} as IAuthorUpdateDTO;
    let action: IActionWithPayload<ActionTypes.UPDATE_AUTHOR_FAILURE, { data: IAuthorUpdateDTO, id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.updateAuthorFailed(author, 1, 'foo');
    });

    it('should create an action with type UPDATE_AUTHOR_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_AUTHOR_FAILURE);
    });

    it('should create an action which contains the new author properties within the payload as data', () => {
      expect(action.payload.data).toBe(author);
    });

    it('should create an action which contains the id of the author within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('updateAuthorSucceeded', () => {
    const author = {} as IAuthorDTO;
    let action: IActionWithPayload<ActionTypes.UPDATE_AUTHOR_SUCCESS, IAuthorDTO>;
    
    beforeAll(() => {
      action = actions.updateAuthorSucceeded(author);
    });

    it('should create an action with type UPDATE_AUTHOR_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_AUTHOR_SUCCESS);
    });

    it('should create an action which contains the updated author as its payload', () => {
      expect(action.payload).toBe(author);
    });
  });
});
