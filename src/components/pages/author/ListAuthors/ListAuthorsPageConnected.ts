import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/AuthorActions';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ListAuthorsPage,
} from './ListAuthorsPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  authors: state.author.authors,
  loggedIn: !!state.auth.profile,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  searchAuthors: (query?: string) => dispatch(actions.loadAuthors(query))
})

export const ListAuthorsPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListAuthorsPage);