import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  actions,
  ActionTypes,
} from '../../../../actions/CategoryActions';
import {
  ICategoryDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ListCategoriesPage,
} from './ListCategoriesPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  categories: state.category.categories,
  isLoading: state.request.pendingRequests[ActionTypes.LOAD_CATEGORIES_REQUEST] > 0,
  loggedIn: !!state.auth.profile,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  deleteCategory: (category: ICategoryDTO, link: IHATEOASLink, route?: string) => dispatch(actions.deleteCategory(category, link, route)),
  searchCategories: (query?: string) => dispatch(actions.loadCategories(query))
});

export const ListCategoriesPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListCategoriesPage);