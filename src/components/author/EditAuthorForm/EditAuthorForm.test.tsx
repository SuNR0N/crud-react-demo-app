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
  isValid,
  reducer as formReducer,
} from 'redux-form';
import createMockStore from 'redux-mock-store';

import { EDIT_AUTHOR_FORM } from '../../../constants';
import {
  EditAuthorForm,
  FormDataNames,
  IFormData,
} from './EditAuthorForm';

describe('EditAuthorForm', () => {
  const initialValues: IFormData = {
    firstName: 'John',
    id: 1,
    lastName: 'Doe',
    middleName: 'X',
  };
  const initialState = {
    form: {
      editAuthorForm: {
        values: initialValues as any,
      },
    },
  };
  const mockStore = createMockStore();

  describe('ID', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let paragraph: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditAuthorForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.id })
        .first();
      paragraph = wrapper
        .find('p')
        .find({ id: FormDataNames.id })
        .first();
    });

    it('should display its label as "ID"', () => {
      expect(label.text()).toBe('ID');
    });

    it('should not be marked as required', () => {
      expect(label.hasClass('required')).toBeFalsy();
    });
  
    it('should display the read only input', () => {
      expect(paragraph.exists()).toBeTruthy();
    });

    it('should display the initial value', () => {
      expect(paragraph.text()).toBe('1');
    });
  });

  describe('First Name', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let input: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditAuthorForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.firstName })
        .first();
      input = wrapper
        .find(Input)
        .find({ id: FormDataNames.firstName })
        .first();
    });

    it('should display its label as "First Name"', () => {
      expect(label.text()).toBe('First Name');
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

    it('should display the initial value', () => {
      expect(input.prop('value')).toBe('John');
    });
  });

  describe('Middle Name', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let input: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditAuthorForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.middleName })
        .first();
      input = wrapper
        .find(Input)
        .find({ id: FormDataNames.middleName })
        .first();
    });

    it('should display its label as "Middle Name"', () => {
      expect(label.text()).toBe('Middle Name');
    });

    it('should not be marked as required', () => {
      expect(label.hasClass('required')).toBeFalsy();
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

    it('should display the initial value', () => {
      expect(input.prop('value')).toBe('X');
    });
  });

  describe('Last Name', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let input: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditAuthorForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.lastName })
        .first();
      input = wrapper
        .find(Input)
        .find({ id: FormDataNames.lastName })
        .first();
    });

    it('should display its label as "Last Name"', () => {
      expect(label.text()).toBe('Last Name');
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

    it('should display the initial value', () => {
      expect(input.prop('value')).toBe('Doe');
    });
  });

  describe('validation', () => {
    let store: Store<{ form: FormStateMap}>;
    let firstNameInput: ReactWrapper;
    let lastNameInput: ReactWrapper;
    let middleNameInput: ReactWrapper;
    let wrapper: ReactWrapper;
    
    beforeEach(() => {
      store = createStore(combineReducers({ form: formReducer }), initialState);
      wrapper = mount(
        <Provider store={store}>
          <EditAuthorForm/>
        </Provider>
      );
      firstNameInput = wrapper
        .find(Input)
        .find({ id: FormDataNames.firstName })
        .first();
      lastNameInput = wrapper
        .find(Input)
        .find({ id: FormDataNames.lastName })
        .first();
      middleNameInput = wrapper
        .find(Input)
        .find({ id: FormDataNames.middleName })
        .first();
    });

    it('should be valid by default', () => {
      const valid = isValid(EDIT_AUTHOR_FORM)(store.getState());
  
      expect(valid).toBeTruthy();
    });

    it('should display a valid feedback if the first name is valid', () => {
      firstNameInput.simulate('change', { target: { value: 'John' } });
      firstNameInput.simulate('blur');

      expect(firstNameInput.render().hasClass('is-valid')).toBeTruthy();
    });

    it('should display a validation error if the first name is touched and missing', () => {
      firstNameInput.simulate('change', { target: { value: '' } });
      firstNameInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.firstName })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(firstNameInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Required');
    });
    
    it('should display a validation error if the first name is longer than allowed', () => {
      firstNameInput.simulate('change', { target: { value: 'X'.repeat(256) } });
      firstNameInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.firstName })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(firstNameInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Maximum of 255 characters are allowed');
    });

    it('should display a valid feedback if the middle name is valid', () => {
      middleNameInput.simulate('change', { target: { value: 'X' } });
      middleNameInput.simulate('blur');

      expect(middleNameInput.render().hasClass('is-valid')).toBeTruthy();
    });

    it('should display a validation error if the middle name is longer than allowed', () => {
      middleNameInput.simulate('change', { target: { value: 'X'.repeat(256) } });
      middleNameInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.middleName })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(middleNameInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Maximum of 255 characters are allowed');
    });

    it('should display a valid feedback if the last name is valid', () => {
      lastNameInput.simulate('change', { target: { value: 'Doe' } });
      lastNameInput.simulate('blur');

      expect(lastNameInput.render().hasClass('is-valid')).toBeTruthy();
    });

    it('should display a validation error if the last name is touched and missing', () => {
      lastNameInput.simulate('change', { target: { value: '' } });
      lastNameInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.lastName })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(lastNameInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Required');
    });
    
    it('should display a validation error if the last name is longer than allowed', () => {
      lastNameInput.simulate('change', { target: { value: 'X'.repeat(256) } });
      lastNameInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.lastName })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(lastNameInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Maximum of 255 characters are allowed');
    });

    it('should be valid if only the first and last names are provided and valid', () => {
      firstNameInput.simulate('change', { target: { value: 'John' } });
      lastNameInput.simulate('change', { target: { value: 'Doe' } });
      middleNameInput.simulate('change', { target: { value: '' } });

      const valid = isValid(EDIT_AUTHOR_FORM)(store.getState());
  
      expect(valid).toBeTruthy();
    });
  });
});
