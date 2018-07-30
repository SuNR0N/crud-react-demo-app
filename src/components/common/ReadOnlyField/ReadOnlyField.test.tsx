import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { ReadOnlyField } from './ReadOnlyField';

describe('ReadOnlyField', () => {
  const minProps = {
    id: 'bar',
    input: {
      value: 'Foo',
    },
  } as any as WrappedFieldProps;

  it('should set the id on the Input', () => {
    const wrapper = shallow(<ReadOnlyField {...minProps}/>);

    expect(wrapper.prop('id')).toBe('bar');
  });

  it('should set the "plaintext" property of the Input to "true"', () => {
    const wrapper = shallow(<ReadOnlyField {...minProps}/>);
    
    expect(wrapper.prop('plaintext')).toBe(true);
  });

  it('should render the value of the input', () => {
    const wrapper = mount(<ReadOnlyField {...minProps}/>);

    expect(wrapper.text()).toBe('Foo');
  });
});
