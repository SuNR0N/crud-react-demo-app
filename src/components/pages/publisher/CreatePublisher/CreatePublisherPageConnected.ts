import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isValid,
  submit,
} from 'redux-form';

import { actions } from '../../../../actions/PublisherActions';
import { CREATE_PUBLISHER_FORM } from '../../../../constants/forms';
import { INewPublisherDTO } from '../../../../interfaces/dtos/NewPublisherDTO';
import { IRootState } from '../../../../reducers/RootState';
import {
  CreatePublisherPage,
  IDispatchProps,
  IStateProps,
} from './CreatePublisherPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  isFormValid: isValid(CREATE_PUBLISHER_FORM)(state),
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  savePublisher: (publisher: INewPublisherDTO) => dispatch(actions.createPublisher(publisher)),
  submitForm: () => dispatch(submit(CREATE_PUBLISHER_FORM)),
});

export const CreatePublisherPageConnected = connect(mapStateToProps, mapDispatchToProps)(CreatePublisherPage);