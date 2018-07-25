import { IFormData as CreatePublisherFormData } from '../components/publisher/CreatePublisherForm';
import { validate } from './PublisherFormValidators';

describe('PublisherFormValidators', () => {
  describe('validate', () => {
    const values: CreatePublisherFormData = {
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
