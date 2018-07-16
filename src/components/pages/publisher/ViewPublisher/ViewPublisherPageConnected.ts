import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../../actions/PublisherActions';
import { IRootState } from '../../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  ViewPublisherPage,
} from './ViewPublisherPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  publisher: state.publisher.currentPublisher,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadPublisher: (id: number) => dispatch(actions.loadPublisher(id))
})

export const ViewPublisherPageConnected = connect(mapStateToProps, mapDispatchToProps)(ViewPublisherPage);