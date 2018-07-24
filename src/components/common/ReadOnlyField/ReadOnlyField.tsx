import React, { SFC } from 'react';
import { Input } from 'reactstrap';
import { WrappedFieldProps } from 'redux-form';

export const ReadOnlyField: SFC<WrappedFieldProps> = ({
  input,
  meta,
  ...custom
}) => (
  <Input
    {...input}
    {...custom}
    plaintext={true}
  >
    {input.value}
  </Input>
);
