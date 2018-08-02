import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { InputGroupAddon } from 'reactstrap';

import { DATE_FORMAT } from '../../../config';
import { Icon } from '../Icon';
import {
  DatePicker,
  IProps,
} from './DatePicker';

describe('DatePicker', () => {
  let onBlurMock: jest.Mock;
  let minProps: IProps;

  beforeEach(() => {
    onBlurMock = jest.fn();
    minProps = {
      onBlur: onBlurMock,
      touched: false,
      valid: false,
      value: null,
    } as any as IProps;
  });

  it('should apply the "date-picker" class name', () => {
    const wrapper = shallow(<DatePicker {...minProps}/>);

    expect(wrapper.hasClass('date-picker')).toBeTruthy();
  });

  it('should set the provided id on the ReactDatePicker', () => {
    const props: IProps = {
      ...minProps,
      id: 'foo',
    };
    const wrapper = mount(<DatePicker {...props}/>);
    const reactDatePicker = wrapper.find(ReactDatePicker);

    expect(reactDatePicker.prop('id')).toBe('foo');
  });

  it('should set the "form-control" class on the ReactDatePicker', () => {
    const wrapper = mount(<DatePicker {...minProps}/>);
    const reactDatePicker = wrapper.find(ReactDatePicker);

    expect(reactDatePicker.prop('className')).toBe('form-control');
  });

  it('should set the "form-control" and "is-valid" classes on the ReactDatePicker if it is valid', () => {
    const props: IProps = {
      ...minProps,
      touched: true,
      valid: true,
    };
    const wrapper = mount(<DatePicker {...props}/>);
    const reactDatePicker = wrapper.find(ReactDatePicker);

    expect(reactDatePicker.prop('className')).toBe('form-control is-valid');
  });

  it('should set the "peekNextMonth" property of the ReactDatePicker to true', () => {
    const wrapper = mount(<DatePicker {...minProps}/>);
    const reactDatePicker = wrapper.find(ReactDatePicker);

    expect(reactDatePicker.prop('peekNextMonth')).toBe(true);
  });

  it('should set the "showMonthDropdown" property of the ReactDatePicker to true', () => {
    const wrapper = mount(<DatePicker {...minProps}/>);
    const reactDatePicker = wrapper.find(ReactDatePicker);

    expect(reactDatePicker.prop('showMonthDropdown')).toBe(true);
  });

  it('should set the "showYearDropdown" property of the ReactDatePicker to true', () => {
    const wrapper = mount(<DatePicker {...minProps}/>);
    const reactDatePicker = wrapper.find(ReactDatePicker);

    expect(reactDatePicker.prop('showYearDropdown')).toBe(true);
  });

  it('should set the "dropdownMode" property of the ReactDatePicker to "select"', () => {
    const wrapper = mount(<DatePicker {...minProps}/>);
    const reactDatePicker = wrapper.find(ReactDatePicker);

    expect(reactDatePicker.prop('dateFormat')).toBe(DATE_FORMAT);
  });

  it('should set the "dateFormat" property of the ReactDatePicker to the configured format', () => {
    const wrapper = mount(<DatePicker {...minProps}/>);
    const reactDatePicker = wrapper.find(ReactDatePicker);

    expect(reactDatePicker.prop('dropdownMode')).toBe('select');
  });

  it('should render a calendar icon as an addon', () => {
    const wrapper = mount(<DatePicker {...minProps}/>);
    const icon = wrapper
      .find(InputGroupAddon)
      .find(Icon);

    expect(icon.prop('symbol')).toBe('calendar-alt-regular');
  });

  it('should open the datepicker when the addon is clicked', () => {
    const wrapper = mount(<DatePicker {...minProps}/>);
    const addon = wrapper
      .find(InputGroupAddon);
    addon.simulate('click');
    const popper = wrapper.find('.react-datepicker-popper');

    expect(popper.exists()).toBeTruthy();
  });

  it('should pass the current value to the onBlur function when it is blurred', () => {
    const props: IProps = {
      ...minProps,
      value: '2001-02-03',
    };
    const wrapper = mount(<DatePicker {...props}/>);
    const datePickerInput = wrapper
      .find(ReactDatePicker)
      .find('input');
    datePickerInput.simulate('blur');

    expect(onBlurMock).toHaveBeenCalledWith('2001-02-03');
  });
});
