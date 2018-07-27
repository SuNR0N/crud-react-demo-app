import {
  mount,
  ReactWrapper,
} from 'enzyme';
import React from 'react';
import { Provider} from 'react-redux';
import {
  Input,
  Label,
} from 'reactstrap';
import {
  combineReducers,
  createStore,
  Store,
} from 'redux';
import {
  FormStateMap,
  isInvalid,
  isValid,
  reducer as formReducer,
} from 'redux-form';
import createMockStore from 'redux-mock-store';

import { CREATE_PUBLISHER_FORM } from '../../../constants';
import {
  CreatePublisherForm,
  FormDataNames,
} from './CreatePublisherForm';

describe('CreatePublisherForm', () => {
  const initialState = {};
  const mockStore = createMockStore();

  describe('Name', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let input: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <CreatePublisherForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.name })
        .first();
      input = wrapper
        .find(Input)
        .find({ id: FormDataNames.name })
        .first();
    });

    it('should display its label as "Name"', () => {
      expect(label.text()).toBe('Name');
    });

    it('should be marked as required', () => {
      expect(label.hasClass('required')).toBeTruthy();
    });
  
    it('should display the text input', () => {
      expect(input.exists()).toBeTruthy();
    });

    it('should not apply any validation error classes', () => {
      expect(input.hasClass('is-invalid')).toBeFalsy();
    });

    it('should not display any validation errors', () => {
      const feedback = input.parent().find('.invalid-feedback');
      
      expect(feedback.exists()).toBeFalsy();
    });
  });

  describe('validation', () => {
    let store: Store<{ form: FormStateMap}>;
    let nameInput: ReactWrapper;
    let wrapper: ReactWrapper;
    
    beforeEach(() => {
      store = createStore(combineReducers({ form: formReducer }));
      wrapper = mount(
        <Provider store={store}>
          <CreatePublisherForm/>
        </Provider>
      );
      nameInput = wrapper
        .find(Input)
        .find({ id: FormDataNames.name })
        .first();
    });

    it('should be invalid by default', () => {
      const invalid = isInvalid(CREATE_PUBLISHER_FORM)(store.getState());
  
      expect(invalid).toBeTruthy();
    });

    it('should display a valid feedback if the name is valid', () => {
      nameInput.simulate('change', { target: { value: 'Foo' } });
      nameInput.simulate('blur');

      expect(nameInput.render().hasClass('is-valid')).toBeTruthy();
    });

    it('should display a validation error if the name is touched and missing', () => {
      nameInput.simulate('change', { target: { value: '' } });
      nameInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.name })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(nameInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Required');
    });
    
    it('should display a validation error if the name is longer than allowed', () => {
      nameInput.simulate('change', { target: { value: 'X'.repeat(256) } });
      nameInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.name })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(nameInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Maximum of 255 characters are allowed');
    });

    it('should be valid if the name is provided and valid', () => {
      nameInput.simulate('change', { target: { value: 'Foo' } });

      const valid = isValid(CREATE_PUBLISHER_FORM)(store.getState());
  
      expect(valid).toBeTruthy();
    });
  });
});
