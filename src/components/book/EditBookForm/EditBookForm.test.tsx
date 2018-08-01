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

import {
  AuthorsApi,
  CategoriesApi,
  PublishersApi,
} from '../../../api';
import { EDIT_BOOK_FORM } from '../../../constants';
import {
  IAuthorDTO,
  ICategoryDTO,
  IPublisherDTO,
} from '../../../interfaces/dtos';
import {
  DatePicker,
  Dropdown,
} from '../../common';
import {
  EditBookForm,
  FormDataNames,
  IFormData,
} from './EditBookForm';

describe('EditBookForm', () => {
  const categoriesMock: ICategoryDTO[] = [
    {
      id: 1,
      name: 'Foo',  
    } as ICategoryDTO,
    {
      id: 2,
      name: 'Bar',
    } as ICategoryDTO,
    {
      id: 3,
      name: 'FooBar',
    } as ICategoryDTO,
  ];
  const authorsMock: IAuthorDTO[] = [
    {
      firstName: 'Jane',
      fullName: 'Jane Doe',
      id: 1,
      lastName: 'Doe',
    } as IAuthorDTO,
    {
      firstName: 'John',
      fullName: 'John Doe',
      id: 2,
      lastName: 'Doe',
    } as IAuthorDTO,
  ];
  const publishersMock: IPublisherDTO[] = [
    {
      id: 1,
      name: 'Foo',  
    } as IPublisherDTO,
    {
      id: 2,
      name: 'Bar',
    } as IPublisherDTO,
    {
      id: 3,
      name: 'FooBar',
    } as IPublisherDTO,
  ];
  const initialValues: IFormData = {
    authors: [
      1,
    ],
    categories: [
      1,
      2,
    ],
    id: 1,
    isbn10: '0984782850',
    isbn13: '9780984782857',
    publicationDate: '2001-02-03',
    publishers: [
      3,
    ],
    title: 'FooBar',
  };
  const initialState = {
    form: {
      editBookForm: {
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
          <EditBookForm/>
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

  describe('Title', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let input: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditBookForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.title })
        .first();
      input = wrapper
        .find(Input)
        .find({ id: FormDataNames.title })
        .first();
    });

    it('should display its label as "Title"', () => {
      expect(label.text()).toBe('Title');
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
      expect(input.prop('value')).toBe('FooBar');
    });
  });

  describe('Categories', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let dropdown: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditBookForm defaultCategoryOptions={categoriesMock}/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.categories })
        .first();
      dropdown = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.categories })
        .first();
    });

    it('should display its label as "Categories"', () => {
      expect(label.text()).toBe('Categories');
    });

    it('should not be marked as required', () => {
      expect(label.hasClass('required')).toBeFalsy();
    });
  
    it('should display the dropdown', () => {
      expect(dropdown.exists()).toBeTruthy();
    });

    it('should not apply any validation classes', () => {
      expect(dropdown.hasClass('dropdown__wrapper--is-valid')).toBeFalsy();
    });

    it('should display the initial values', () => {
      const values = dropdown
        .find('.dropdown__value-container--is-multi')
        .find('.dropdown__multi-value__label')
        .hostNodes()
        .map((valueLabel) => valueLabel.text());

      expect(values).toEqual(['Foo', 'Bar']);
    });

    it('should display "No category found" if the search does not return any results', () => {
      jest.spyOn(CategoriesApi, 'getCategories').mockResolvedValue([]);
      wrapper = mount(
        <Provider store={createStore(combineReducers({ form: formReducer }))}>
          <EditBookForm/>
        </Provider>
      );
      const categoriesDropdownInput = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.categories })
        .find('input')
        .first();
      categoriesDropdownInput.simulate('change', { target: { value: 'Foo' } });
      const categoriesDropdownMenu = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.categories })
        .find('.dropdown__menu-list');

      expect(categoriesDropdownMenu.text()).toBe('No category found');
    });
  });

  describe('Authors', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let dropdown: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditBookForm defaultAuthorOptions={authorsMock}/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.authors })
        .first();
      dropdown = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.authors })
        .first();
    });

    it('should display its label as "Authors"', () => {
      expect(label.text()).toBe('Authors');
    });

    it('should not be marked as required', () => {
      expect(label.hasClass('required')).toBeFalsy();
    });
  
    it('should display the dropdown', () => {
      expect(dropdown.exists()).toBeTruthy();
    });

    it('should not apply any validation classes', () => {
      expect(dropdown.hasClass('dropdown__wrapper--is-valid')).toBeFalsy();
    });

    it('should display the initial values', () => {
      const values = dropdown
        .find('.dropdown__value-container--is-multi')
        .find('.dropdown__multi-value__label')
        .hostNodes()
        .map((valueLabel) => valueLabel.text());

      expect(values).toEqual(['Jane Doe']);
    });

    it('should display "No author found" if the search does not return any results', () => {
      jest.spyOn(AuthorsApi, 'getAuthors').mockResolvedValue([]);
      wrapper = mount(
        <Provider store={createStore(combineReducers({ form: formReducer }))}>
          <EditBookForm/>
        </Provider>
      );
      const authorsDropdownInput = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.authors })
        .find('input')
        .first();
      authorsDropdownInput.simulate('change', { target: { value: 'Foo' } });
      const authorsDropdownMenu = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.authors })
        .find('.dropdown__menu-list');

      expect(authorsDropdownMenu.text()).toBe('No author found');
    });
  });

  describe('ISBN-10', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let input: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditBookForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.isbn10 })
        .first();
      input = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn10 })
        .first();
    });

    it('should display its label as "ISBN-10"', () => {
      expect(label.text()).toBe('ISBN-10');
    });

    it('should not be marked as required', () => {
      expect(label.hasClass('required')).toBeFalsy();
    });
  
    it('should display the text input', () => {
      expect(input.exists()).toBeTruthy();
    });

    it('should not apply any validation classes', () => {
      expect(input.hasClass('is-valid')).toBeFalsy();
    });

    it('should not display any validation errors', () => {
      const feedback = input.parent().find('.invalid-feedback');
      
      expect(feedback.exists()).toBeFalsy();
    });

    it('should display the initial value', () => {
      expect(input.prop('value')).toBe('0984782850');
    });
  });

  describe('ISBN-13', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let input: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditBookForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.isbn13 })
        .first();
      input = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn13 })
        .first();
    });

    it('should display its label as "ISBN-13"', () => {
      expect(label.text()).toBe('ISBN-13');
    });

    it('should be marked as required', () => {
      expect(label.hasClass('required')).toBeTruthy();
    });
  
    it('should display the text input', () => {
      expect(input.exists()).toBeTruthy();
    });

    it('should not apply any validation classes', () => {
      expect(input.hasClass('is-valid')).toBeFalsy();
    });

    it('should not display any validation errors', () => {
      const feedback = input.parent().find('.invalid-feedback');
      
      expect(feedback.exists()).toBeFalsy();
    });

    it('should display the initial value', () => {
      expect(input.prop('value')).toBe('9780984782857');
    });
  });

  describe('Publication Date', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let datePicker: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditBookForm/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.publicationDate })
        .first();
      datePicker = wrapper
        .find(DatePicker)
        .find('input')
        .find({ id: FormDataNames.publicationDate })
        .first();
    });

    it('should display its label as "Publication Date"', () => {
      expect(label.text()).toBe('Publication Date');
    });

    it('should not be marked as required', () => {
      expect(label.hasClass('required')).toBeFalsy();
    });
  
    it('should display the text input', () => {
      expect(datePicker.exists()).toBeTruthy();
    });

    it('should not apply any validation classes', () => {
      expect(datePicker.hasClass('is-valid')).toBeFalsy();
    });

    it('should not display any validation errors', () => {
      const feedback = datePicker.parent().find('.invalid-feedback');
      
      expect(feedback.exists()).toBeFalsy();
    });

    it('should display the initial value', () => {
      expect(datePicker.prop('value')).toBe('2001-02-03');
    });
  });

  describe('Publishers', () => {
    let wrapper: ReactWrapper;
    let label: ReactWrapper;
    let dropdown: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={mockStore(initialState)}>
          <EditBookForm defaultPublisherOptions={publishersMock}/>
        </Provider>
      );
      label = wrapper
        .find(Label)
        .find({ for: FormDataNames.publishers })
        .first();
      dropdown = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.publishers })
        .first();
    });

    it('should display its label as "Publishers"', () => {
      expect(label.text()).toBe('Publishers');
    });

    it('should not be marked as required', () => {
      expect(label.hasClass('required')).toBeFalsy();
    });
  
    it('should display the dropdown', () => {
      expect(dropdown.exists()).toBeTruthy();
    });

    it('should not apply any validation classes', () => {
      expect(dropdown.hasClass('dropdown__wrapper--is-valid')).toBeFalsy();
    });

    it('should display the initial values', () => {
      const values = dropdown
        .find('.dropdown__value-container--is-multi')
        .find('.dropdown__multi-value__label')
        .hostNodes()
        .map((valueLabel) => valueLabel.text());

      expect(values).toEqual(['FooBar']);
    });

    it('should display "No publisher found" if the search does not return any results', () => {
      jest.spyOn(PublishersApi, 'getPublishers').mockResolvedValue([]);
      wrapper = mount(
        <Provider store={createStore(combineReducers({ form: formReducer }))}>
          <EditBookForm/>
        </Provider>
      );
      const publishersDropdownInput = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.publishers })
        .find('input')
        .first();
        publishersDropdownInput.simulate('change', { target: { value: 'Foo' } });
      const publishersDropdownMenu = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.publishers })
        .find('.dropdown__menu-list');

      expect(publishersDropdownMenu.text()).toBe('No publisher found');
    });
  });

  describe('validation', () => {
    let store: Store<{ form: FormStateMap}>;
    let titleInput: ReactWrapper;
    let categoriesDropdownInput: ReactWrapper;
    let authorsDropdownInput: ReactWrapper;
    let isbn10Input: ReactWrapper;
    let isbn13Input: ReactWrapper;
    let publicationDatePicker: ReactWrapper;
    let publishersDropdownInput: ReactWrapper;
    let wrapper: ReactWrapper;
    
    beforeEach(() => {
      jest.spyOn(AuthorsApi, 'getAuthors').mockResolvedValue(authorsMock);
      jest.spyOn(CategoriesApi, 'getCategories').mockResolvedValue(categoriesMock);
      jest.spyOn(PublishersApi, 'getPublishers').mockResolvedValue(publishersMock);
      store = createStore(combineReducers({ form: formReducer }), initialState);
      wrapper = mount(
        <Provider store={store}>
          <EditBookForm
            defaultCategoryOptions={categoriesMock}
          />
        </Provider>
      );
      titleInput = wrapper
        .find(Input)
        .find({ id: FormDataNames.title })
        .first();
      categoriesDropdownInput = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.categories })
        .find('input')
        .first();
      authorsDropdownInput = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.authors })
        .find('input')
        .first();
      isbn10Input = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn10 })
        .first();
      isbn13Input = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn13 })
        .first();
      publicationDatePicker = wrapper
        .find(DatePicker)
        .find('input')
        .find({ id: FormDataNames.publicationDate })
        .first();
      publishersDropdownInput = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.publishers })
        .find('input')
        .first();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should be valid by default', () => {
      const valid = isValid(EDIT_BOOK_FORM)(store.getState());
  
      expect(valid).toBeTruthy();
    });

    it('should display a valid feedback if the title is valid', () => {
      titleInput.simulate('change', { target: { value: 'Foo' } });
      titleInput.simulate('blur');

      expect(titleInput.render().hasClass('is-valid')).toBeTruthy();
    });

    it('should display a validation error if the title is touched and missing', () => {
      titleInput.simulate('change', { target: { value: '' } });
      titleInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.title })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(titleInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Required');
    });
    
    it('should display a validation error if the title is longer than allowed', () => {
      titleInput.simulate('change', { target: { value: 'X'.repeat(256) } });
      titleInput.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.title })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(titleInput.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Maximum of 255 characters are allowed');
    });

    it('should display a valid feedback if the categories are valid', () => {
      categoriesDropdownInput.simulate('change', { target: { value: 'FooBar' } });
      const categoriesDropdownMenu = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.categories })
        .find('.dropdown__menu-list');
      const firstOption = categoriesDropdownMenu
        .find('.dropdown__option').first();
      firstOption.simulate('click');
      categoriesDropdownInput.simulate('blur');
      const categoriesDropdown = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.categories })
        .first();

      expect(categoriesDropdown.render().hasClass('dropdown__wrapper--is-valid')).toBeTruthy();
    });

    it('should display a valid feedback if the authors are valid', () => {
      authorsDropdownInput.simulate('change', { target: { value: 'John' } });
      const authorsDropdownMenu = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.authors })
        .find('.dropdown__menu-list');
      const firstOption = authorsDropdownMenu
        .find('.dropdown__option').first();
      firstOption.simulate('click');
      authorsDropdownInput.simulate('blur');
      const authorsDropdown = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.authors })
        .first();

      expect(authorsDropdown.render().hasClass('dropdown__wrapper--is-valid')).toBeTruthy();
    });

    it('should display a valid feedback if the ISBN-10 is valid', () => {
      isbn10Input.simulate('change', { target: { value: '0984782850' } });
      isbn10Input.simulate('blur');

      expect(isbn10Input.render().hasClass('is-valid')).toBeTruthy();
    });
    
    it('should display a validation error if the ISBN-10 is shorter than allowed', () => {
      isbn10Input.simulate('change', { target: { value: '1'.repeat(7) } });
      isbn10Input.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn10 })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(isbn10Input.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Invalid ISBN-10 (Must be 10 characters long)');
    });

    it('should display a validation error if the ISBN-10 is longer than allowed', () => {
      isbn10Input.simulate('change', { target: { value: '1'.repeat(13) } });
      isbn10Input.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn10 })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(isbn10Input.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Invalid ISBN-10 (Must be 10 characters long)');
    });

    it('should display a validation error if the ISBN-10 is invalid', () => {
      isbn10Input.simulate('change', { target: { value: '1234567890' } });
      isbn10Input.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn10 })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(isbn10Input.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Invalid ISBN-10 (Checksum failure)');
    });

    it('should display a valid feedback if the ISBN-13 is valid', () => {
      isbn13Input.simulate('change', { target: { value: '9780984782857' } });
      isbn13Input.simulate('blur');

      expect(isbn13Input.render().hasClass('is-valid')).toBeTruthy();
    });

    it('should display a validation error if the ISBN-13 is touched and missing', () => {
      isbn13Input.simulate('change', { target: { value: '' } });
      isbn13Input.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn13 })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(isbn13Input.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Required');
    });
    
    it('should display a validation error if the ISBN-13 is shorter than allowed', () => {
      isbn13Input.simulate('change', { target: { value: '1'.repeat(10) } });
      isbn13Input.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn13 })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(isbn13Input.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Invalid ISBN-13 (Must be 13 characters long)');
    });

    it('should display a validation error if the ISBN-13 is longer than allowed', () => {
      isbn13Input.simulate('change', { target: { value: '1'.repeat(17) } });
      isbn13Input.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn13 })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(isbn13Input.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Invalid ISBN-13 (Must be 13 characters long)');
    });

    it('should display a validation error if the ISBN-13 is invalid', () => {
      isbn13Input.simulate('change', { target: { value: '1234567890123' } });
      isbn13Input.simulate('blur');
      const feedback = wrapper
        .find(Input)
        .find({ id: FormDataNames.isbn13 })
        .first()
        .closest('div')
        .find('.invalid-feedback');

      expect(isbn13Input.render().hasClass('is-invalid')).toBeTruthy();
      expect(feedback.exists()).toBeTruthy();
      expect(feedback.text()).toBe('Invalid ISBN-13 (Checksum failure)');
    });

    it('should display a valid feedback if the publication date is valid', () => {
      publicationDatePicker.simulate('change', { target: { value: '2001-02-03' } });
      publicationDatePicker.simulate('blur');

      expect(publicationDatePicker.render().hasClass('is-valid')).toBeTruthy();
    });

    it('should display a valid feedback if the publishers are valid', () => {
      publishersDropdownInput.simulate('change', { target: { value: 'Bar' } });
      const publishersDropdownMenu = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.publishers })
        .find('.dropdown__menu-list');
      const firstOption = publishersDropdownMenu
        .find('.dropdown__option').first();
      firstOption.simulate('click');
      publishersDropdownInput.simulate('blur');
      const publishersDropdown = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.publishers })
        .first();

      expect(publishersDropdown.render().hasClass('dropdown__wrapper--is-valid')).toBeTruthy();
    });

    it('should be valid if the title and ISBN-13 are provided and valid', () => {
      const selectedCategories = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.categories })
        .find('.dropdown__value-container--is-multi')
        .find('.dropdown__multi-value__remove')
        .hostNodes();
      const selectedAuthors = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.authors })
        .find('.dropdown__value-container--is-multi')
        .find('.dropdown__multi-value__remove')
        .hostNodes();
      const selectedPublishers = wrapper
        .find(Dropdown)
        .find({ id: FormDataNames.publishers })
        .find('.dropdown__value-container--is-multi')
        .find('.dropdown__multi-value__remove')
        .hostNodes();
      
      titleInput.simulate('change', { target: { value: 'FooBar2' } });
      selectedCategories.forEach((closeIcon) => closeIcon.simulate('click'));
      selectedAuthors.forEach((closeIcon) => closeIcon.simulate('click'));
      isbn10Input.simulate('change', { target: { value: '' } });
      isbn13Input.simulate('change', { target: { value: '9780991344611' } });
      publicationDatePicker.simulate('change', { target: { value: '' } });
      selectedPublishers.forEach((closeIcon) => closeIcon.simulate('click'));

      const valid = isValid(EDIT_BOOK_FORM)(store.getState());
  
      expect(valid).toBeTruthy();
    });
  });
});
