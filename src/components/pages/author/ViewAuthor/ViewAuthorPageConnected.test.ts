import { actions } from '../../../../actions/AuthorActions';
import { 
  IAuthorDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './ViewAuthorPageConnected';

describe('ViewAuthorPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the deleteAuthor function', () => {
      const deleteAuthorSpy = jest.spyOn(actions, 'deleteAuthor');
      const { deleteAuthor } = mapDispatchToProps(jest.fn());
      const authorMock = {} as IAuthorDTO;
      const linkMock = {} as IHATEOASLink;
      deleteAuthor(authorMock, linkMock);

      expect(deleteAuthorSpy).toHaveBeenCalledWith(authorMock, linkMock, undefined);
    });

    it('should map the loadAuthor function', async () => {
      const loadAuthorSpy = jest.spyOn(actions, 'loadAuthor');
      const { loadAuthor } = mapDispatchToProps(jest.fn());
      const idMock = 1;
      loadAuthor(idMock);

      expect(loadAuthorSpy).toHaveBeenCalledWith(idMock);
    });
  });

  describe('mapStateToProps', () => {
    it('should map author', () => {
      const authorMock = {} as IAuthorDTO;
      const state = {
        author: {
          currentAuthor: authorMock,
        },
      } as IRootState;
      const { author } = mapStateToProps(state);

      expect(author).toBe(authorMock);
    });
  });
});
