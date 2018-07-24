import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isValid,
  submit,
} from 'redux-form';

import { actions } from '../../../../actions/AuthorActions';
import { EDIT_AUTHOR_FORM } from '../../../../constants/forms';
import {
  IAuthorUpdateDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  EditAuthorPage,
  IDispatchProps,
  IStateProps,
} from './EditAuthorPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  currentAuthor: state.author.currentAuthor,
  initialFormData: {
    firstName: state.author.currentAuthor.firstName,
    id: state.author.currentAuthor.id,
    lastName: state.author.currentAuthor.lastName,
    middleName: state.author.currentAuthor.middleName,
  },
  isFormValid: isValid(EDIT_AUTHOR_FORM)(state),
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadAuthor: (id: number) => dispatch(actions.loadAuthor(id)),
  saveAuthor: (author: IAuthorUpdateDTO, id: number, link: IHATEOASLink) => dispatch(actions.updateAuthor(author, id, link)),
  submitForm: () => dispatch(submit(EDIT_AUTHOR_FORM)),
})

export const EditAuthorPageConnected = connect(mapStateToProps, mapDispatchToProps)(EditAuthorPage);