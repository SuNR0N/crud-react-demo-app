import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/PublisherActions';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ListPublishersPage,
} from './ListPublishersPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  publishers: state.publisher.publishers,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadPublishers: () => dispatch(actions.loadPublishers())
})

export const ListPublishersPageConnected = connect(mapStateToProps, mapDispatchToProps)(ListPublishersPage);