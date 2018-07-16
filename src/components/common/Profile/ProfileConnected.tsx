import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from '../../../actions/AuthActions';
import {
  IDispatchProps,
  IOwnProps,
  Profile,
} from './Profile';

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  logout: () => dispatch(actions.logOut()),
});

export const ProfileConnected = connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatchToProps)(Profile);