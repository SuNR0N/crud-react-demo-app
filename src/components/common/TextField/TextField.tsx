import React, {
  Fragment,
  SFC,
} from 'react';
import {
  FormFeedback,
  Input,
} from 'reactstrap';
import { WrappedFieldProps } from 'redux-form';

export const TextField: SFC<WrappedFieldProps> = ({
  input,
  meta: {
    touched,
    error,
  },
  ...custom
}) => (
  <Fragment>
    <Input
      {...(touched ? { valid: !error } : {})}
      {...(touched ? { invalid: !!error } : {})}
      {...input}
      {...custom}
    />
    {error &&
      <FormFeedback>{error}</FormFeedback>
    }
  </Fragment>
);
