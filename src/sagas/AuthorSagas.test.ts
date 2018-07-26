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
} from '../actions/AuthorActions';
import {
  AuthorsApi,
  ResourceApi,
} from '../api';
import {
  IAuthorDTO,
  IAuthorUpdateDTO,
  IHATEOASLink,
  INewAuthorDTO,
  IResourceParams,
} from '../interfaces';
import {
  authorSagas,
  createAuthor,
  deleteAuthor,
  loadAuthor,
  loadAuthors,
  updateAuthor,
} from './AuthorSagas';

describe('AuthorSagas', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('deleteAuthor', () => {
    const deleteAuthorAction: IActionWithPayload<ActionTypes.DELETE_AUTHOR_REQUEST, IResourceParams<IAuthorDTO>> = createAction(
      ActionTypes.DELETE_AUTHOR_REQUEST,
      {
        data: {
          id: 1
        } as IAuthorDTO,
        link: {
          href: '/api/v1/authors/1',
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
        }, deleteAuthor, deleteAuthorAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(deleteAuthorAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteAuthor, deleteAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: 1,
          type: '[Author] Delete Author Success',
        });
      });

      it('should dispatch a route change action if the route is defined within the payload', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteAuthor, {
          ...deleteAuthorAction,
          payload: {
            ...deleteAuthorAction.payload,
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
        }, deleteAuthor, deleteAuthorAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Author Deletion Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, deleteAuthor, deleteAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            id: 1,
            message: 'Foo',
          },
          type: '[Author] Delete Author Failure',
        });
      });
    });
  });

  describe('createAuthor', () => {
    const newAuthor: INewAuthorDTO = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const createAuthorAction: IActionWithPayload<ActionTypes.CREATE_AUTHOR_REQUEST, INewAuthorDTO> = createAction(
      ActionTypes.CREATE_AUTHOR_REQUEST,
      newAuthor,
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      beforeEach(() => {
        mockResponseOnce('', {
          headers: {
            Location: '/api/v1/authors/1',
          },
          status: 201,
        });
      });

      it('should call the createAuthor function with the payload', async () => {
        const createAuthorSpy = jest.spyOn(AuthorsApi, 'createAuthor');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createAuthor, createAuthorAction).done;
  
        expect(createAuthorSpy).toHaveBeenCalledWith(createAuthorAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createAuthor, createAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: 1,
          type: '[Author] Create Author Success',
        });
      });

      it('should dispatch a route change action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createAuthor, createAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['/authors'],
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
        }, createAuthor, createAuthorAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Author Creation Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, createAuthor, createAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            data: newAuthor,
            message: 'Foo',
          },
          type: '[Author] Create Author Failure',
        });
      });
    });
  });

  describe('loadAuthor', () => {
    const loadAuthorAction: IActionWithPayload<ActionTypes.LOAD_AUTHOR_REQUEST, number> = createAction(
      ActionTypes.LOAD_AUTHOR_REQUEST,
      1
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const authorMock: IAuthorDTO = {
        _links: {
          self: {
            href: '/api/v1/authors/1',
            method: 'GET',
          },
        },
        firstName: 'John',
        fullName: 'John Doe',
        id: 1,
        lastName: 'Doe',
      };
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(authorMock));
      });

      it('should call the getAuthor function with the payload', async () => {
        const getAuthorSpy = jest.spyOn(AuthorsApi, 'getAuthor');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadAuthor, loadAuthorAction).done;
  
        expect(getAuthorSpy).toHaveBeenCalledWith(loadAuthorAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadAuthor, loadAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: authorMock,
          type: '[Author] Load Author Success',
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
        }, loadAuthor, loadAuthorAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Author Load Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadAuthor, loadAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            id: 1,
            message: 'Foo',
          },
          type: '[Author] Load Author Failure',
        });
      });
    });
  });

  describe('loadAuthors', () => {
    const loadAuthorsAction: IActionWithPayload<ActionTypes.LOAD_AUTHORS_REQUEST, string | undefined> = createAction(
      ActionTypes.LOAD_AUTHORS_REQUEST,
      undefined,
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const authorsMock: IAuthorDTO[] = [
        {
          _links: {
            self: {
              href: '/api/v1/authors/1',
              method: 'GET',
            },
          },
          firstName: 'John',
          fullName: 'John Doe',
          id: 1,
          lastName: 'Doe',
        },
        {
          _links: {
            self: {
              href: '/api/v1/authors/2',
              method: 'GET',
            },
          },
          firstName: 'Jane',
          fullName: 'Jane Doe',
          id: 2,
          lastName: 'Doe',
        }
      ];
      
      beforeEach(() => {
        mockResponseOnce(JSON.stringify(authorsMock));
      });

      it('should call the getAuthors function with the payload', async () => {
        const getAuthorsSpy = jest.spyOn(AuthorsApi, 'getAuthors');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadAuthors, loadAuthorsAction).done;
  
        expect(getAuthorsSpy).toHaveBeenCalledWith(loadAuthorsAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadAuthors, loadAuthorsAction).done;

        expect(dispatched).toContainEqual({
          payload: authorsMock,
          type: '[Author] Load Authors Success',
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
        }, loadAuthors, loadAuthorsAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Authors Load Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadAuthors, loadAuthorsAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            message: 'Foo',
          },
          type: '[Author] Load Authors Failure',
        });
      });
    });
  });

  describe('updateAuthor', () => {
    const authorUpdate: IAuthorUpdateDTO = {
      firstName: 'Jane',
    };
    const updateAuthorAction: IActionWithPayload<ActionTypes.UPDATE_AUTHOR_REQUEST, IResourceParams<IAuthorUpdateDTO>> = createAction(
      ActionTypes.UPDATE_AUTHOR_REQUEST,
      {
        data: authorUpdate,
        id: 1,
        link: {
          href: '/api/v1/authors/1',
          method: 'PATCH', 
        } as IHATEOASLink,
      }
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const updatedAuthor: IAuthorDTO = {
        _links: {
          self: {
            href: '/api/v1/authors/1',
            method: 'GET',
          },
        },
        firstName: 'Jane',
        fullName: 'Jane Doe',
        id: 1,
        lastName: 'Doe',
      };

      beforeEach(() => {
        mockResponseOnce(JSON.stringify(updatedAuthor));
      });

      it('should call the request function with the payload', async () => {
        const requestSpy = jest.spyOn(ResourceApi, 'request');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateAuthor, updateAuthorAction).done;
  
        expect(requestSpy).toHaveBeenCalledWith(updateAuthorAction.payload);
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateAuthor, updateAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: updatedAuthor,
          type: '[Author] Update Author Success',
        });
      });

      it('should dispatch a route change action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateAuthor, updateAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            args: ['/authors/1'],
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
        }, updateAuthor, updateAuthorAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Author Update Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, updateAuthor, updateAuthorAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            data: authorUpdate,
            id: 1,
            message: 'Foo',
          },
          type: '[Author] Update Author Failure',
        });
      });
    });
  });

  describe('authorSagas', () => {
    let value: AllEffect;
    
    beforeEach(() => {
      const iterator = authorSagas();
      value = iterator.next().value;
    })

    it('should trigger createAuthor on CREATE_AUTHOR_REQUEST', async () => {      
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.CREATE_AUTHOR_REQUEST, createAuthor)
      );
    });

    it('should trigger deleteAuthor on DELETE_AUTHOR_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.DELETE_AUTHOR_REQUEST, deleteAuthor)
      );
    });

    it('should trigger loadAuthor on LOAD_AUTHOR_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_AUTHOR_REQUEST, loadAuthor)
      );
    });

    it('should trigger loadAuthors on LOAD_AUTHORS_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_AUTHORS_REQUEST, loadAuthors)
      );
    });

    it('should trigger updateAuthor on UPDATE_AUTHOR_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.UPDATE_AUTHOR_REQUEST, updateAuthor)
      );
    });
  });
});
