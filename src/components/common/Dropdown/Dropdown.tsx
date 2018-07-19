import * as React from 'react';
import Async from 'react-select/lib/Async';
import { WrappedFieldInputProps } from 'redux-form';

export interface IProps extends WrappedFieldInputProps {
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => any;
  noOptionsMessage?: () => string;
  placeholder?: string;
  promiseOptions: (query?: string) => Promise<any>;
  valueProperty?: string;
}

const transformValue = (values: any[], options: any[], valueProperty: string) => {
  const selectedValues = Array.isArray(values) ?
    values.map((value) => typeof value === 'number' ? value : value[valueProperty]) :
    [];
  return options
    .filter((option) => selectedValues.indexOf(option[valueProperty]) !== -1);
}

export class Dropdown extends React.Component<IProps> {
  private ref = React.createRef<{ state: { defaultOptions: any[] } }>();

  public render() {
    const {
      getOptionLabel,
      getOptionValue,
      noOptionsMessage,
      placeholder = 'Please select...',
      promiseOptions,
      valueProperty = 'id',
      ...inputProps
    } = this.props;
  
    const onBlur = () => inputProps.onBlur(inputProps.value);
    const transformedValue = transformValue(
      inputProps.value,
      this.ref.current ? this.ref.current!.state.defaultOptions : [],
      valueProperty
    );

    return (
      <Async
        ref={this.ref}
        {...inputProps}
        cacheOptions={true}
        defaultOptions={true}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isMulti={true}
        loadOptions={promiseOptions}
        noOptionsMessage={noOptionsMessage}
        onBlur={onBlur}
        placeholder={placeholder}
        value={transformedValue}
      />
    );
  }
}