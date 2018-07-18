import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/AuthorActions';
import {
  IAuthorDTO,
  IHATEOASLink,
} from '../../../../interfaces';
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
  deleteAuthor: (author: IAuthorDTO, link: IHATEOASLink, route?: string) => dispatch(actions.deleteAuthor(author, link, route)),
  loadAuthor: (id: number) => dispatch(actions.loadAuthor(id))
})

export const ViewAuthorPageConnected = connect(mapStateToProps, mapDispatchToProps)(ViewAuthorPage);