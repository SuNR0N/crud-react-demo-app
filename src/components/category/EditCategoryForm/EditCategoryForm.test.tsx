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

import { EDIT_CATEGORY_FORM } from '../../../constants';
import {
  EditCategoryForm,
  FormDataNames,
  IFormData,
} from './EditCategoryForm';

describe('EditCategoryForm', () => {
  const initialValues: IFormData = {
    id: 1,
    name: 'Foo'
  }
  const initialState = {
    form: {
      editCategoryForm: {
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
          <EditCategoryForm/>
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

  describe('Name', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let input: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditCategoryForm/>
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

    it('should display the initial value', () => {
      expect(input.prop('value')).toBe('Foo');
    });
  });

  describe('validation', () => {
    let store: Store<{ form: FormStateMap}>;
    let nameInput: ReactWrapper;
    let wrapper: ReactWrapper;
    
    beforeEach(() => {
      store = createStore(combineReducers({ form: formReducer }), initialState);
      wrapper = mount(
        <Provider store={store}>
          <EditCategoryForm/>
        </Provider>
      );
      nameInput = wrapper
        .find(Input)
        .find({ id: FormDataNames.name })
        .first();
    });

    it('should be valid by default', () => {
      const valid = isValid(EDIT_CATEGORY_FORM)(store.getState());
  
      expect(valid).toBeTruthy();
    });

    it('should display a valid feedback if the name is valid', () => {
      nameInput.simulate('change', { target: { value: 'Bar' } });
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
      nameInput.simulate('change', { target: { value: 'Bar' } });

      const valid = isValid(EDIT_CATEGORY_FORM)(store.getState());
  
      expect(valid).toBeTruthy();
    });
  });
});
