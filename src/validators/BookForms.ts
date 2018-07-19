import { FormErrors } from 'redux-form';

import { IFormData as CreateBookFormData } from '../components/book/CreateBookForm';
import {
  INVALID_ISBN_10,
  INVALID_ISBN_13,
  MAX_LENGTH,
  REQUIRED,
} from '../constants';

function validateISBN10(value: string): string | undefined {
  if (value.length !== 10) {
    return INVALID_ISBN_10('Must be 10 characters long');
  }
  const digits = value
    .split('')
    .map((digit) => digit === 'X' ? 10 : parseInt(digit, 10));
  const sum = digits.reduce((previous, current, index) => {
    previous += (current * (index + 1));
    return previous;
  }, 0);
  return sum % 11 === 0 ? undefined : INVALID_ISBN_10('Checksum failure');
}

function validateISBN13(value: string): string | undefined {
  if (value.length !== 13) {
    return INVALID_ISBN_13('Must be 13 characters long');
  }
  const digits = value
    .split('')
    .map(Number);
  const sum = digits.reduce((previous, current, index) => {
    previous += (index % 2 === 1 ? 3 * current : current);
    return previous;
  }, 0);
  return sum % 10 === 0 ? undefined : INVALID_ISBN_13('Checksum failure');
}

export function validate<T extends CreateBookFormData>(values: T): FormErrors<T> {
  const errors: FormErrors<T> = {};
  if (!values.title) {
    errors.title = REQUIRED;
  } else if (values.title.length > 255) {
    errors.title = MAX_LENGTH(255);
  }
  if (values.isbn10) {
    errors.isbn10 = validateISBN10(values.isbn10);
  }
  if (!values.isbn13) {
    errors.isbn13 = REQUIRED;
  } else {
    errors.isbn13 = validateISBN13(values.isbn13);
  }
  return errors;
}
