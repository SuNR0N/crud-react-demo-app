import { shallow } from 'enzyme';
import React from 'react';

import { ActionBar } from './ActionBar';

describe('ActionBar', () => {
  it('should apply the "action-bar" class name', () => {
    const wrapper = shallow(<ActionBar/>);

    expect(wrapper.hasClass('action-bar')).toBeTruthy();
  });

  it('should contain the provided children', () => {
    const child = (<div>Foo</div>);
    const wrapper = shallow(<ActionBar>{child}</ActionBar>);

    expect(wrapper.contains(child)).toBeTruthy();
  });
});
