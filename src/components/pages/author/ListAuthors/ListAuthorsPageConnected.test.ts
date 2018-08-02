import {
  actions,
  ActionTypes,
} from '../../../../actions/AuthorActions';
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
    const initialState = {
      auth: {
        profile: null,
      },
      author: {
        authors: authorsMock,
      },
      request: {
        pendingRequests: {},
      },
    } as IRootState;
    
    it('should map authors', () => {
      const { authors } = mapStateToProps(initialState);

      expect(authors).toBe(authorsMock);
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

      it('should be mapped to true if the request count for LOAD_AUTHORS_REQUEST is greater than 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_AUTHORS_REQUEST] = 3;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(true);
      });

      it('should be mapped to false if the request count for LOAD_AUTHORS_REQUEST equals to 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_AUTHORS_REQUEST] = 0;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(false);
      });

      it('should be mapped to false if there is no key for LOAD_AUTHORS_REQUEST', () => {
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
