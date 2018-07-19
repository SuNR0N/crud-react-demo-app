import {
  IHATEOASLink,
  INewPublisherDTO,
  IPublisherDTO,
} from '../interfaces';
import { createAction } from './ActionHelpers';
import { ActionsUnion } from './types';

export enum ActionTypes {
  CREATE_PUBLISHER_FAILURE = '[Publisher] Create Publisher Failure',
  CREATE_PUBLISHER_REQUEST = '[Publisher] Create Publisher Request',
  CREATE_PUBLISHER_SUCCESS = '[Publisher] Create Publisher Success',
  DELETE_PUBLISHER_FAILURE = '[Author] Delete Publisher Failure',
  DELETE_PUBLISHER_REQUEST = '[Author] Delete Publisher Request',
  DELETE_PUBLISHER_SUCCESS = '[Author] Delete Publisher Success',
  LOAD_PUBLISHER_FAILURE = '[Publisher] Load Publisher Failure',
  LOAD_PUBLISHER_REQUEST = '[Publisher] Load Publisher Request',
  LOAD_PUBLISHER_SUCCESS = '[Publisher] Load Publisher Success',
  LOAD_PUBLISHERS_FAILURE = '[Publisher] Load Publishers Failure',
  LOAD_PUBLISHERS_REQUEST = '[Publisher] Load Publishers Request',
  LOAD_PUBLISHERS_SUCCESS = '[Publisher] Load Publishers Success',
  UPDATE_PUBLISHER_FAILURE = '[Author] Update Publisher Failure',
  UPDATE_PUBLISHER_REQUEST = '[Author] Update Publisher Request',
  UPDATE_PUBLISHER_SUCCESS = '[Author] Update Publisher Success',
};

export const actions = {
  createPublisher: (publisher: INewPublisherDTO) => createAction(ActionTypes.CREATE_PUBLISHER_REQUEST, publisher),
  createPublisherFailed: (publisher: INewPublisherDTO) => createAction(ActionTypes.CREATE_PUBLISHER_FAILURE, publisher),
  createPublisherSucceeded: (id: number) => createAction(ActionTypes.CREATE_PUBLISHER_SUCCESS, id),
  deletePublisher: (publisher: IPublisherDTO, link: IHATEOASLink, route?: string) => createAction(ActionTypes.DELETE_PUBLISHER_REQUEST, { data: publisher, link, route }),
  deletePublisherFailed: () => createAction(ActionTypes.DELETE_PUBLISHER_FAILURE),
  deletePublisherSucceeded: (id: number) => createAction(ActionTypes.DELETE_PUBLISHER_SUCCESS, id),
  loadPublisher: (id: number) => createAction(ActionTypes.LOAD_PUBLISHER_REQUEST, id),
  loadPublisherFailed: (id: number) => createAction(ActionTypes.LOAD_PUBLISHER_FAILURE, id),
  loadPublisherSucceeded: (publisher: IPublisherDTO) => createAction(ActionTypes.LOAD_PUBLISHER_SUCCESS, publisher),
  loadPublishers: (query?: string) => createAction(ActionTypes.LOAD_PUBLISHERS_REQUEST, query),
  loadPublishersFailed: () => createAction(ActionTypes.LOAD_PUBLISHERS_FAILURE),
  loadPublishersSucceeded: (publishers: IPublisherDTO[]) => createAction(ActionTypes.LOAD_PUBLISHERS_SUCCESS, publishers),
  updatePublisher: (publisher: INewPublisherDTO, link: IHATEOASLink) => createAction(ActionTypes.UPDATE_PUBLISHER_REQUEST, { data: publisher, link }),
  updatePublisherFailed: (publisher: INewPublisherDTO) => createAction(ActionTypes.UPDATE_PUBLISHER_FAILURE, publisher),
  updatePublisherSucceeded: (publisher: IPublisherDTO) => createAction(ActionTypes.UPDATE_PUBLISHER_SUCCESS, publisher),
}

export type Actions = ActionsUnion<typeof actions>;