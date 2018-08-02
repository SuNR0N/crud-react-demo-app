import { RootAction } from '../actions';

export interface IState {
  pendingRequests: { [key: string]: number };
}

export const initialState = {
  pendingRequests: {},
} as IState;

export const reducer = (state = initialState, action: RootAction): IState => {
  const requestRegExp = /^\[[a-zA-Z]*\][\sa-zA-Z]*Request$/;
  const successOrFailureRegExp = /(^\[[a-zA-Z]*\][\sa-zA-Z]*)(Success|Failure)$/;
  let newPendingRequests: { [key: string]: number };
  let newRequestCount: number;
  let requestCount: number | undefined;
  if (requestRegExp.test(action.type)) {
    requestCount = state.pendingRequests[action.type];
    newRequestCount = Number.isInteger(requestCount) ? requestCount + 1 : 1;
    newPendingRequests = { ...state.pendingRequests };
    newPendingRequests[action.type] = newRequestCount;
    return {
      ...state,
      pendingRequests: newPendingRequests,
    };
  } else if (successOrFailureRegExp.test(action.type)) {
    const requestType = action.type.replace(successOrFailureRegExp, '$1Request');
    requestCount = requestCount = state.pendingRequests[requestType];
    newPendingRequests = { ...state.pendingRequests };
    newPendingRequests[requestType] = requestCount - 1;
    return {
      ...state,
      pendingRequests: newPendingRequests,
    };
  } else {
    return state;
  }
};
