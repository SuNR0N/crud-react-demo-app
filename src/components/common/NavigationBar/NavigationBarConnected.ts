import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { actions } from '../../../actions/AuthActions';
import { IRootState } from '../../../reducers/RootState';
import {
  IDispatchProps,
  IStateProps,
  NavigationBar,
} from './NavigationBar';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  profile: state.auth.profile,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadProfile: () => dispatch(actions.loadProfile()),
});

export const NavigationBarConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));