import * as React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';

import {
  Icon,
  ProfileConnected,
  SignIn,
} from '..';
import { RouteConfig } from '../../../config/RouteConfig';
import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';

export interface IDispatchProps {
  loadProfile: () => any;
}

export interface IStateProps {
  profile: IProfileDTO | null;
}

export interface IProps extends IDispatchProps, IStateProps {}

export interface IState {
  isOpen: boolean;
}

export class NavigationBar extends React.Component<IProps, IState> {
  public state: IState = {
    isOpen: false,
  };

  public componentDidMount() {
    this.props.loadProfile();
  }

  public render() {
    const {
      props: {
        profile,
      },
      toggle,
      state: {
        isOpen,
      },
    } = this;

    return (
      <Navbar
        color="dark"
        dark={true}
        expand="md"
      >
        <NavbarBrand href="https://reactjs.org/">
          <Icon symbol="react-brands"/>
          CRUD React Demo Application
        </NavbarBrand>
        <hr/>
        <NavbarToggler onClick={toggle} />
        <Collapse
          isOpen={isOpen}
          navbar={true}
        >
          <Nav navbar={true}>
            <NavItem>
              <NavLink
                to={RouteConfig.authors}
                activeClassName="active"
                tag={RRNavLink}
              >
                Authors
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to={RouteConfig.books}
                activeClassName="active"
                tag={RRNavLink}
              >
                Books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to={RouteConfig.categories}
                activeClassName="active"
                tag={RRNavLink}
              >
                Categories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to={RouteConfig.publishers}
                activeClassName="active"
                tag={RRNavLink}
              >
                Publishers
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto">
            {profile ? (
              <ProfileConnected profile={profile}/>
            ) : (
              <SignIn/>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );  
  }

  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
} 