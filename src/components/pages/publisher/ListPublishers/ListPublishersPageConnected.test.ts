import {
  actions,
  ActionTypes,
} from '../../../../actions/PublisherActions';
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
    const initialState = {
      auth: {
        profile: null,
      },
      publisher: {
        publishers: publishersMock,
      },
      request: {
        pendingRequests: {},
      },
    } as IRootState;
    
    it('should map publishers', () => {
      const { publishers } = mapStateToProps(initialState);

      expect(publishers).toBe(publishersMock);
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

      it('should be mapped to true if the request count for LOAD_PUBLISHERS_REQUEST is greater than 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_PUBLISHERS_REQUEST] = 3;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(true);
      });

      it('should be mapped to false if the request count for LOAD_PUBLISHERS_REQUEST equals to 0', () => {
        state.request.pendingRequests[ActionTypes.LOAD_PUBLISHERS_REQUEST] = 0;
        const { isLoading } = mapStateToProps(state);

        expect(isLoading).toBe(false);
      });

      it('should be mapped to false if there is no key for LOAD_PUBLISHERS_REQUEST', () => {
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
