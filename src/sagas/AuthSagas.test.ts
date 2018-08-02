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
  IAction,
} from '../actions';
import {
  Actions,
  ActionTypes,
} from '../actions/AuthActions';
import { AuthApi } from '../api/AuthApi';
import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import {
  authSagas,
  loadProfile,
  logOut,
} from './AuthSagas';

describe('AuthSagas', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('loadProfile', () => {
    const loadProfileAction: IAction<ActionTypes.LOAD_PROFILE_REQUEST> = createAction(
      ActionTypes.LOAD_PROFILE_REQUEST
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      const profileMock: IProfileDTO = {
        avatarUrl: 'http://www.example.com/john_doe.png',
        email: 'john.doe@dummy.com',
        id: 1337,
        name: 'John Doe',
        username: 'J0hn_D03',
      };

      beforeEach(() => {
        mockResponseOnce(JSON.stringify(profileMock));
      });

      it('should call the getProfile function with the payload', async () => {
        const getProfileSpy = jest.spyOn(AuthApi, 'getProfile');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadProfile, loadProfileAction).done;
  
        expect(getProfileSpy).toHaveBeenCalled();
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadProfile, loadProfileAction).done;

        expect(dispatched).toContainEqual({
          payload: profileMock,
          type: '[Auth] Load Profile Success',
        });
      });
    });

    describe('given the request fails', () => {
      beforeEach(() => {
        mockResponseOnce('Foo', { status: 418 });
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, loadProfile, loadProfileAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            message: 'Foo',
          },
          type: '[Auth] Load Profile Failure',
        });
      });
    });
  });

  describe('logOut', () => {
    const logOutAction: IAction<ActionTypes.LOG_OUT_REQUEST> = createAction(
      ActionTypes.LOG_OUT_REQUEST
    );
    let dispatched: Actions[];

    beforeEach(() => {
      dispatched = [];
    });
    
    describe('given the request succeeds', () => {
      let reloadSpy: jest.Mock;
      
      beforeEach(() => {
        mockResponseOnce('');
        reloadSpy = jest.spyOn(window.location, 'reload')
          .mockImplementation(() => true);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('should call the logOut function with the payload', async () => {
        const logOutSpy = jest.spyOn(AuthApi, 'logOut');
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, logOut, logOutAction).done;
  
        expect(logOutSpy).toHaveBeenCalled();
      });

      it('should dispatch a success action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, logOut, logOutAction).done;

        expect(dispatched).toContainEqual({
          type: '[Auth] Log Out Success',
        });
      });

      it('should reload the current location', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, logOut, logOutAction).done;

        expect(reloadSpy).toHaveBeenCalledWith(true);
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
        }, logOut, logOutAction).done;

        expect(errorSpy).toHaveBeenCalledWith('Log Out Failed', 'Foo');
      });

      it('should dispatch a failed action', async () => {
        await runSaga({
          dispatch: (action: any) => dispatched.push(action),
        }, logOut, logOutAction).done;

        expect(dispatched).toContainEqual({
          payload: {
            message: 'Foo',
          },
          type: '[Auth] Log Out Failure',
        });
      });
    });
  });

  describe('authSagas', () => {
    let value: AllEffect;
    
    beforeEach(() => {
      const iterator = authSagas();
      value = iterator.next().value;
    });

    it('should trigger loadProfile on LOAD_PROFILE_REQUEST', async () => {      
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOAD_PROFILE_REQUEST, loadProfile)
      );
    });

    it('should trigger logOut on LOG_OUT_REQUEST', () => {
      expect(value.ALL).toContainEqual(
        takeEvery(ActionTypes.LOG_OUT_REQUEST, logOut)
      );
    });
  });
});
