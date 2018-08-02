import { shallow } from 'enzyme';
import React from 'react';

import { Icon } from '../Icon';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('should apply the "spinner" class name', () => {
    const wrapper = shallow(<Spinner/>);

    expect(wrapper.hasClass('spinner')).toBeTruthy();
  });

  it('should display "Loading" as its text by default', () => {
    const wrapper = shallow(<Spinner/>);
    const text = wrapper.find('.spinner__text');

    expect(text.text()).toBe('Loading');
  });

  it('should display a custom text if the text property is provided', () => {
    const wrapper = shallow(<Spinner text="Foo"/>);
    const text = wrapper.find('.spinner__text');

    expect(text.text()).toBe('Foo');
  });

  it('should display the "spinner-solid" icon by default', () => {
    const wrapper = shallow(<Spinner/>);
    const icon = wrapper.find(Icon);

    expect(icon.prop('symbol')).toBe('spinner-solid');
  });

  it('should display a custom icon if the symbol property is provided', () => {
    const wrapper = shallow(<Spinner symbol="react-brands"/>);
    const icon = wrapper.find(Icon);

    expect(icon.prop('symbol')).toBe('react-brands');
  });
});
