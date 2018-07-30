import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import {
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

import { GITHUB_OAUTH_URL } from '../../../config';
import { Icon } from '../Icon';
import { SignIn } from './SignIn';

describe('SignIn', () => {
  it('should apply the "sign-in" class name', () => {
    const wrapper = shallow(<SignIn/>);

    expect(wrapper.hasClass('sign-in')).toBeTruthy();
  });

  it('should display "Sign In" as the toggle', () => {
    const wrapper = mount(<SignIn/>);
    const toggle = wrapper.find(DropdownToggle);

    expect(toggle.text()).toBe('Sign In');
  });

  it('should have a dropdown item with its href set to the URL of GitHub', () => {
    const wrapper = mount(<SignIn/>);
    const toggle = wrapper.find(DropdownToggle);
    toggle.simulate('click');
    const item = wrapper.find(DropdownItem).at(0);

    expect(item.prop('href')).toBe(GITHUB_OAUTH_URL);
  });

  it('should have a dropdown item with the icon of GitHub', () => {
    const wrapper = mount(<SignIn/>);
    const toggle = wrapper.find(DropdownToggle);
    toggle.simulate('click');
    const icon = wrapper
      .find(DropdownItem).at(0)
      .find(Icon);

    expect(icon.prop('symbol')).toBe('github-brands');
  });
});
