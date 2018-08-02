import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/CategoryActions';
import {
  ICategoryDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ViewCategoryPage,
} from './ViewCategoryPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  category: state.category.currentCategory,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  deleteCategory: (category: ICategoryDTO, link: IHATEOASLink, route?: string) => dispatch(actions.deleteCategory(category, link, route)),
  loadCategory: (id: number) => dispatch(actions.loadCategory(id))
});

export const ViewCategoryPageConnected = connect(mapStateToProps, mapDispatchToProps)(ViewCategoryPage);