import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isValid,
  submit,
} from 'redux-form';

import { actions } from '../../../../actions/AuthorActions';
import { CREATE_AUTHOR_FORM } from '../../../../constants/forms';
import { INewAuthorDTO } from '../../../../interfaces/dtos/NewAuthorDTO';
import { IRootState } from '../../../../reducers/RootState';
import {
  CreateAuthorPage,
  IDispatchProps,
  IStateProps,
} from './CreateAuthorPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  isFormValid: isValid(CREATE_AUTHOR_FORM)(state),
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  saveAuthor: (author: INewAuthorDTO) => dispatch(actions.createAuthor(author)),
  submitForm: () => dispatch(submit(CREATE_AUTHOR_FORM)),
});

export const CreateAuthorPageConnected = connect(mapStateToProps, mapDispatchToProps)(CreateAuthorPage);