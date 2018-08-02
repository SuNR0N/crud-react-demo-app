import {
  actions,
  ActionTypes,
} from '../../../../actions/BookActions';
import { 
  IBookDTO,
  IHATEOASLink,
  IPageableCollectionDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './ListBooksPageConnected';

describe('ListBooksPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the deleteBook function', () => {
      const deleteBookSpy = jest.spyOn(actions, 'deleteBook');
      const { deleteBook } = mapDispatchToProps(jest.fn());
      const bookMock = {} as IBookDTO;
      const linkMock = {} as IHATEOASLink;
      deleteBook(bookMock, linkMock);

      expect(deleteBookSpy).toHaveBeenCalledWith(bookMock, linkMock, undefined);
    });

    it('should map the paginateBooks function', () => {
      const paginateBooksSpy = jest.spyOn(actions, 'paginateBooks');
      const { paginateBooks } = mapDispatchToProps(jest.fn());
      const linkMock = {} as IHATEOASLink;
      paginateBooks(linkMock);

      expect(paginateBooksSpy).toHaveBeenCalledWith(linkMock);
    });

    it('should map the searchBooks function', async () => {
      const loadBooksSpy = jest.spyOn(actions, 'loadBooks');
      const { searchBooks } = mapDispatchToProps(jest.fn());
      const queryMock = 'foo';
      searchBooks(queryMock);

      expect(loadBooksSpy).toHaveBeenCalledWith(queryMock);
    });
  });

  describe('mapStateToProps', () => {
    const collectionMock: IPageableCollectionDTO<IBookDTO> = {
      content: [],
      currentPage: 1,
      totalItems: 1,
      totalPages: 1,
    };
    const initialState = {
      auth: {
        profile: null,
      },
      book: {
        books: collectionMock,
      },
      request: {
        pendingRequests: {},
      },
    } as IRootState;
    
    it('should map booksCollection', () => {
      const { booksCollection } = mapStateToProps(initialState);

      expect(booksCollection).toBe(collectionMock);
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

      it('should be mapped to true if the request count for LOAD_BOOKS_REQUEST is greater than 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_BOOKS_REQUEST] = 3;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(true);
      });

      it('should be mapped to true if the request count for PAGINATE_BOOKS_REQUEST is greater than 0', () => {
        state.request.pendingRequests[ActionTypes.PAGINATE_BOOKS_REQUEST] = 3;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(true);
      });

      it('should be mapped to true if the request count for PAGINATE_BOOKS_REQUEST and LOAD_BOOKS_REQUEST are greater than 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_BOOKS_REQUEST] = 3;
        state.request.pendingRequests[ActionTypes.PAGINATE_BOOKS_REQUEST] = 3;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(true);
      });

      it('should be mapped to false if the request count for LOAD_BOOKS_REQUEST equals to 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_BOOKS_REQUEST] = 0;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(false);
      });

      it('should be mapped to false if the request count for PAGINATE_BOOKS_REQUEST equals to 0', () => {
        state.request.pendingRequests[ActionTypes.PAGINATE_BOOKS_REQUEST] = 0;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(false);
      });

      it('should be mapped to false if the request count for PAGINATE_BOOKS_REQUEST and LOAD_BOOKS_REQUEST are equal to 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_BOOKS_REQUEST] = 0;
        state.request.pendingRequests[ActionTypes.PAGINATE_BOOKS_REQUEST] = 0;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(false);
      });

      it('should be mapped to false if there are no keys for LOAD_BOOKS_REQUEST and PAGINATE_BOOKS_REQUEST', () => {
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
