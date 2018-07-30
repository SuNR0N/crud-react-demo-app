import {
  shallow,
  ShallowWrapper,
} from 'enzyme';
import React, { Component } from 'react';
import {
  IProps,
  IState,
} from './SearchField';

describe('SearchField', () => {
  beforeEach(() => {
    jest.resetModuleRegistry();
  });

  describe('componentWillMount', () => {
    let debounceMock: jest.Mock;
    
    beforeEach(() => {
      debounceMock = jest.fn();
      jest.doMock('lodash', () => ({ debounce: debounceMock }));
    });

    it('should call debounce with the internal debouncedChange function and 500 if an interval is not defined', async () => {
      const { SearchField } = await import('./SearchField');
      shallow(<SearchField onValueChange={jest.fn()}/>);

      expect(debounceMock).toHaveBeenCalledWith(expect.any(Function), 500);
    });

    it('should call debounce with the internal debouncedChange function and the provided interval if it is defined', async () => {
      const { SearchField } = await import('./SearchField');
      shallow(
        <SearchField
          onValueChange={jest.fn()}
          debounceInterval={1000}
        />
      );

      expect(debounceMock).toHaveBeenCalledWith(expect.any(Function), 1000);
    });
  });

  describe('onChange', () => {
    let onValueChangeMock: jest.Mock;
    let wrapper: ShallowWrapper<IProps, IState, Component<IProps, IState>>;
    
    beforeEach(async () => {
      jest.doMock('lodash', () => ({ debounce: (fn) => fn }));
      onValueChangeMock = jest.fn();
      const { SearchField } = await import('./SearchField');
      wrapper = shallow(<SearchField onValueChange={onValueChangeMock}/>);
      wrapper.simulate('change', { target: { value: 'foo' }});
    });

    it('should update the value in its internal state', () => {     
      const { value } = wrapper.instance().state;
     
      expect(value).toBe('foo');
    });

    it('should call the provided onValueChanged function with the changed value', () => {
      expect(onValueChangeMock).toHaveBeenCalledWith('foo'); 
    });
  });

  it('should set the initial state based on the value if it exists', async () => {
    const { SearchField } = await import('./SearchField');
    const wrapper = shallow(<SearchField value="foo" onValueChange={jest.fn()}/>);
    const { value } = (wrapper.instance() as any).state;

    expect(value).toBe('foo');
  });
});
