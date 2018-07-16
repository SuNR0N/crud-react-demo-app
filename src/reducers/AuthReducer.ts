import {
  Actions,
  ActionTypes,
} from '../actions/AuthActions';
import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';

export interface IState {
  profile: IProfileDTO | null,
}

export const initialState = {
  profile: null,
} as IState;

export const reducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      }
    default:
      return state;
  }
}