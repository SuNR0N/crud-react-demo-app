import * as moment from 'moment';
import * as React from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import { DATE_FORMAT } from '../../../config';
import { Icon } from '../Icon';

export interface IProps {
  onBlur: (value: any) => void;
  onChange: (value: any) => void;
  value: any;
}

export class DatePicker extends React.Component<IProps> {
  private datePickerRef = React.createRef<{ setOpen: (value: boolean) => void }>();
  
  public render() {
    const {
      datePickerRef,
      onBlur,
      openDatePicker,
      props: {
        onChange,
        value,
      },
    } = this;
  
    return (
      <InputGroup className="date-picker">
        <ReactDatePicker
          className="form-control"
          selected={value ? moment(value, DATE_FORMAT) : null}
          onChange={onChange}
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