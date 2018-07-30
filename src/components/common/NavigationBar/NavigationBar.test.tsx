import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import {
  NavbarBrand,
  NavbarToggler,
  NavLink,
} from 'reactstrap';
import createMockStore from 'redux-mock-store';

import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import { Icon } from '../Icon';
import { Profile } from '../Profile';
import { SignIn } from '../SignIn';
import {
  IProps,
  NavigationBar,
} from './NavigationBar';

describe('NavigationBar', () => {
  let loadProfileMock: jest.Mock;
  let minProps: IProps;

  beforeEach(() => {
    loadProfileMock = jest.fn();
    minProps = {
      loadProfile: loadProfileMock,
      profile: null,
    };
  });

  it('should apply the "navigation-bar" class name', () => {
    const wrapper = shallow(<NavigationBar {...minProps}/>);

    expect(wrapper.hasClass('navigation-bar')).toBeTruthy();
  });

  it('should load the loadProfile function on mount', () => {
    shallow(<NavigationBar {...minProps}/>);

    expect(loadProfileMock).toHaveBeenCalled();
  });

  it('should contain a link to "https://reactjs.org/" in the brand section', () => {
    const wrapper = shallow(<NavigationBar {...minProps}/>);
    const brand = wrapper.find(NavbarBrand);

    expect(brand.prop('href')).toBe('https://reactjs.org/');
  });

  it('should contain a react icon in the brand section', () => {
    const wrapper = shallow(<NavigationBar {...minProps}/>);
    const icon = wrapper
      .find(NavbarBrand)
      .find(Icon);

    expect(icon.prop('symbol')).toBe('react-brands');
  });

  it('should have a title of "CRUD React Demo Application"', () => {
    const wrapper = mount(  
      <MemoryRouter>
        <NavigationBar {...minProps}/>
      </MemoryRouter>
    );
    const brand = wrapper.find(NavbarBrand);

    expect(brand.text()).toBe('CRUD React Demo Application');
  });

  it('should toggle its state when the toggler is clicked', () => {
    const wrapper = mount(  
      <MemoryRouter>
        <NavigationBar {...minProps}/>
      </MemoryRouter>
    );
    const toggler = wrapper.find(NavbarToggler);
    toggler.simulate('click');
    const navigationBar = wrapper.find(NavigationBar);
    const { isOpen } = (navigationBar.instance() as NavigationBar).state;
    
    expect(isOpen).toBe(true);
  });

  it('should display a link called "Authors" which routes to the authors page', () => {
    const wrapper = mount(  
      <MemoryRouter>
        <NavigationBar {...minProps}/>
      </MemoryRouter>
    );
    const authors = wrapper.find(NavLink).at(0);

    expect(authors.text()).toBe('Authors');
    expect(authors.prop('to')).toBe('/authors');
  });

  it('should display a link called "Books" which routes to the books page', () => {
    const wrapper = mount(  
      <MemoryRouter>
        <NavigationBar {...minProps}/>
      </MemoryRouter>
    );
    const books = wrapper.find(NavLink).at(1);

    expect(books.text()).toBe('Books');
    expect(books.prop('to')).toBe('/books');
  });

  it('should display a link called "Categories" which routes to the categories page', () => {
    const wrapper = mount(  
      <MemoryRouter>
        <NavigationBar {...minProps}/>
      </MemoryRouter>
    );
    const categories = wrapper.find(NavLink).at(2);

    expect(categories.text()).toBe('Categories');
    expect(categories.prop('to')).toBe('/categories');
  });

  it('should display a link called "Publishers" which routes to the publishers page', () => {
    const wrapper = mount(  
      <MemoryRouter>
        <NavigationBar {...minProps}/>
      </MemoryRouter>
    );
    const publishers = wrapper.find(NavLink).at(3);

    expect(publishers.text()).toBe('Publishers');
    expect(publishers.prop('to')).toBe('/publishers');
  });

  it('should display a SignIn component if a profile does not exist', () => {
    const wrapper = shallow(<NavigationBar {...minProps}/>);
    const signIn = wrapper.find(SignIn);

    expect(signIn.exists()).toBeTruthy();
  });

  it('should display a connected Profile component if a profile exists', () => {
    const initialState = {};
    const mockStore = createMockStore();
    const props: IProps = {
      ...minProps,
      profile: {} as IProfileDTO,
    };
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <NavigationBar {...props}/>
        </MemoryRouter>
      </Provider>
    );
    const profile = wrapper.find(Profile);

    expect(profile.exists()).toBeTruthy();
  });
});
