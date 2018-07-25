import { IFormData as CreateCategoryFormData } from '../components/category/CreateCategoryForm';
import { validate } from './CategoryFormValidators';

describe('CategoryFormValidators', () => {
  describe('validate', () => {
    const values: CreateCategoryFormData = {
      name: ''
    };

    it('should add an error to the name if it is missing', () => {
      const errors = validate(values);

      expect(errors.name).toBe('Required');
    });

    it('should add an error to the name if it is longer than 255 characters', () => {
      const errors = validate({
        ...values,
        name: 'X'.repeat(256),
      });

      expect(errors.name).toBe('Maximum of 255 characters are allowed');
    });

    it('should not add an error to the name if it is valid', () => {
      const errors = validate({
        ...values,
        name: 'Foo',
      });

      expect(errors.name).toBeUndefined();
    });
  });
});
