import * as React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';

export interface IDispatchProps {
  logout: () => any;
}

export interface IOwnProps {
  profile: IProfileDTO;
}

export interface IProps extends IDispatchProps, IOwnProps { }

export const Profile: React.SFC<IProps> = (props) => {
  const {
    logout,
    profile,
  } = props;

  return (
    <UncontrolledDropdown
      className="profile"
      nav={true}
      inNavbar={true}
    >
      <DropdownToggle
        caret={true}
        color="outline-light"
      >
        {profile.name}
        <img
          src={profile.avatarUrl}
          className="rounded-circle"
        />
      </DropdownToggle>
      <DropdownMenu right={true}>
        <DropdownItem onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
