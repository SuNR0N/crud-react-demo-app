import { push } from 'react-router-redux';
import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

import {
  IActionWithPayload,
  PublisherActions,
  PublisherActionTypes,
} from '../actions';
import {
  PublishersApi,
  ResourceApi,
} from '../api';
import { RouteConfig } from '../config/RouteConfig';
import {
  INewPublisherDTO,
  IPublisherDTO,
  IResourceParams,
} from '../interfaces';

function* deletePublisher(action: IActionWithPayload<PublisherActionTypes.DELETE_PUBLISHER_REQUEST, IResourceParams<IPublisherDTO>>) {
  try {
    yield call(ResourceApi.request, action.payload);
    yield put(PublisherActions.deletePublisherSucceeded(action.payload.data!.id));
    if (action.payload.route) {
      yield put(push(action.payload.route));
    }
  } catch (error) {
    yield put(PublisherActions.deletePublisherFailed());
  }
}

function* createPublisher(action: IActionWithPayload<PublisherActionTypes.CREATE_PUBLISHER_REQUEST, INewPublisherDTO>) {
  try {
    const id = yield call(PublishersApi.createPublisher, action.payload);
    yield put(PublisherActions.createPublisherSucceeded(id));
    yield put(push(RouteConfig.publishers));
  } catch (error) {
    yield put(PublisherActions.createPublisherFailed(action.payload));
  }
}

function* loadPublisher(action: IActionWithPayload<PublisherActionTypes.LOAD_PUBLISHER_REQUEST, number>) {
  try {
    const publisher = yield call(PublishersApi.getPublisher, action.payload);
    yield put(PublisherActions.loadPublisherSucceeded(publisher));
  } catch (error) {
    yield put(PublisherActions.loadPublisherFailed(action.payload));
  }
}

function* loadPublishers(action: IActionWithPayload<PublisherActionTypes.LOAD_PUBLISHERS_REQUEST, string | undefined>) {
  try {
    const publishers = yield call(PublishersApi.getPublishers, action.payload);
    yield put(PublisherActions.loadPublishersSucceeded(publishers));
  } catch (error) {
    yield put(PublisherActions.loadPublishersFailed());
  }
}

function* updatePublisher(action: IActionWithPayload<PublisherActionTypes.UPDATE_PUBLISHER_REQUEST, IResourceParams<INewPublisherDTO>>) {
  try {
    const publisher: IPublisherDTO = yield call(ResourceApi.request, action.payload);
    yield put(PublisherActions.updatePublisherSucceeded(publisher));
    yield put(push(RouteConfig.viewPublisher.replace(':id', String(publisher.id))));
  } catch (error) {
    yield put(PublisherActions.updatePublisherFailed(action.payload.data!));
  }
}

export function* publisherSagas() {
  yield all([
    takeEvery(PublisherActionTypes.CREATE_PUBLISHER_REQUEST, createPublisher),
    takeEvery(PublisherActionTypes.DELETE_PUBLISHER_REQUEST, deletePublisher),
    takeEvery(PublisherActionTypes.LOAD_PUBLISHER_REQUEST, loadPublisher),
    takeEvery(PublisherActionTypes.LOAD_PUBLISHERS_REQUEST, loadPublishers),
    takeEvery(PublisherActionTypes.UPDATE_PUBLISHER_REQUEST, updatePublisher),
  ]);
}