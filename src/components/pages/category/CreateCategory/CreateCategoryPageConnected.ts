import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isValid,
  submit,
} from 'redux-form';

import { actions } from '../../../../actions/CategoryActions';
import { CREATE_CATEGORY_FORM } from '../../../../constants/forms';
import { INewCategoryDTO } from '../../../../interfaces/dtos/NewCategoryDTO';
import { IRootState } from '../../../../reducers/RootState';
import {
  CreateCategoryPage,
  IDispatchProps,
  IStateProps,
} from './CreateCategoryPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  isFormValid: isValid(CREATE_CATEGORY_FORM)(state),
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  saveCategory: (category: INewCategoryDTO) => dispatch(actions.createCategory(category)),
  submitForm: () => dispatch(submit(CREATE_CATEGORY_FORM)),
});

export const CreateCategoryPageConnected = connect(mapStateToProps, mapDispatchToProps)(CreateCategoryPage);