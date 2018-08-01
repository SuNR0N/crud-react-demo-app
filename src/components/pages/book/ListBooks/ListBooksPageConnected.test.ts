import { actions } from '../../../../actions/BookActions';
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
    const state = {
      auth: {
        profile: null,
      },
      book: {
        books: collectionMock,
      },
    } as IRootState;
    
    it('should map booksCollection', () => {
      const { booksCollection } = mapStateToProps(state);

      expect(booksCollection).toBe(collectionMock);
    });

    it('should map loggedIn', () => {
      const { loggedIn } = mapStateToProps(state);

      expect(loggedIn).toBe(false);
    });
  });
});
