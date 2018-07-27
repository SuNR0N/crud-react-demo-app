import moment from 'moment';
import React, {
  Component,
  createRef,
} from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { WrappedFieldInputProps } from 'redux-form';

import { DATE_FORMAT } from '../../../config';
import { Icon } from '../Icon';

export interface IProps extends WrappedFieldInputProps {
  id?: string;
  touched: boolean;
  valid: boolean;
}

export class DatePicker extends Component<IProps> {
  private datePickerRef = createRef<{ setOpen: (value: boolean) => void }>();
  
  public render() {
    const {
      datePickerRef,
      onBlur,
      openDatePicker,
      props: {
        id,
        touched,
        valid,
        value,
        ...inputProps
      },
    } = this;

    let className = 'form-control';
    if (touched && valid) {
      className = `${className} is-valid`;
    }
  
    return (
      <InputGroup className="date-picker">
        <ReactDatePicker
          {...inputProps}
          id={id}
          className={className}
          selected={value ? moment(value, DATE_FORMAT) : null}
          peekNextMonth={true}
          showMonthDropdown={true}
          showYearDropdown={true}
          dropdownMode="select"
          dateFormat={DATE_FORMAT}
          ref={datePickerRef as any}
          onBlur={onBlur}
        />
        <InputGroupAddon
          addonType="append"
          onClick={openDatePicker}>
          <InputGroupText>
            <Icon symbol="calendar-alt-regular"/>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    )
  }

  private onBlur = () => this.props.onBlur(this.props.value);

  private openDatePicker = () => {
    if (this.datePickerRef.current) {
      this.datePickerRef.current.setOpen(true);
    }
  }
}