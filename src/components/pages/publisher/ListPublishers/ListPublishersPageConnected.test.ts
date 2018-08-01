import { actions } from '../../../../actions/PublisherActions';
import { 
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './ListPublishersPageConnected';

describe('ListPublishersPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the deletePublisher function', () => {
      const deletePublisherSpy = jest.spyOn(actions, 'deletePublisher');
      const { deletePublisher } = mapDispatchToProps(jest.fn());
      const publisherMock = {} as IPublisherDTO;
      const linkMock = {} as IHATEOASLink;
      deletePublisher(publisherMock, linkMock);

      expect(deletePublisherSpy).toHaveBeenCalledWith(publisherMock, linkMock, undefined);
    });

    it('should map the searchPublishers function', async () => {
      const loadPublishersSpy = jest.spyOn(actions, 'loadPublishers');
      const { searchPublishers } = mapDispatchToProps(jest.fn());
      const queryMock = 'foo';
      searchPublishers(queryMock);

      expect(loadPublishersSpy).toHaveBeenCalledWith(queryMock);
    });
  });

  describe('mapStateToProps', () => {
    const publishersMock: IPublisherDTO[] = [];
    const state = {
      auth: {
        profile: null,
      },
      publisher: {
        publishers: publishersMock,
      },
    } as IRootState;
    
    it('should map publishers', () => {
      const { publishers } = mapStateToProps(state);

      expect(publishers).toBe(publishersMock);
    });

    it('should map loggedIn', () => {
      const { loggedIn } = mapStateToProps(state);

      expect(loggedIn).toBe(false);
    });
  });
});
