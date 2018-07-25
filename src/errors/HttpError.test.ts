import { HttpError } from './HttpError';

describe('HttpError', () => {
  describe('constructor', () => {
    let error: HttpError;
    let setPrototypeOfSpy: jest.SpyInstance;

    beforeEach(() => {
      setPrototypeOfSpy = jest.spyOn(Object, 'setPrototypeOf');
      error = new HttpError(404, 'Not Found', 'Foo');
    });

    it('should set its own prototype', () => {
      expect(setPrototypeOfSpy).toHaveBeenCalledWith(error, HttpError.prototype);
    });

    it('should set its status based on the provided status argument', () => {
      expect(error.status).toBe(404);
    });

    it('should set its statusText based on the provided statusText argument', () => {
      expect(error.statusText).toBe('Not Found');
    });

    it('should set its message based on the provided message argument', () => {
      expect(error.message).toBe('Foo');
    });
  });
});