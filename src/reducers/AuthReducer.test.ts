import { createAction } from '../actions';
import { ActionTypes } from '../actions/AuthActions';
import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import {
  initialState,
  reducer,
} from './AuthReducer';

describe('AuthReducer', () => {
  describe('initialState', () => {
    it('should initialise "profile" as null', () => {
      expect(initialState.profile).toBeNull();
    });
  });

  describe('reducer', () => {
    it('should handle LOAD_PROFILE_SUCCESS', () => {
      const profile: IProfileDTO = {
        avatarUrl: 'http://www.example.com/john_doe.png',
        email: 'john.doe@dummy.com',
        id: 1337,
        name: 'John Doe',
        username: 'J0hn_D03',
      };
      const action = createAction(ActionTypes.LOAD_PROFILE_SUCCESS, profile);
      const state = reducer(initialState, action);

      expect(state.profile).toBe(profile);
    });

    it('should handle an unknown action', () => {
      const state = reducer(initialState, { type: 'FOO_BAR' } as any);

      expect(state).toBe(initialState);
    });
  });
});
