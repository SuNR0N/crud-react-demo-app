import { FormErrors } from 'redux-form';

import { IFormData as CreatePublisherFormData } from '../components/publisher/CreatePublisherForm';
import {
  MAX_LENGTH,
  REQUIRED,
} from '../constants';

export function validate<T extends CreatePublisherFormData>(values: T): FormErrors<T> {
  const errors: FormErrors<T> = {};
  if (!values.name) {
    errors.name = REQUIRED;
  } else if (values.name.length > 255) {
    errors.name = MAX_LENGTH(255);
  }
  return errors;
}
