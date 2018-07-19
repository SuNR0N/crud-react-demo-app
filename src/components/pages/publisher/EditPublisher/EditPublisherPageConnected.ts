import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isValid,
  submit,
} from 'redux-form';

import { actions } from '../../../../actions/PublisherActions';
import { EDIT_PUBLISHER_FORM } from '../../../../constants/forms';
import {
  IHATEOASLink,
  INewPublisherDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  EditPublisherPage,
  IDispatchProps,
  IStateProps,
} from './EditPublisherPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  currentPublisher: state.publisher.currentPublisher,
  initialFormData: {
    id: state.publisher.currentPublisher.id,
    name: state.publisher.currentPublisher.name,
  },
  isFormValid: isValid(EDIT_PUBLISHER_FORM)(state),
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadPublisher: (id: number) => dispatch(actions.loadPublisher(id)),
  savePublisher: (publisher: INewPublisherDTO, link: IHATEOASLink) => dispatch(actions.updatePublisher(publisher, link)),
  submitForm: () => dispatch(submit(EDIT_PUBLISHER_FORM)),
})

export const EditPublisherPageConnected = connect(mapStateToProps, mapDispatchToProps)(EditPublisherPage);