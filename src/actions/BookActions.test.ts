import {
  IBookDTO,
  IBookUpdateDTO,
  IHATEOASLink,
  INewBookDTO,
  IPageableCollectionDTO,
} from '../interfaces';
import { IActionWithPayload } from './ActionHelpers';
import {
  actions,
  ActionTypes,
} from './BookActions';

describe('BookActions', () => {
  describe('createBook', () => {
    const book = {} as INewBookDTO;
    let action: IActionWithPayload<ActionTypes.CREATE_BOOK_REQUEST, INewBookDTO>;
    
    beforeAll(() => {
      action = actions.createBook(book);
    });

    it('should create an action with type CREATE_BOOK_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.CREATE_BOOK_REQUEST);
    });

    it('should create an action which contains the book to be created as its payload', () => {
      expect(action.payload).toBe(book);
    });
  });

  describe('createBookFailed', () => {
    const book = {} as INewBookDTO;
    let action: IActionWithPayload<ActionTypes.CREATE_BOOK_FAILURE, { data: INewBookDTO, message: string }>;
    
    beforeAll(() => {
      action = actions.createBookFailed(book, 'foo');
    });

    it('should create an action with type CREATE_BOOK_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.CREATE_BOOK_FAILURE);
    });

    it('should create an action which contains the book to be created within the payload as data', () => {
      expect(action.payload.data).toBe(book);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('createBookSucceeded', () => {
    let action: IActionWithPayload<ActionTypes.CREATE_BOOK_SUCCESS, number>;
    
    beforeAll(() => {
      action = actions.createBookSucceeded(1);
    });

    it('should create an action with type CREATE_BOOK_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.CREATE_BOOK_SUCCESS);
    });

    it('should create an action which contains the id of the created book as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('deleteBook', () => {
    const book = {} as IBookDTO;
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.DELETE_BOOK_REQUEST, { data: IBookDTO, link: IHATEOASLink, route?: string }>;
    
    beforeAll(() => {
      action = actions.deleteBook(book, link);
    });

    it('should create an action with type DELETE_BOOK_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.DELETE_BOOK_REQUEST);
    });

    it('should create an action which contains the book to be deleted within the payload as data', () => {
      expect(action.payload.data).toBe(book);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });

    it('should create an action which does not contain the route within the payload if it was not provided', () => {
      expect(action.payload.route).toBeUndefined();
    });

    it('should create an action which contains the route within the payload as route if it was provided', () => {
      action = actions.deleteBook(book, link, 'foo');

      expect(action.payload.route).toBe('foo');
    });
  });

  describe('deleteBookFailed', () => {
    let action: IActionWithPayload<ActionTypes.DELETE_BOOK_FAILURE, { id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.deleteBookFailed(1, 'foo');
    });

    it('should create an action with type DELETE_BOOK_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.DELETE_BOOK_FAILURE);
    });

    it('should create an action which contains the id of the book to be deleted within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('deleteBookSucceeded', () => {
    let action: IActionWithPayload<ActionTypes.DELETE_BOOK_SUCCESS, number>;
    
    beforeAll(() => {
      action = actions.deleteBookSucceeded(1);
    });

    it('should create an action with type DELETE_BOOK_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.DELETE_BOOK_SUCCESS);
    });

    it('should create an action which contains the id of the deleted book as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('loadBook', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_BOOK_REQUEST, number>;
    
    beforeAll(() => {
      action = actions.loadBook(1);
    });

    it('should create an action with type LOAD_BOOK_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.LOAD_BOOK_REQUEST);
    });

    it('should create an action which contains the id of the book to be loaded as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('loadBookFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_BOOK_FAILURE, { id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.loadBookFailed(1, 'foo');
    });

    it('should create an action with type LOAD_BOOK_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_BOOK_FAILURE);
    });

    it('should create an action which contains the id of the book to be loaded within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadBookSucceeded', () => {
    const book = {} as IBookDTO;
    let action: IActionWithPayload<ActionTypes.LOAD_BOOK_SUCCESS, IBookDTO>;
    
    beforeAll(() => {
      action = actions.loadBookSucceeded(book);
    });

    it('should create an action with type LOAD_BOOK_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_BOOK_SUCCESS);
    });

    it('should create an action which contains the loaded book as its payload', () => {
      expect(action.payload).toBe(book);
    });
  });

  describe('loadBooks', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_BOOKS_REQUEST, string | undefined>;
    
    beforeAll(() => {
      action = actions.loadBooks('foo');
    });

    it('should create an action with type LOAD_BOOKS_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.LOAD_BOOKS_REQUEST);
    });

    it('should create an action which contains the query string as its payload', () => {
      expect(action.payload).toBe('foo');
    });

    it('should create an action which does not contain the query string as its payload if it was not provided', () => {
      action = actions.loadBooks();
      
      expect(action.payload).toBeUndefined();
    });
  });

  describe('loadBooksFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_BOOKS_FAILURE, { message: string }>;
    
    beforeAll(() => {
      action = actions.loadBooksFailed('foo');
    });

    it('should create an action with type LOAD_BOOKS_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_BOOKS_FAILURE);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadBooksSucceeded', () => {
    const pageableCollection = {} as IPageableCollectionDTO<IBookDTO>;
    let action: IActionWithPayload<ActionTypes.LOAD_BOOKS_SUCCESS, IPageableCollectionDTO<IBookDTO>>;
    
    beforeAll(() => {
      action = actions.loadBooksSucceeded(pageableCollection);
    });

    it('should create an action with type LOAD_BOOKS_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_BOOKS_SUCCESS);
    });

    it('should create an action which contains the loaded collection as its payload', () => {
      expect(action.payload).toBe(pageableCollection);
    });
  });

  describe('paginateBooks', () => {
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.PAGINATE_BOOKS_REQUEST, { link: IHATEOASLink }>;
    
    beforeAll(() => {
      action = actions.paginateBooks(link);
    });

    it('should create an action with type PAGINATE_BOOKS_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.PAGINATE_BOOKS_REQUEST);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });
  });

  describe('paginateBooksFailed', () => {
    let action: IActionWithPayload<ActionTypes.PAGINATE_BOOKS_FAILURE, { message: string }>;
    
    beforeAll(() => {
      action = actions.paginateBooksFailed('foo');
    });

    it('should create an action with type PAGINATE_BOOKS_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.PAGINATE_BOOKS_FAILURE);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('paginateBooksSucceeded', () => {
    const pageableCollection = {} as IPageableCollectionDTO<IBookDTO>;
    let action: IActionWithPayload<ActionTypes.PAGINATE_BOOKS_SUCCESS, IPageableCollectionDTO<IBookDTO>>;
    
    beforeAll(() => {
      action = actions.paginateBooksSucceeded(pageableCollection);
    });

    it('should create an action with type PAGINATE_BOOKS_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.PAGINATE_BOOKS_SUCCESS);
    });

    it('should create an action which contains the loaded collection as its payload', () => {
      expect(action.payload).toBe(pageableCollection);
    });
  });

  describe('updateBook', () => {
    const book = {} as IBookUpdateDTO;
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.UPDATE_BOOK_REQUEST, { data: IBookUpdateDTO, id: number, link: IHATEOASLink }>;
    
    beforeAll(() => {
      action = actions.updateBook(book, 1, link);
    });

    it('should create an action with type UPDATE_BOOK_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_BOOK_REQUEST);
    });

    it('should create an action which contains the new book properties within the payload as data', () => {
      expect(action.payload.data).toBe(book);
    });

    it('should create an action which contains the id of the book within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });
  });

  describe('updateBookFailed', () => {
    const book = {} as IBookUpdateDTO;
    let action: IActionWithPayload<ActionTypes.UPDATE_BOOK_FAILURE, { data: IBookUpdateDTO, id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.updateBookFailed(book, 1, 'foo');
    });

    it('should create an action with type UPDATE_BOOK_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_BOOK_FAILURE);
    });

    it('should create an action which contains the new book properties within the payload as data', () => {
      expect(action.payload.data).toBe(book);
    });

    it('should create an action which contains the id of the book within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('updateBookSucceeded', () => {
    const book = {} as IBookDTO;
    let action: IActionWithPayload<ActionTypes.UPDATE_BOOK_SUCCESS, IBookDTO>;
    
    beforeAll(() => {
      action = actions.updateBookSucceeded(book);
    });

    it('should create an action with type UPDATE_BOOK_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_BOOK_SUCCESS);
    });

    it('should create an action which contains the updated book as its payload', () => {
      expect(action.payload).toBe(book);
    });
  });
});
