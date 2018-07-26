import {
  mockResponseOnce,
  resetMocks,
} from 'jest-fetch-mock';
import { toastr } from 'react-redux-toastr';
import { runSaga } from 'redux-saga';
import {
  AllEffect,
  takeEvery,
} from 'redux-saga/effects';

import {
  createAction,
  IActionWithPayload,
} from '../actions';
import {
  Actions,
  ActionTypes,
} from '../actions/PublisherActions';
import {
  PublishersApi,
  ResourceApi,
} from '../api';
import {
  IHATEOASLink,
  INewPublisherDTO,
  IPublisherDTO,
  IResourceParams,
} from '../interfaces';
import {
  createPublisher,
  deletePublisher,
  loadPublisher,
  loadPublishers,
  publisherSagas,
  updatePublisher,
} from './PublisherSagas';

describe('PublisherSagas', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('deletePublisher', () => {
    const deletePublisherAction: IActionWithPayload<ActionTypes.DELETE_PUBLISHER_REQUEST, IResourceParams<IPublisherDTO>> = createAction(
      ActionTypes.DELETE_PUBLISHER_REQUEST,
      {
        data: {
          id: 1
        } as IPublisherDTO,
        link: {
          href: '/api/v1/publishers/1',
          method: 'DELETE', 
        } as IHATEOASLink,
      }
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      beforeEach(() => {
        mockResponseOnce('', { status: 204 });
      });

      it('should call the request function with the payload', async () => {
        const requestSpy = jest.spyOn(ResourceApi, 'request');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deletePublisher, deletePublisherAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(deletePublisherAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deletePublisher, deletePublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: 1,
          type: '[Publisher] Delete Publisher Success',
        });
      });

      it('should dispatch a route change action if the route is defined within the payload', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deletePublisher, {
          ...deletePublisherAction,
          payload: {
            ...deletePublisherAction.payload,
            route: 'foo',
          },
        }).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['foo'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deletePublisher, deletePublisherAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Publisher Deletion Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deletePublisher, deletePublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            id: 1,
            message: 'Foo',
          },
          type: '[Publisher] Delete Publisher Failure',
        });
      });
    });
  });

  describe('createPublisher', () => {
    const newPublisher: INewPublisherDTO = {
      name: 'Foo',
    };
    const createPublisherAction: IActionWithPayload<ActionTypes.CREATE_PUBLISHER_REQUEST, INewPublisherDTO> = createAction(
      ActionTypes.CREATE_PUBLISHER_REQUEST,
      newPublisher,
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      beforeEach(() => {
        mockResponseOnce('', {
          headers: {
            Location: '/api/v1/publishers/1',
          },
          status: 201,
        });
      });

      it('should call the createPublisher function with the payload', async () => {
        const createPublisherSpy = jest.spyOn(PublishersApi, 'createPublisher');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createPublisher, createPublisherAction).done;
  
        expect(createPublisherSpy).toHaveBeenCalledWith(createPublisherAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createPublisher, createPublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: 1,
          type: '[Publisher] Create Publisher Success',
        });
      });

      it('should dispatch a route change action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createPublisher, createPublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['/publishers'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createPublisher, createPublisherAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Publisher Creation Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createPublisher, createPublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            data: newPublisher,
            message: 'Foo',
          },
          type: '[Publisher] Create Publisher Failure',
        });
      });
    });
  });

  describe('loadPublisher', () => {
    const loadPublisherAction: IActionWithPayload<ActionTypes.LOAD_PUBLISHER_REQUEST, number> = createAction(
      ActionTypes.LOAD_PUBLISHER_REQUEST,
      1
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const publisherMock: IPublisherDTO = {
        _links: {
          self: {
            href: '/api/v1/publishers/1',
            method: 'GET',
          },
        },
        id: 1,
        name: 'Foo',
      };
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(publisherMock));
      });

      it('should call the getPublisher function with the payload', async () => {
        const getPublisherSpy = jest.spyOn(PublishersApi, 'getPublisher');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadPublisher, loadPublisherAction).done;
  
        expect(getPublisherSpy).toHaveBeenCalledWith(loadPublisherAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadPublisher, loadPublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: publisherMock,
          type: '[Publisher] Load Publisher Success',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadPublisher, loadPublisherAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Publisher Load Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadPublisher, loadPublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            id: 1,
            message: 'Foo',
          },
          type: '[Publisher] Load Publisher Failure',
        });
      });
    });
  });

  describe('loadPublishers', () => {
    const loadPublishersAction: IActionWithPayload<ActionTypes.LOAD_PUBLISHERS_REQUEST, string | undefined> = createAction(
      ActionTypes.LOAD_PUBLISHERS_REQUEST,
      undefined,
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const publishersMock: IPublisherDTO[] = [
        {
          _links: {
            self: {
              href: '/api/v1/publishers/1',
              method: 'GET',
            },
          },
          id: 1,
          name: 'Foo',
        },
        {
          _links: {
            self: {
              href: '/api/v1/publishers/2',
              method: 'GET',
            },
          },
          id: 2,
          name: 'Bar',
        }
      ];
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(publishersMock));
      });

      it('should call the getPublishers function with the payload', async () => {
        const getPublishersSpy = jest.spyOn(PublishersApi, 'getPublishers');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadPublishers, loadPublishersAction).done;
  
        expect(getPublishersSpy).toHaveBeenCalledWith(loadPublishersAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadPublishers, loadPublishersAction).done;

        expect(dispatched).toContainEqual({
          payload: publishersMock,
          type: '[Publisher] Load Publishers Success',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadPublishers, loadPublishersAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Publishers Load Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadPublishers, loadPublishersAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            message: 'Foo',
          },
          type: '[Publisher] Load Publishers Failure',
        });
      });
    });
  });

  describe('updatePublisher', () => {
    const publisherUpdate: INewPublisherDTO = {
      name: 'Bar',
    };
    const updatePublisherAction: IActionWithPayload<ActionTypes.UPDATE_PUBLISHER_REQUEST, IResourceParams<INewPublisherDTO>> = createAction(
      ActionTypes.UPDATE_PUBLISHER_REQUEST,
      {
        data: publisherUpdate,
        id: 1,
        link: {
          href: '/api/v1/publishers/1',
          method: 'PUT', 
        } as IHATEOASLink,
      }
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const updatedPublisher: IPublisherDTO = {
        _links: {
          self: {
            href: '/api/v1/publishers/1',
            method: 'GET',
          },
        },
        id: 1,
        name: 'Bar',
      };

      beforeEach(() => {
        mockResponseOnce(JSON.stringify(updatedPublisher));
      });

      it('should call the request function with the payload', async () => {
        const requestSpy = jest.spyOn(ResourceApi, 'request');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updatePublisher, updatePublisherAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(updatePublisherAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updatePublisher, updatePublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: updatedPublisher,
          type: '[Publisher] Update Publisher Success',
        });
      });

      it('should dispatch a route change action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updatePublisher, updatePublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['/publishers/1'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should call the error function of toastr', async () => {
        const errorSpy = jest.spyOn(toastr, 'error');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updatePublisher, updatePublisherAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Publisher Update Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updatePublisher, updatePublisherAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            data: publisherUpdate,
            id: 1,
            message: 'Foo',
          },
          type: '[Publisher] Update Publisher Failure',
        });
      });
    });
  });

  describe('publisherSagas', () => {
    let value: AllEffect;
    
    beforeEach(() => {
      const iterator = publisherSagas();
      value = iterator.next().value;
    })

    it('should trigger createPublisher on CREATE_PUBLISHER_REQUEST', async () => {      
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.CREATE_PUBLISHER_REQUEST, createPublisher)
      );
    });

    it('should trigger deletePublisher on DELETE_PUBLISHER_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.DELETE_PUBLISHER_REQUEST, deletePublisher)
      );
    });

    it('should trigger loadPublisher on LOAD_PUBLISHER_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_PUBLISHER_REQUEST, loadPublisher)
      );
    });

    it('should trigger loadPublishers on LOAD_PUBLISHERS_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_PUBLISHERS_REQUEST, loadPublishers)
      );
    });

    it('should trigger updatePublisher on UPDATE_PUBLISHER_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.UPDATE_PUBLISHER_REQUEST, updatePublisher)
      );
    });
  });
});
