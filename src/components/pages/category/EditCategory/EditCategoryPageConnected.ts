import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isValid,
  submit,
} from 'redux-form';

import { actions } from '../../../../actions/CategoryActions';
import { EDIT_CATEGORY_FORM } from '../../../../constants/forms';
import {
  IHATEOASLink,
  INewCategoryDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  EditCategoryPage,
  IDispatchProps,
  IStateProps,
} from './EditCategoryPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  currentCategory: state.category.currentCategory,
  initialFormData: {
    id: state.category.currentCategory.id,
    name: state.category.currentCategory.name,
  },
  isFormValid: isValid(EDIT_CATEGORY_FORM)(state),
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadCategory: (id: number) => dispatch(actions.loadCategory(id)),
  saveCategory: (category: INewCategoryDTO, id: number, link: IHATEOASLink) => dispatch(actions.updateCategory(category, id, link)),
  submitForm: () => dispatch(submit(EDIT_CATEGORY_FORM)),
});

export const EditCategoryPageConnected = connect(mapStateToProps, mapDispatchToProps)(EditCategoryPage);