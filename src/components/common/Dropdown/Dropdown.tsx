import React, {
  Component,
  createRef,
} from 'react';
import Async from 'react-select/lib/Async';
import { WrappedFieldInputProps } from 'redux-form';

export interface IProps extends WrappedFieldInputProps {
  defaultOptions?: any[];
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => any;
  id?: string;
  noOptionsMessage?: () => string;
  placeholder?: string;
  promiseOptions: (query?: string) => Promise<any>;
  touched: boolean;
  valid: boolean;
  valueProperty?: string;
}

const transformValue = (values: any[], options: any[], valueProperty: string) => {
  const selectedValues = Array.isArray(values) ?
    values.map((value) => typeof value === 'number' ? value : value[valueProperty]) :
    [];
  return options
    .filter((option) => selectedValues.indexOf(option[valueProperty]) !== -1);
}

export class Dropdown extends Component<IProps> {
  private ref = createRef<{ state: { defaultOptions: any[] } }>();

  public render() {
    const {
      defaultOptions = true,
      getOptionLabel,
      getOptionValue,
      id,
      noOptionsMessage,
      placeholder = 'Please select...',
      promiseOptions,
      touched,
      valid,
      valueProperty = 'id',
      ...inputProps
    } = this.props;

    const options = Array.isArray(defaultOptions) ?
      defaultOptions :
      (this.ref.current ? 
        (Array.isArray(this.ref.current!.state.defaultOptions) ? this.ref.current!.state.defaultOptions : [])
        : []
      );
  
    const onBlur = () => inputProps.onBlur(inputProps.value);
    const transformedValue = transformValue(
      inputProps.value,
      options,
      valueProperty
    );

    const classNamePrefix = 'dropdown';
    let className = `${classNamePrefix}__wrapper`;
    if (valid && touched) {
      className = `${className}--is-valid`;
    }

    return (
      <Async
        className={className}
        classNamePrefix={classNamePrefix}
        ref={this.ref}
        {...inputProps}
        id={id}
        cacheOptions={true}
        defaultOptions={defaultOptions}
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