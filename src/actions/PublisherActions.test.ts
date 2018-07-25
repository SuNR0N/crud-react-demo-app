import {
  IHATEOASLink,
  INewPublisherDTO,
  IPublisherDTO,
} from '../interfaces';
import { IActionWithPayload } from './ActionHelpers';
import {
  actions,
  ActionTypes,
} from './PublisherActions';

describe('PublisherActions', () => {
  describe('createPublisher', () => {
    const publisher = {} as INewPublisherDTO;
    let action: IActionWithPayload<ActionTypes.CREATE_PUBLISHER_REQUEST, INewPublisherDTO>;
    
    beforeAll(() => {
      action = actions.createPublisher(publisher);
    });

    it('should create an action with type CREATE_PUBLISHER_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.CREATE_PUBLISHER_REQUEST);
    });

    it('should create an action which contains the publisher to be created as its payload', () => {
      expect(action.payload).toBe(publisher);
    });
  });

  describe('createPublisherFailed', () => {
    const publisher = {} as INewPublisherDTO;
    let action: IActionWithPayload<ActionTypes.CREATE_PUBLISHER_FAILURE, { data: INewPublisherDTO, message: string }>;
    
    beforeAll(() => {
      action = actions.createPublisherFailed(publisher, 'foo');
    });

    it('should create an action with type CREATE_PUBLISHER_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.CREATE_PUBLISHER_FAILURE);
    });

    it('should create an action which contains the publisher to be created within the payload as data', () => {
      expect(action.payload.data).toBe(publisher);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('createPublisherSucceeded', () => {
    let action: IActionWithPayload<ActionTypes.CREATE_PUBLISHER_SUCCESS, number>;
    
    beforeAll(() => {
      action = actions.createPublisherSucceeded(1);
    });

    it('should create an action with type CREATE_PUBLISHER_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.CREATE_PUBLISHER_SUCCESS);
    });

    it('should create an action which contains the id of the created publisher as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('deletePublisher', () => {
    const publisher = {} as IPublisherDTO;
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.DELETE_PUBLISHER_REQUEST, { data: IPublisherDTO, link: IHATEOASLink, route?: string }>;
    
    beforeAll(() => {
      action = actions.deletePublisher(publisher, link);
    });

    it('should create an action with type DELETE_PUBLISHER_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.DELETE_PUBLISHER_REQUEST);
    });

    it('should create an action which contains the publisher to be deleted within the payload as data', () => {
      expect(action.payload.data).toBe(publisher);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });

    it('should create an action which does not contain the route within the payload if it was not provided', () => {
      expect(action.payload.route).toBeUndefined();
    });

    it('should create an action which contains the route within the payload as route if it was provided', () => {
      action = actions.deletePublisher(publisher, link, 'foo');

      expect(action.payload.route).toBe('foo');
    });
  });

  describe('deletePublisherFailed', () => {
    let action: IActionWithPayload<ActionTypes.DELETE_PUBLISHER_FAILURE, { id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.deletePublisherFailed(1, 'foo');
    });

    it('should create an action with type DELETE_PUBLISHER_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.DELETE_PUBLISHER_FAILURE);
    });

    it('should create an action which contains the id of the publisher to be deleted within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('deletePublisherSucceeded', () => {
    let action: IActionWithPayload<ActionTypes.DELETE_PUBLISHER_SUCCESS, number>;
    
    beforeAll(() => {
      action = actions.deletePublisherSucceeded(1);
    });

    it('should create an action with type DELETE_PUBLISHER_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.DELETE_PUBLISHER_SUCCESS);
    });

    it('should create an action which contains the id of the deleted publisher as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('loadPublisher', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_PUBLISHER_REQUEST, number>;
    
    beforeAll(() => {
      action = actions.loadPublisher(1);
    });

    it('should create an action with type LOAD_PUBLISHER_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.LOAD_PUBLISHER_REQUEST);
    });

    it('should create an action which contains the id of the publisher to be loaded as its payload', () => {
      expect(action.payload).toBe(1);
    });
  });

  describe('loadPublisherFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_PUBLISHER_FAILURE, { id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.loadPublisherFailed(1, 'foo');
    });

    it('should create an action with type LOAD_PUBLISHER_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_PUBLISHER_FAILURE);
    });

    it('should create an action which contains the id of the publisher to be loaded within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadPublisherSucceeded', () => {
    const publisher = {} as IPublisherDTO;
    let action: IActionWithPayload<ActionTypes.LOAD_PUBLISHER_SUCCESS, IPublisherDTO>;
    
    beforeAll(() => {
      action = actions.loadPublisherSucceeded(publisher);
    });

    it('should create an action with type LOAD_PUBLISHER_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_PUBLISHER_SUCCESS);
    });

    it('should create an action which contains the loaded publisher as its payload', () => {
      expect(action.payload).toBe(publisher);
    });
  });

  describe('loadPublishers', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_PUBLISHERS_REQUEST, string | undefined>;
    
    beforeAll(() => {
      action = actions.loadPublishers('foo');
    });

    it('should create an action with type LOAD_PUBLISHERS_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.LOAD_PUBLISHERS_REQUEST);
    });

    it('should create an action which contains the query string as its payload', () => {
      expect(action.payload).toBe('foo');
    });

    it('should create an action which does not contain the query string as its payload if it was not provided', () => {
      action = actions.loadPublishers();
      
      expect(action.payload).toBeUndefined();
    });
  });

  describe('loadPublishersFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_PUBLISHERS_FAILURE, { message: string }>;
    
    beforeAll(() => {
      action = actions.loadPublishersFailed('foo');
    });

    it('should create an action with type LOAD_PUBLISHERS_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_PUBLISHERS_FAILURE);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadPublishersSucceeded', () => {
    const publishers: IPublisherDTO[] = [];
    let action: IActionWithPayload<ActionTypes.LOAD_PUBLISHERS_SUCCESS, IPublisherDTO[]>;
    
    beforeAll(() => {
      action = actions.loadPublishersSucceeded(publishers);
    });

    it('should create an action with type LOAD_PUBLISHERS_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_PUBLISHERS_SUCCESS);
    });

    it('should create an action which contains the loaded publishers as its payload', () => {
      expect(action.payload).toBe(publishers);
    });
  });

  describe('updatePublisher', () => {
    const publisher = {} as INewPublisherDTO;
    const link = {} as IHATEOASLink;
    let action: IActionWithPayload<ActionTypes.UPDATE_PUBLISHER_REQUEST, { data: INewPublisherDTO, id: number, link: IHATEOASLink }>;
    
    beforeAll(() => {
      action = actions.updatePublisher(publisher, 1, link);
    });

    it('should create an action with type UPDATE_PUBLISHER_REQUEST', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_PUBLISHER_REQUEST);
    });

    it('should create an action which contains the new publisher properties within the payload as data', () => {
      expect(action.payload.data).toBe(publisher);
    });

    it('should create an action which contains the id of the publisher within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the link within the payload as link', () => {
      expect(action.payload.link).toBe(link);
    });
  });

  describe('updatePublisherFailed', () => {
    const publisher = {} as INewPublisherDTO;
    let action: IActionWithPayload<ActionTypes.UPDATE_PUBLISHER_FAILURE, { data: INewPublisherDTO, id: number, message: string }>;
    
    beforeAll(() => {
      action = actions.updatePublisherFailed(publisher, 1, 'foo');
    });

    it('should create an action with type UPDATE_PUBLISHER_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_PUBLISHER_FAILURE);
    });

    it('should create an action which contains the new publisher properties within the payload as data', () => {
      expect(action.payload.data).toBe(publisher);
    });

    it('should create an action which contains the id of the publisher within the payload as id', () => {
      expect(action.payload.id).toBe(1);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('updatePublisherSucceeded', () => {
    const publisher = {} as IPublisherDTO;
    let action: IActionWithPayload<ActionTypes.UPDATE_PUBLISHER_SUCCESS, IPublisherDTO>;
    
    beforeAll(() => {
      action = actions.updatePublisherSucceeded(publisher);
    });

    it('should create an action with type UPDATE_PUBLISHER_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.UPDATE_PUBLISHER_SUCCESS);
    });

    it('should create an action which contains the updated publisher as its payload', () => {
      expect(action.payload).toBe(publisher);
    });
  });
});
