import * as reduxForm from 'redux-form';

import { actions } from '../../../../actions/PublisherActions';
import { EDIT_PUBLISHER_FORM } from '../../../../constants/forms';
import {
  IHATEOASLink,
  INewPublisherDTO,
  IPublisherDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './EditPublisherPageConnected';

describe('EditPublisherPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the loadPublisher function', () => {
      const loadPublisherSpy = jest.spyOn(actions, 'loadPublisher');
      const { loadPublisher } = mapDispatchToProps(jest.fn());
      const idMock = 1;
      loadPublisher(idMock);

      expect(loadPublisherSpy).toHaveBeenCalledWith(idMock);
    });

    it('should map the savePublisher function', () => {
      const updatePublisherSpy = jest.spyOn(actions, 'updatePublisher');
      const { savePublisher } = mapDispatchToProps(jest.fn());
      const publisherMock = {} as INewPublisherDTO;
      const idMock = 1;
      const linkMock = {} as IHATEOASLink;
      savePublisher(publisherMock, idMock, linkMock);

      expect(updatePublisherSpy).toHaveBeenCalledWith(publisherMock, idMock, linkMock);
    });

    it('should map the submitForm function', async () => {
      const submitSpy = jest.spyOn(reduxForm, 'submit');
      const { submitForm } = mapDispatchToProps(jest.fn());
      submitForm();

      expect(submitSpy).toHaveBeenCalledWith(EDIT_PUBLISHER_FORM);
    });
  });

  describe('mapStateToProps', () => {
    const publisherMock: Partial<IPublisherDTO> = {
      id: 1,
      name: 'Foo',
    };
    const state = {
      publisher: {
        currentPublisher: publisherMock,
      },
    } as IRootState;

    it('should map currentPublisher', () => {
      const { currentPublisher } = mapStateToProps(state);

      expect(currentPublisher).toBe(publisherMock);
    });

    it('should map initialFormData', () => {
      const { initialFormData } = mapStateToProps(state);

      expect(initialFormData).toEqual({
        id: publisherMock.id,
        name: publisherMock.name,
      });
    });

    it('should map isFormValid', async () => {
      jest.resetModules();
      jest.doMock('redux-form', () => ({
        isValid: (name: string) => jest.fn(() => name === EDIT_PUBLISHER_FORM ? true : false),
        reduxForm: () => jest.fn(),
      }));
      const { mapStateToProps: mapStateToPropsDynamic } = (await import('./EditPublisherPageConnected'));
      const { isFormValid } = mapStateToPropsDynamic(state);

      expect(isFormValid).toBe(true);
    });
  });
});
