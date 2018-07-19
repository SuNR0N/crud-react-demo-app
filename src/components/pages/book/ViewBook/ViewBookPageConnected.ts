import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/BookActions';
import {
  IBookDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ViewBookPage,
} from './ViewBookPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  book: state.book.currentBook,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  deleteBook: (book: IBookDTO, link: IHATEOASLink, route?: string) => dispatch(actions.deleteBook(book, link, route)),
  loadBook: (id: number) => dispatch(actions.loadBook(id))
})

export const ViewBookPageConnected = connect(mapStateToProps, mapDispatchToProps)(ViewBookPage);