import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  LOAD_PROFILE_FAILURE = '[Auth] Load Profile Failure',
  LOAD_PROFILE_REQUEST = '[Auth] Load Profile Request',
  LOAD_PROFILE_SUCCESS = '[Auth] Load Profile Success',
  LOG_OUT_FAILURE = '[Auth] Log Out Failure',
  LOG_OUT_REQUEST = '[Auth] Log Out Request',
  LOG_OUT_SUCCESS = '[Auth] Log Out Success',
}

export const actions = {
  loadProfile: () => createAction(ActionTypes.LOAD_PROFILE_REQUEST),
  loadProfileFailed: (message: string) => createAction(
    ActionTypes.LOAD_PROFILE_FAILURE,
    { message }
  ),
  loadProfileSucceeded: (profile: IProfileDTO) => createAction(
    ActionTypes.LOAD_PROFILE_SUCCESS,
    profile
  ),
  logOut: () => createAction(ActionTypes.LOG_OUT_REQUEST),
  logOutFailed: (message: string) => createAction(
    ActionTypes.LOG_OUT_FAILURE,
    { message }
  ),
  logOutSucceeded: () => createAction(ActionTypes.LOG_OUT_SUCCESS),
};

export type Actions = ActionsUnion<typeof actions>;