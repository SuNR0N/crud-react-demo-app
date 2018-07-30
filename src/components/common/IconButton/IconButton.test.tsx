import { shallow } from 'enzyme';
import React from 'react';

import { Icon } from '../Icon';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('should apply the "icon-button" class name', () => {
    const wrapper = shallow(<IconButton/>);

    expect(wrapper.hasClass('icon-button')).toBeTruthy();
  });

  it('should apply additional classes if they are provided', () => {
    const wrapper = shallow(<IconButton className="foo"/>);

    expect(wrapper.hasClass('foo')).toBeTruthy();
  });

  it('should render the icon if a symbol is provided', () => {
    const wrapper = shallow(<IconButton symbol="eye-regular"/>);
    const icon = wrapper.find(Icon);

    expect(icon.exists()).toBeTruthy();
  });

  it('should not render the icon if a symbol is not provided', () => {
    const wrapper = shallow(<IconButton/>);
    const icon = wrapper.find(Icon);

    expect(icon.exists()).toBeFalsy();
  });

  it('should render the children in a span if they are provided', () => {
    const wrapper = shallow(
      <IconButton>
        Foo
      </IconButton>
    );
    const span = wrapper.find('span');

    expect(span.text()).toBe('Foo');
  });

  it('should not render the children if they are not provided', () => {
    const wrapper = shallow(<IconButton/>);
    const span = wrapper.find('span');

    expect(span.exists()).toBeFalsy();
  });
});
