import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  actions,
  ActionTypes,
} from '../../../../actions/BookActions';
import {
  IBookDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ListBooksPage,
} from './ListBooksPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  booksCollection: state.book.books,
  isLoading: [
    ActionTypes.LOAD_BOOKS_REQUEST,
    ActionTypes.PAGINATE_BOOKS_REQUEST,
  ].some((actionType) => state.request.pendingRequests[actionType] > 0),
  loggedIn: !!state.auth.profile,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  deleteBook: (book: IBookDTO, link: IHATEOASLink, route?: string) => dispatch(actions.deleteBook(book, link, route)),
  paginateBooks: (link: IHATEOASLink) => dispatch(actions.paginateBooks(link)),
  searchBooks: (query?: string) => dispatch(actions.loadBooks(query))
})

export const ListBooksPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListBooksPage);