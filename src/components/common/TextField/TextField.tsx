import * as React from 'react';
import {
  FormFeedback,
  Input,
} from 'reactstrap';
import { WrappedFieldProps } from 'redux-form';

export const TextField: React.SFC<WrappedFieldProps> = ({
  input,
  meta: {
    touched,
    error,
  },
  ...custom
}) => (
  <React.Fragment>
    <Input
      {...(touched ? { valid: !error } : {})}
      {...(touched ? { invalid: !!error } : {})}
      {...input}
      {...custom}
    />
    {error &&
      <FormFeedback>{error}</FormFeedback>
    }
  </React.Fragment>
);
