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
  loggedIn: !!state.auth.profile,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  searchCategories: (query?: string) => dispatch(actions.loadCategories(query))
})

export const ListCategoriesPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListCategoriesPage);