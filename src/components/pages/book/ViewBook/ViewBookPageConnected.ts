import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/BookActions';
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
  loadBook: (id: number) => dispatch(actions.loadBook(id))
})

export const ViewBookPageConnected = connect(mapStateToProps, mapDispatchToProps)(ViewBookPage);