import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isValid,
  submit,
} from 'redux-form';

import { actions } from '../../../../actions/BookActions';
import { CREATE_BOOK_FORM } from '../../../../constants/forms';
import { INewBookDTO } from '../../../../interfaces/dtos/NewBookDTO';
import { IRootState } from '../../../../reducers/RootState';
import {
  CreateBookPage,
  IDispatchProps,
  IStateProps,
} from './CreateBookPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  isFormValid: isValid(CREATE_BOOK_FORM)(state),
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  saveBook: (book: INewBookDTO) => dispatch(actions.createBook(book)),
  submitForm: () => dispatch(submit(CREATE_BOOK_FORM)),
});

export const CreateBookPageConnected = connect(mapStateToProps, mapDispatchToProps)(CreateBookPage);