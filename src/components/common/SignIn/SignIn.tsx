import * as React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import { GITHUB_OAUTH_URL } from '../../../config';
import { Icon } from '../Icon';

export const SignIn: React.SFC = () => {
  return (
    <UncontrolledDropdown
      nav={true}
      inNavbar={true}
    >
      <DropdownToggle
        caret={true}
        color="outline-success"
      >
        Sign In
      </DropdownToggle>
      <DropdownMenu right={true}>
        <DropdownItem href={GITHUB_OAUTH_URL}>
          <Icon symbol="github-brands"/> GitHub
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}