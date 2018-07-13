import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/BookActions';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ListBooksPage,
} from './ListBooksPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  booksCollection: state.book.books,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadBooks: () => dispatch(actions.loadBooks())
})

export const ListBooksPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListBooksPage);