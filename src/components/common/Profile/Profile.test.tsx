import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import {
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import {
  IProps,
  Profile,
} from './Profile';

describe('Profile', () => {
  const profileMock = {
    avatarUrl: 'http://www.example.com/foo_bar.png',
    name: 'John Doe',
  } as IProfileDTO;
  let logoutMock: jest.Mock;
  let minProps: IProps;

  beforeEach(() => {
    logoutMock = jest.fn();
    minProps = {
      logout: logoutMock,
      profile: profileMock,
    };
  });

  it('should apply the "profile" class name', () => {
    const wrapper = shallow(<Profile {...minProps}/>);

    expect(wrapper.hasClass('profile')).toBeTruthy();
  });

  it('should display the name as the toggle', () => {
    const wrapper = mount(<Profile {...minProps}/>);
    const toggle = wrapper.find(DropdownToggle);

    expect(toggle.text()).toBe('John Doe');
  });

  it('should set the URL of the avatar as the source of the profile image', () => {
    const wrapper = mount(<Profile {...minProps}/>);
    const image = wrapper.find('img');

    expect(image.prop('src')).toBe('http://www.example.com/foo_bar.png');
  });

  it('should call the "logout" function when the Log Out button is clicked', () => {
    const wrapper = mount(<Profile {...minProps}/>);
    const toggle = wrapper.find(DropdownToggle);
    toggle.simulate('click');
    const logOutButton = wrapper.find(DropdownItem);
    logOutButton.simulate('click');

    expect(logoutMock).toHaveBeenCalled();
  });
});
