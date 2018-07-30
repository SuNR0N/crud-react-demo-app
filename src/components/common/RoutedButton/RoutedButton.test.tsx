import { mount } from 'enzyme';
import { History } from 'history';
import React from 'react';
import { Router } from 'react-router';

import { RoutedButton } from './RoutedButton';

describe('RoutedButton', () => {
  it('should navigate to the provided route when the button is clicked', () => {
    const pushMock = jest.fn();
    const historyMock = {
      listen: jest.fn(),
      location: {
        pathname: '/',
      },
      push: pushMock,
    } as any as History;
    const wrapper = mount(
      <Router history={historyMock}>
        <RoutedButton route="foo" />
      </Router>
    );
    const routedButton = wrapper.find(RoutedButton);
    routedButton.simulate('click');

    expect(pushMock).toHaveBeenCalledWith('foo');
  });
});
