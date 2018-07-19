import { FormErrors } from 'redux-form';

import { IFormData as CreateCategoryFormData } from '../components/category/CreateCategoryForm';
import {
  MAX_LENGTH,
  REQUIRED,
} from '../constants';

export function validate<T extends CreateCategoryFormData>(values: T): FormErrors<T> {
  const errors: FormErrors<T> = {};
  if (!values.name) {
    errors.name = REQUIRED;
  } else if (values.name.length > 255) {
    errors.name = MAX_LENGTH(255);
  }
  return errors;
}
