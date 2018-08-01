import { actions } from '../../../../actions/BookActions';
import { 
  IBookDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './ViewBookPageConnected';

describe('ViewBookPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the deleteBook function', () => {
      const deleteBookSpy = jest.spyOn(actions, 'deleteBook');
      const { deleteBook } = mapDispatchToProps(jest.fn());
      const bookMock = {} as IBookDTO;
      const linkMock = {} as IHATEOASLink;
      deleteBook(bookMock, linkMock);

      expect(deleteBookSpy).toHaveBeenCalledWith(bookMock, linkMock, undefined);
    });

    it('should map the loadBook function', async () => {
      const loadBookSpy = jest.spyOn(actions, 'loadBook');
      const { loadBook } = mapDispatchToProps(jest.fn());
      const idMock = 1;
      loadBook(idMock);

      expect(loadBookSpy).toHaveBeenCalledWith(idMock);
    });
  });

  describe('mapStateToProps', () => {
    it('should map book', () => {
      const bookMock = {} as IBookDTO;
      const state = {
        book: {
          currentBook: bookMock,
        },
      } as IRootState;
      const { book } = mapStateToProps(state);

      expect(book).toBe(bookMock);
    });
  });
});
