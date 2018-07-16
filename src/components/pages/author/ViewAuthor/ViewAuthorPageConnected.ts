import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/AuthorActions';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ViewAuthorPage,
} from './ViewAuthorPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  author: state.author.currentAuthor,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadAuthor: (id: number) => dispatch(actions.loadAuthor(id))
})

export const ViewAuthorPageConnected = connect(mapStateToProps, mapDispatchToProps)(ViewAuthorPage);