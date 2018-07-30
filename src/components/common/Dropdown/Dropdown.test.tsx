import { shallow } from 'enzyme';
import React from 'react';

import {
  Dropdown,
  IProps,
} from './Dropdown';

describe('Dropdown', () => {
  let getOptionLabelMock: jest.Mock;
  let getOptionValueMock: jest.Mock;
  let minProps: IProps;
  let noOptionsMessageMock: jest.Mock;
  let onBlurMock: jest.Mock;
  let promiseOptionsMock: jest.Mock;

  beforeEach(() => {
    getOptionLabelMock = jest.fn();
    getOptionValueMock = jest.fn();
    noOptionsMessageMock = jest.fn();
    onBlurMock = jest.fn();
    promiseOptionsMock = jest.fn();
    minProps = {
      getOptionLabel: getOptionLabelMock,
      getOptionValue: getOptionValueMock,
      noOptionsMessage: noOptionsMessageMock,
      onBlur: onBlurMock,
      promiseOptions: promiseOptionsMock,
      touched: false,
      valid: true,
      value: null,
    } as any as IProps;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should set the "classNamePrefix" to "dropdown"', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('classNamePrefix')).toBe('dropdown');
  });

  it('should set the "className" to "dropdown__wrapper"', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('className')).toBe('dropdown__wrapper');
  });

  it('should set the "className" to "dropdown__wrapper--is-valid" if it is touched and valid', () => {
    const props: IProps = {
      ...minProps,
      touched: true,
      valid: true,
    };
    const wrapper = shallow(<Dropdown {...props}/>);

    expect(wrapper.prop('className')).toBe('dropdown__wrapper--is-valid');
  });

  it('should set the "id" of the Async dropdown to the provided id', () => {
    const props: IProps = {
      ...minProps,
      id: 'foo',
    };
    const wrapper = shallow(<Dropdown {...props}/>);

    expect(wrapper.prop('id')).toBe('foo');
  });

  it('should set the "cacheOptions" of the Async dropdown to "true"', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('cacheOptions')).toBe(true);
  });

  it('should set the "defaultOptions" of the Async dropdown to "true" by default', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('defaultOptions')).toBe(true);
  });

  it('should override the "defaultOptions" of the Async dropdown if it is provided', () => {
    const defaultOptions: any[] = [];
    const props: IProps = {
      ...minProps,
      defaultOptions,
    };
    const wrapper = shallow(<Dropdown {...props}/>);

    expect(wrapper.prop('defaultOptions')).toBe(defaultOptions);
  });

  it('should set the "getOptionLabel" of the Async dropdown as per provided', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('getOptionLabel')).toBe(getOptionLabelMock);
  });

  it('should set the "getOptionValue" of the Async dropdown as per provided', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('getOptionValue')).toBe(getOptionValueMock);
  });

  it('should set the "isMulti" of the Async dropdown to "true"', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('isMulti')).toBe(true);
  });

  it('should set the "loadOptions" of the Async dropdown as per provided', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('loadOptions')).toBe(promiseOptionsMock);
  });

  it('should set the "noOptionsMessage" of the Async dropdown as per provided', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('noOptionsMessage')).toBe(noOptionsMessageMock);
  });

  it('should pass the current value to the blur function when it is blurred', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);
    wrapper.simulate('blur');

    expect(onBlurMock).toHaveBeenCalledWith(null);
  });

  it('should set the placeholder to "Please select..." by default', () => {
    const wrapper = shallow(<Dropdown {...minProps}/>);

    expect(wrapper.prop('placeholder')).toBe('Please select...');
  });

  it('should override the placeholder if it is provided', () => {
    const props: IProps = {
      ...minProps,
      placeholder: 'Foo',
    };
    const wrapper = shallow(<Dropdown {...props}/>);

    expect(wrapper.prop('placeholder')).toBe('Foo');
  });

  it('should set the transformed value as the value', () => {
    const props: IProps = {
      ...minProps,
      defaultOptions: [
        {
          id: 1,
          name: 'Foo',
        },
        {
          id: 2,
          name: 'Bar',
        },
        {
          id: 3,
          name: 'FooBar',
        },
      ],
      value: [
        1,
        3,
      ],
    };
    const wrapper = shallow(<Dropdown {...props}/>);

    expect(wrapper.prop('value')).toEqual([
      {
        id: 1,
        name: 'Foo',
      },
      {
        id: 3,
        name: 'FooBar',
      },
    ]);
  });

  it('should set the transformed value as the value if a custom "valueProperty" is provided', () => {
    const props: IProps = {
      ...minProps,
      defaultOptions: [
        {
          name: 'Foo',
          value: 1,
        },
        {
          name: 'Bar',
          value: 2,
        },
        {
          name: 'FooBar',
          value: 3,
        },
      ],
      value: [
        1,
        3,
      ],
      valueProperty: 'value',
    };
    const wrapper = shallow(<Dropdown {...props}/>);

    expect(wrapper.prop('value')).toEqual([
      {
        name: 'Foo',
        value: 1,
      },
      {
        name: 'FooBar',
        value: 3,
      },
    ]);
  });
});
