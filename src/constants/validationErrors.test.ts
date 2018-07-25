import {
  INVALID_ISBN_10,
  INVALID_ISBN_13,
  MAX_LENGTH,
  REQUIRED,
} from './validationErrors';

describe('validationErrors', () => {
  describe('INVALID_ISBN_10', () => {
    it('should return a dynamic value based on the provided reason', () => {
      expect(INVALID_ISBN_10('Foo')).toBe('Invalid ISBN-10 (Foo)');
    });
  });

  describe('INVALID_ISBN_13', () => {
    it('should return a dynamic value based on the provided reason', () => {
      expect(INVALID_ISBN_13('Foo')).toBe('Invalid ISBN-13 (Foo)');
    });
  });

  describe('MAX_LENGTH', () => {
    it('should return a dynamic value based on the provided max value', () => {
      expect(MAX_LENGTH(1337)).toBe('Maximum of 1337 characters are allowed');
    });
  });

  describe('REQUIRED', () => {
    it('should be "Required"', () => {
      expect(REQUIRED).toBe('Required');
    });
  });
});
