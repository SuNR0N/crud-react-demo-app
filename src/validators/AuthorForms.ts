import { FormErrors } from 'redux-form';

import { IFormData as CreateAuthorFormData } from '../components/author/CreateAuthorForm';
import {
  MAX_LENGTH,
  REQUIRED,
} from '../constants';

export function validate<T extends CreateAuthorFormData>(values: T): FormErrors<T> {
  const errors: FormErrors<T> = {};
    if (!values.firstName) {
    errors.firstName = REQUIRED;
  } else if (values.firstName.length > 255) {
    errors.firstName = MAX_LENGTH(255);
  }
  if (values.middleName && values.middleName.length > 255) {
    errors.middleName = MAX_LENGTH(255);
  }
  if (!values.lastName) {
    errors.lastName = REQUIRED;
  } else if (values.lastName.length > 255) {
    errors.lastName = MAX_LENGTH(255);
  }
  return errors;
}
