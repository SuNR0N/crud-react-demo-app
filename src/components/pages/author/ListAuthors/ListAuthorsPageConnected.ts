import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  actions,
  ActionTypes,
} from '../../../../actions/AuthorActions';
import {
  IAuthorDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ListAuthorsPage,
} from './ListAuthorsPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  authors: state.author.authors,
  isLoading: state.request.pendingRequests[ActionTypes.LOAD_AUTHORS_REQUEST] > 0,
  loggedIn: !!state.auth.profile,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  deleteAuthor: (author: IAuthorDTO, link: IHATEOASLink, route?: string) => dispatch(actions.deleteAuthor(author, link, route)),
  searchAuthors: (query?: string) => dispatch(actions.loadAuthors(query)),
});

export const ListAuthorsPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListAuthorsPage);