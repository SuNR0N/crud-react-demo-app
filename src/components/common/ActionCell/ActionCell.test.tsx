import { shallow } from 'enzyme';
import React from 'react';

import { ActionCell } from './ActionCell';

describe('ActionCell', () => {
  it('should apply the "action-cell" class name', () => {
    const wrapper = shallow(<ActionCell/>);

    expect(wrapper.hasClass('action-cell')).toBeTruthy();
  });

  it('should apply flex utility classes', () => {
    const wrapper = shallow(<ActionCell/>);

    expect(wrapper.hasClass('d-flex')).toBeTruthy();
    expect(wrapper.hasClass('justify-content-around')).toBeTruthy();
  });

  it('should apply the custom class name if it is provided', () => {
    const wrapper = shallow(<ActionCell className="foo"/>);
  
    expect(wrapper.hasClass('foo')).toBeTruthy();
  });
});
