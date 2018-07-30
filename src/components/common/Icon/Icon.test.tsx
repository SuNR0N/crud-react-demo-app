import {
  shallow,
  ShallowWrapper,
} from 'enzyme';
import React from 'react';

import {
  Icon,
  IProps,
} from './Icon';

describe('Icon', () => {
  const minProps: IProps = {
    symbol: 'eye-regular',
  };
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Icon {...minProps}/>);
  });
  
  it('should apply the "icon" class name', () => {
    expect(wrapper.hasClass('icon')).toBeTruthy();
  });

  it('should apply additional classes if they are provided through the className property', () => {
    const props: IProps = { 
      ...minProps,
      className: 'foo',
    };
    wrapper = shallow(<Icon {...props}/>);

    expect(wrapper.hasClass('foo')).toBeTruthy();
  });

  it('should set the xlinkHref based on the provided symbol', () => {
    const use = wrapper.find('use');

    expect(use.prop('xlinkHref')).toBe('sprite.svg#eye-regular');
  });
});
