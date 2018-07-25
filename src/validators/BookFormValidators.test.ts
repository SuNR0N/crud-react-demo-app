import { IFormData as CreateBookFormData } from '../components/book/CreateBookForm';
import { validate } from './BookFormValidators';

describe('AuthorFormValidators', () => {
  describe('validate', () => {
    const values: CreateBookFormData = {
      isbn13: '',
      title: '',
    };

    it('should add an error to the title if it is missing', () => {
      const errors = validate(values);

      expect(errors.title).toBe('Required');
    });

    it('should add an error to the title if it is longer than 255 characters', () => {
      const errors = validate({
        ...values,
        title: 'X'.repeat(256),
      });

      expect(errors.title).toBe('Maximum of 255 characters are allowed');
    });

    it('should not add an error to the title if it is valid', () => {
      const errors = validate({
        ...values,
        title: 'Foo',
      });

      expect(errors.title).toBeUndefined();
    });

    it('should not add an error to the isbn10 if it is missing', () => {
      const errors = validate(values);

      expect(errors.isbn10).toBeUndefined();
    });

    it('should add an error to the isbn10 if it exists but shorter than 10 characters', () => {
      const errors = validate({
        ...values,
        isbn10: '1'.repeat(7),
      });

      expect(errors.isbn10).toBe('Invalid ISBN-10 (Must be 10 characters long)');
    });

    it('should add an error to the isbn10 if it exists but longer than 10 characters', () => {
      const errors = validate({
        ...values,
        isbn10: '1'.repeat(13),
      });

      expect(errors.isbn10).toBe('Invalid ISBN-10 (Must be 10 characters long)');
    });

    it('should add an error to the isbn10 if it is 10 characters long but invalid', () => {
      const errors = validate({
        ...values,
        isbn10: '1234567890',
      });

      expect(errors.isbn10).toBe('Invalid ISBN-10 (Checksum failure)');
    });

    it('should not add an error to the isbn10 if it exists and valid (containing digits only)', () => {
      const errors = validate({
        ...values,
        isbn10: '0991344618',
      });

      expect(errors.isbn10).toBeUndefined();
    });

    it('should not add an error to the isbn10 if it exists and valid (containing alphanumeric characters)', () => {
      const errors = validate({
        ...values,
        isbn10: '099134460X',
      });

      expect(errors.isbn10).toBeUndefined();
    });

    it('should add an error to the isbn13 if it is missing', () => {
      const errors = validate(values);

      expect(errors.isbn13).toBe('Required');
    });

    it('should add an error to the isbn13 if it exists but shorter than 13 characters', () => {
      const errors = validate({
        ...values,
        isbn13: '1'.repeat(7),
      });

      expect(errors.isbn13).toBe('Invalid ISBN-13 (Must be 13 characters long)');
    });

    it('should add an error to the isbn13 if it exists but longer than 13 characters', () => {
      const errors = validate({
        ...values,
        isbn13: '1'.repeat(17),
      });

      expect(errors.isbn13).toBe('Invalid ISBN-13 (Must be 13 characters long)');
    });

    it('should add an error to the isbn13 if it is 13 characters long but invalid', () => {
      const errors = validate({
        ...values,
        isbn13: '1111111111111',
      });

      expect(errors.isbn13).toBe('Invalid ISBN-13 (Checksum failure)');
    });

    it('should not add an error to the isbn13 if it exists and valid', () => {
      const errors = validate({
        ...values,
        isbn13: '9780991344604',
      });

      expect(errors.isbn13).toBeUndefined();
    });
  });
});
