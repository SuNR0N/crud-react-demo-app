import * as React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';

import { RouteConfig } from '../../../config/RouteConfig';
import { Icon } from '../Icon';

export interface IState {
  isOpen: boolean;
}

export class NavigationBar extends React.Component<{}, IState> {
  public state: IState = {
    isOpen: false,
  };

  public render() {
    const {
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
            <Button color="primary">
              <Icon symbol="github-brands"/>
              Sign in with GitHub
            </Button>
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