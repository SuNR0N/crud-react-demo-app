import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/CategoryActions';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ListCategoriesPage,
} from './ListCategoriesPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  categories: state.category.categories,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadCategories: () => dispatch(actions.loadCategories())
})

export const ListCategoriesPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListCategoriesPage);