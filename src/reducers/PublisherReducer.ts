import {
  Actions,
  ActionTypes,
} from '../actions/PublisherActions';
import { IPublisherDTO } from '../interfaces/dtos/PublisherDTO';

export interface IState {
  publishers: IPublisherDTO[],
  currentPublisher: IPublisherDTO,
}

export const initialState = {
  currentPublisher: {},
  publishers: [] as IPublisherDTO[],
} as IState;

export const reducer = (state = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.CREATE_PUBLISHER:
      return state;
    case ActionTypes.LOAD_PUBLISHER_SUCCESS:
      return {
        ...state,
        currentPublisher: action.payload,
      }
    case ActionTypes.LOAD_PUBLISHERS_SUCCESS:
      return {
        ...state,
        publishers: action.payload,
      }
    default:
      return state;
  }
}