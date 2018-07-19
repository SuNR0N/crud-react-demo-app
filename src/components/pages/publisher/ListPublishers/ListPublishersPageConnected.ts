import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/PublisherActions';
import {
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ListPublishersPage,
} from './ListPublishersPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  loggedIn: !!state.auth.profile,
  publishers: state.publisher.publishers,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  deletePublisher: (publisher: IPublisherDTO, link: IHATEOASLink, route?: string) => dispatch(actions.deletePublisher(publisher, link, route)),
  searchPublishers: (query?: string) => dispatch(actions.loadPublishers(query)),
})

export const ListPublishersPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListPublishersPage);