import { createAction } from './ActionHelpers';

describe('ActionHelpers', () => {
  describe('createAction', () => {
    it('should return the type only if the payload is not defined', () => {
      const action = createAction('TYPE');

      expect(action).toEqual({ type: 'TYPE' });
    });

    it('should return the type and the payload if both of them are defined', () => {
      const action = createAction('TYPE', 'PAYLOAD');

      expect(action).toEqual({
        payload: 'PAYLOAD',
        type: 'TYPE',
      });
    });
  });
});
