import { debounce } from 'lodash';
import React, {
  ChangeEvent,
  Component,
} from 'react';
import {
  Input,
  InputProps,
} from 'reactstrap';

export interface IProps extends InputProps {
  debounceInterval?: number;
  onValueChange: (value: any) => void;
}

export interface IState {
  value: string;
}

export class SearchField extends Component<IProps, IState> {
  public state: IState = {
    value: this.props.value ? String(this.props.value) : '',
  }

  public componentWillMount() {
    this.debouncedChange = debounce(
      this.debouncedChange,
      this.props.debounceInterval || 500
    );
  }
  
  public render() {
    const {
      handleChange,
      props: {
        debounceInterval,
        onValueChange,
        ...inputProps
      },
    } = this;

    return (
      <Input
        {...inputProps}
        onChange={handleChange}
      />
    );
  }

  private debouncedChange = (value: string) => {
    this.props.onValueChange(value);
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { debouncedChange } = this;
    const value = event.target.value;
    this.setState(
      { value },
      () => debouncedChange(value)
    );
  }
}