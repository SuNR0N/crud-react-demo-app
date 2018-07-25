import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { IActionWithPayload } from './ActionHelpers';
import {
  actions,
  ActionTypes,
} from './AuthActions';

describe('AuthActions', () => {
  describe('loadProfile', () => {
    it('should create an action with type LOAD_PROFILE_REQUEST', () => {
      const action = actions.loadProfile();

      expect(action.type).toBe(ActionTypes.LOAD_PROFILE_REQUEST);
    });
  });

  describe('loadProfileFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOAD_PROFILE_FAILURE, { message: string }>;
    
    beforeAll(() => {
      action = actions.loadProfileFailed('foo');
    });

    it('should create an action with type LOAD_PROFILE_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOAD_PROFILE_FAILURE);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('loadProfileSucceeded', () => {
    const profile = {} as IProfileDTO;
    let action: IActionWithPayload<ActionTypes.LOAD_PROFILE_SUCCESS, IProfileDTO>;
    
    beforeAll(() => {
      action = actions.loadProfileSucceeded(profile);
    });

    it('should create an action with type LOAD_PROFILE_SUCCESS', () => {
      expect(action.type).toBe(ActionTypes.LOAD_PROFILE_SUCCESS);
    });

    it('should create an action which contains the profile as its payload', () => {
      expect(action.payload).toBe(profile);
    });
  });

  describe('logOut', () => {
    it('should create an action with type LOG_OUT_REQUEST', () => {
      const action = actions.logOut();

      expect(action.type).toBe(ActionTypes.LOG_OUT_REQUEST);
    });
  });

  describe('logOutFailed', () => {
    let action: IActionWithPayload<ActionTypes.LOG_OUT_FAILURE, { message: string }>;
    
    beforeAll(() => {
      action = actions.logOutFailed('foo');
    });

    it('should create an action with type LOG_OUT_FAILURE', () => {
      expect(action.type).toBe(ActionTypes.LOG_OUT_FAILURE);
    });

    it('should create an action which contains the message within the payload as message', () => {
      expect(action.payload.message).toBe('foo');
    });
  });

  describe('logOutSucceeded', () => {
    it('should create an action with type LOG_OUT_SUCCESS', () => {
      const action = actions.logOutSucceeded();

      expect(action.type).toBe(ActionTypes.LOG_OUT_SUCCESS);
    });
  });
});
