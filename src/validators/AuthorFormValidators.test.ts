import { IFormData as CreateAuthorFormData } from '../components/author/CreateAuthorForm';
import { validate } from './AuthorFormValidators';

describe('AuthorFormValidators', () => {
  describe('validate', () => {
    const values: CreateAuthorFormData = {
      firstName: '',
      lastName: '',
    };

    it('should add an error to the firstName if it is missing', () => {
      const errors = validate(values);

      expect(errors.firstName).toBe('Required');
    });

    it('should add an error to the firstName if it is longer than 255 characters', () => {
      const errors = validate({
        ...values,
        firstName: 'X'.repeat(256),
      });

      expect(errors.firstName).toBe('Maximum of 255 characters are allowed');
    });

    it('should not add an error to the firstName if it is valid', () => {
      const errors = validate({
        ...values,
        firstName: 'John',
      });

      expect(errors.firstName).toBeUndefined();
    });

    it('should not add an error to the middleName if does not exist', () => {
      const errors = validate(values);

      expect(errors.middleName).toBeUndefined();
    });

    it('should add an error to the middleName if it is longer than 255 characters', () => {
      const errors = validate({
        ...values,
        middleName: 'X'.repeat(256),
      });

      expect(errors.middleName).toBe('Maximum of 255 characters are allowed');
    });

    it('should add an error to the lastName if it is missing', () => {
      const errors = validate(values);

      expect(errors.lastName).toBe('Required');
    });

    it('should add an error to the lastName if it is longer than 255 characters', () => {
      const errors = validate({
        ...values,
        lastName: 'X'.repeat(256),
      });

      expect(errors.lastName).toBe('Maximum of 255 characters are allowed');
    });

    it('should not add an error to the lastName if it is valid', () => {
      const errors = validate({
        ...values,
        lastName: 'Doe',
      });

      expect(errors.lastName).toBeUndefined();
    });
  });
});
