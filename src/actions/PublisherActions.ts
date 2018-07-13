import {
  INewPublisherDTO,
  IPublisherDTO,
} from '../interfaces';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  CREATE_PUBLISHER = '[Publisher] Create Publisher',
  LOAD_PUBLISHER_FAILURE = '[Publisher] Load Publisher Failure',
  LOAD_PUBLISHER_REQUEST = '[Publisher] Load Publisher Request',
  LOAD_PUBLISHER_SUCCESS = '[Publisher] Load Publisher Success',
  LOAD_PUBLISHERS_FAILURE = '[Publisher] Load Publishers Failure',
  LOAD_PUBLISHERS_REQUEST = '[Publisher] Load Publishers Request',
  LOAD_PUBLISHERS_SUCCESS = '[Publisher] Load Publishers Success',
};

export const actions = {
  createPublisher: (publisher: INewPublisherDTO) => createAction(ActionTypes.CREATE_PUBLISHER, publisher),
  loadPublisher: (id: number) => createAction(ActionTypes.LOAD_PUBLISHER_REQUEST, id),
  loadPublisherFailed: (id: number) => createAction(ActionTypes.LOAD_PUBLISHER_FAILURE, id),
  loadPublisherSucceeded: (publisher: IPublisherDTO) => createAction(ActionTypes.LOAD_PUBLISHER_SUCCESS, publisher),
  loadPublishers: () => createAction(ActionTypes.LOAD_PUBLISHERS_REQUEST),
  loadPublishersFailed: () => createAction(ActionTypes.LOAD_PUBLISHERS_FAILURE),
  loadPublishersSucceeded: (publishers: IPublisherDTO[]) => createAction(ActionTypes.LOAD_PUBLISHERS_SUCCESS, publishers),
}

export type Actions = ActionsUnion<typeof actions>;