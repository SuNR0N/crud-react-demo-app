import { actions } from '../../../../actions/PublisherActions';
import { 
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './ViewPublisherPageConnected';

describe('ViewPublisherPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the deletePublisher function', () => {
      const deletePublisherSpy = jest.spyOn(actions, 'deletePublisher');
      const { deletePublisher } = mapDispatchToProps(jest.fn());
      const publisherMock = {} as IPublisherDTO;
      const linkMock = {} as IHATEOASLink;
      deletePublisher(publisherMock, linkMock);

      expect(deletePublisherSpy).toHaveBeenCalledWith(publisherMock, linkMock, undefined);
    });

    it('should map the loadPublisher function', async () => {
      const loadPublisherSpy = jest.spyOn(actions, 'loadPublisher');
      const { loadPublisher } = mapDispatchToProps(jest.fn());
      const idMock = 1;
      loadPublisher(idMock);

      expect(loadPublisherSpy).toHaveBeenCalledWith(idMock);
    });
  });

  describe('mapStateToProps', () => {
    it('should map publisher', () => {
      const publisherMock = {} as IPublisherDTO;
      const state = {
        publisher: {
          currentPublisher: publisherMock,
        },
      } as IRootState;
      const { publisher } = mapStateToProps(state);

      expect(publisher).toBe(publisherMock);
    });
  });
});
