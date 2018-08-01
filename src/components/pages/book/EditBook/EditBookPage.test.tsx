import {
  mount,
  ReactWrapper,
  shallow,
} from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import {
  Button,
  Input,
} from 'reactstrap';
import {
  combineReducers,
  createStore,
} from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  IAuthorDTO,
  IBookDTO,
  ICategoryDTO,
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import {
  EditBookForm,
  FormDataNames,
  IFormData,
} from '../../../book/EditBookForm';
import {
  ActionBar,
  DatePicker,
  Dropdown,
} from '../../../common';
import {
  EditBookPage,
  IProps,
} from './EditBookPage';

describe('EditBookPage', () => {
  const minProps = {
    currentBook: {} as IBookDTO,
    initialFormData: {},
    isFormValid: false,
    loadAuthors: jest.fn(),
    loadBook: jest.fn(),
    loadCategories: jest.fn(),
    loadPublishers: jest.fn(),
    match: {
      params: {},
    },
    saveBook: jest.fn(),
    submitForm: jest.fn(),
  } as any as IProps;

  describe('componentDidMount', () => {
    let loadBookMock: jest.Mock;

    beforeEach(() => {
      loadBookMock = jest.fn();
    });

    it('should call the loadBook function if the current route param does not match the id of the current book', () => {
      const props: IProps = {
        ...minProps,
        currentBook: {
          ...minProps.currentBook,
          id: 3,
        },
        loadBook: loadBookMock,
        match: {
          ...minProps.match,
          params: {
            id: '1'
          },
        },
      };
      shallow(<EditBookPage {...props}/>);

      expect(loadBookMock).toBeCalledWith(1);
    });

    it('should not call the loadBook function if the current route param matches the id of the current book', () => {
      const props: IProps = {
        ...minProps,
        currentBook: {
          ...minProps.currentBook,
          id: 1,
        },
        loadBook: loadBookMock,
        match: {
          ...minProps.match,
          params: {
            id: '1'
          },
        },
      };
      shallow(<EditBookPage {...props}/>);

      expect(loadBookMock).not.toHaveBeenCalled();
    });
  });

  it('should render its title as "Edit Book"', () => { 
    const wrapper = shallow(<EditBookPage {...minProps}/>);
    const header = wrapper.find('h2');

    expect(header.text()).toBe('Edit Book');
  });

  it('should navigate back when the Cancel button is clicked', () => {
    const goBackMock = jest.fn();
    const props: IProps = {
      ...minProps,
      history: {
        ...minProps.history,
        goBack: goBackMock,
      },
    };
    const wrapper = shallow(<EditBookPage {...props}/>);
    const cancelButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(0);
    cancelButton.simulate('click');

    expect(goBackMock).toHaveBeenCalled();
  });

  it('should call the submitForm function when the Save button is clicked', () => {
    const submitFormMock = jest.fn();
    const props: IProps = {
      ...minProps,
      isFormValid: true,
      submitForm: submitFormMock,
    };
    const wrapper = shallow(<EditBookPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);
    saveButton.simulate('click');

    expect(submitFormMock).toHaveBeenCalled();
  });

  it('should disable the Save button if the form is invalid', () => {
    const wrapper = shallow(<EditBookPage {...minProps}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);

    expect(saveButton.prop('disabled')).toBe(true);
  });

  it('should enable the Save button if the form is valid', () => {
    const props: IProps = {
      ...minProps,
      isFormValid: true,
    };
    const wrapper = shallow(<EditBookPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);

    expect(saveButton.prop('disabled')).toBe(false);
  });

  it('should set the initialValues on the form', () => {
    const initialFormData: Partial<IFormData> = {
      isbn13: '1234567890123',
      title: 'Foo',
    };
    const props: IProps = {
      ...minProps,
      initialFormData,
    };
    const wrapper = shallow(<EditBookPage {...props}/>);
    const form = wrapper.find(EditBookForm);

    expect(form.prop('initialValues')).toBe(initialFormData);
  });

  describe('when submitting the form', () => {
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
    const categoriesMock: ICategoryDTO[] = [
      {
        id: 3,
        name: 'Foo',  
      } as ICategoryDTO,
      {
        id: 7,
        name: 'Bar',
      } as ICategoryDTO,
    ];
    const publishersMock: IPublisherDTO[] = [
      {
        id: 5,
        name: 'FooBar',
      } as IPublisherDTO,
    ];
    const currentBook: IBookDTO = {
      ...minProps.currentBook,
      _links: {
        self: {} as IHATEOASLink,
        update: {} as IHATEOASLink,
      },
      id: 1,
    };
    let saveBookMock: jest.Mock;
    let props: IProps;
    let form: ReactWrapper<any>;
    let authorsDropdown: ReactWrapper;
    let categoriesDropdown: ReactWrapper;
    let publishersDropdown: ReactWrapper;
    let publicationDatePicker: ReactWrapper;
    let isbn10Input: ReactWrapper;
    let isbn13Input: ReactWrapper;
    let titleInput: ReactWrapper;
    let wrapper: ReactWrapper;

    beforeEach(() => {
      saveBookMock = jest.fn();
      props = {
        ...minProps,
        authors: authorsMock,
        categories: categoriesMock,
        currentBook,
        initialFormData: {
          authors: [
            1,
            2,
          ],
          categories: [
            3,
            7,
          ],
          isbn10: '0984782850',
          isbn13: '9780984782857',
          publicationDate: '2001-02-03',
          publishers: [
            5,
          ],
          title: 'Foo',
        },
        publishers: publishersMock,
        saveBook: saveBookMock,
      };
      wrapper = mount(
        <Provider store={createStore(combineReducers({ form: formReducer }))}>
          <EditBookPage {...props}/>
        </Provider>
      );
      form = wrapper.find(EditBookForm);
      authorsDropdown = form
        .find(Dropdown)
        .find({ id: FormDataNames.authors })
        .hostNodes();
      categoriesDropdown = form
        .find(Dropdown)
        .find({ id: FormDataNames.categories })
        .hostNodes();
      publishersDropdown = form
        .find(Dropdown)
        .find({ id: FormDataNames.publishers })
        .hostNodes();
      publicationDatePicker = form
        .find(DatePicker)
        .find('input')
        .find({ id: FormDataNames.publicationDate })
        .hostNodes();
      isbn10Input = form
        .find(Input)
        .find({ id: FormDataNames.isbn10 })
        .hostNodes();
      isbn13Input = form
        .find(Input)
        .find({ id: FormDataNames.isbn13 })
        .hostNodes();
      titleInput = form
        .find(Input)
        .find({ id: FormDataNames.title })
        .hostNodes();
    });

    it('should not provide the authors to the saveBook function if it did not change', () => {
      form.simulate('submit');
  
      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).not.toHaveProperty('authors');
    });

    it('should provide the authors to the saveBook function if it changed', () => {
      const firstOptionDeleteButton = authorsDropdown
        .find('.dropdown__multi-value__remove')
        .first();
      firstOptionDeleteButton.simulate('click');
      form.simulate('submit');

      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).toEqual(expect.objectContaining({
        authors: [2],
      }));
    });

    it('should not provide the categories to the saveBook function if it did not change', () => {
      form.simulate('submit');
  
      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).not.toHaveProperty('categories');
    });

    it('should provide the categories to the saveBook function if it changed', () => {
      const firstOptionDeleteButton = categoriesDropdown
        .find('.dropdown__multi-value__remove')
        .first();
      firstOptionDeleteButton.simulate('click');
      form.simulate('submit');

      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).toEqual(expect.objectContaining({
        categories: [7],
      }));
    });

    it('should not provide the publishers to the saveBook function if it did not change', () => {
      form.simulate('submit');
  
      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).not.toHaveProperty('publishers');
    });

    it('should provide the publishers to the saveBook function if it changed', () => {
      const firstOptionDeleteButton = publishersDropdown
        .find('.dropdown__multi-value__remove')
        .first();
      firstOptionDeleteButton.simulate('click');
      form.simulate('submit');

      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).toEqual(expect.objectContaining({
        publishers: [],
      }));
    });

    it('should not provide the publicationDate to the saveBook function if it did not change', () => {
      form.simulate('submit');
  
      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).not.toHaveProperty('publicationDate');
    });

    it('should provide the publicationDate to the saveBook function if it changed', () => {
      publicationDatePicker.simulate('change', { target: { value: '2003-02-01' } });
      form.simulate('submit');

      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).toEqual(expect.objectContaining({
        publicationDate: '2003-02-01',
      }));
    });

    it('should not provide the isbn10 to the saveBook function if it did not change', () => {
      form.simulate('submit');
  
      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).not.toHaveProperty('isbn10');
    });

    it('should provide the isbn10 to the saveBook function if it changed', () => {
      isbn10Input.simulate('change', { target: { value: '0991344618' } });
      form.simulate('submit');

      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).toEqual(expect.objectContaining({
        isbn10: '0991344618',
      }));
    });

    it('should not provide the isbn13 to the saveBook function if it did not change', () => {
      form.simulate('submit');
  
      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).not.toHaveProperty('isbn13');
    });

    it('should provide the isbn13 to the saveBook function if it changed', () => {
      isbn13Input.simulate('change', { target: { value: '9780991344611' } });
      form.simulate('submit');

      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).toEqual(expect.objectContaining({
        isbn13: '9780991344611',
      }));
    });

    it('should not provide the title to the saveBook function if it did not change', () => {
      form.simulate('submit');
  
      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).not.toHaveProperty('title');
    });

    it('should provide the title to the saveBook function if it changed', () => {
      titleInput.simulate('change', { target: { value: 'Bar' } });
      form.simulate('submit');

      const [ bookArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).toEqual(expect.objectContaining({
        title: 'Bar',
      }));
    });

    it('should call the saveBook function with the book, its id and its update link', () => {
      titleInput.simulate('change', { target: { value: 'Bar' }});
      isbn13Input.simulate('change', { target: { value: '9780991344611' }});
      form.simulate('submit');

      const [ bookArgument, idArgument, linkArgument ] = saveBookMock.mock.calls[0];
      expect(bookArgument).toEqual({
        isbn13: '9780991344611',
        title: 'Bar',
      });
      expect(idArgument).toBe(currentBook.id);
      expect(linkArgument).toBe(currentBook._links.update!);
    });
  });
});
