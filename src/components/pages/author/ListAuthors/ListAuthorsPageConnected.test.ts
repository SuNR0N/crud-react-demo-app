import { actions } from '../../../../actions/AuthorActions';
import { 
  IAuthorDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './ListAuthorsPageConnected';

describe('ListAuthorsPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the deleteAuthor function', () => {
      const deleteAuthorSpy = jest.spyOn(actions, 'deleteAuthor');
      const { deleteAuthor } = mapDispatchToProps(jest.fn());
      const authorMock = {} as IAuthorDTO;
      const linkMock = {} as IHATEOASLink;
      deleteAuthor(authorMock, linkMock);

      expect(deleteAuthorSpy).toHaveBeenCalledWith(authorMock, linkMock, undefined);
    });

    it('should map the searchAuthors function', async () => {
      const loadAuthorsSpy = jest.spyOn(actions, 'loadAuthors');
      const { searchAuthors } = mapDispatchToProps(jest.fn());
      const queryMock = 'foo';
      searchAuthors(queryMock);

      expect(loadAuthorsSpy).toHaveBeenCalledWith(queryMock);
    });
  });

  describe('mapStateToProps', () => {
    const authorsMock: IAuthorDTO[] = [];
    const state = {
      auth: {
        profile: null,
      },
      author: {
        authors: authorsMock,
      },
    } as IRootState;
    
    it('should map authors', () => {
      const { authors } = mapStateToProps(state);

      expect(authors).toBe(authorsMock);
    });

    it('should map loggedIn', () => {
      const { loggedIn } = mapStateToProps(state);

      expect(loggedIn).toBe(false);
    });
  });
});
