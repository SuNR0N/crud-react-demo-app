import * as reduxForm from 'redux-form';

import { actions } from '../../../../actions/PublisherActions';
import { CREATE_PUBLISHER_FORM } from '../../../../constants/forms';
import { INewPublisherDTO } from '../../../../interfaces/dtos/NewPublisherDTO';
import { IRootState } from '../../../../reducers';
import { mapDispatchToProps } from './CreatePublisherPageConnected';

describe('CreatePublisherPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the savePublisher function', () => {
      const createPublisherSpy = jest.spyOn(actions, 'createPublisher');
      const { savePublisher } = mapDispatchToProps(jest.fn());
      const publisherMock = {} as INewPublisherDTO;
      savePublisher(publisherMock);

      expect(createPublisherSpy).toHaveBeenCalledWith(publisherMock);
    });

    it('should map the submitForm function', () => {
      const submitSpy = jest.spyOn(reduxForm, 'submit');
      const { submitForm } = mapDispatchToProps(jest.fn());
      submitForm();

      expect(submitSpy).toHaveBeenCalledWith(CREATE_PUBLISHER_FORM);
    });
  });

  describe('mapStateToProps', () => {
    it('should map isFormValid', async () => {
      const state = {} as IRootState;
      jest.resetModules();
      jest.doMock('redux-form', () => ({
        isValid: (name: string) => jest.fn(() => name === CREATE_PUBLISHER_FORM ? true : false),
        reduxForm: () => jest.fn(),
      }));
      const { mapStateToProps } = (await import('./CreatePublisherPageConnected'));
      const { isFormValid } = mapStateToProps(state);

      expect(isFormValid).toBe(true);
    });
  });
});
