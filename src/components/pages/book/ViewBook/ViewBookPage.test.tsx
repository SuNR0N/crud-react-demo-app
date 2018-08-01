import {
  mount,
  ReactWrapper,
  shallow,
} from 'enzyme';
import React from 'react';
import {
  Button,
  FormGroup,
  Input,
  Label,
  ModalBody,
} from 'reactstrap';

import { IBookDTO } from '../../../../interfaces/dtos/BookDTO';
import {
  ActionBar, 
  ConfirmationModal,
  RoutedButton,
} from '../../../common';
import {
  IProps,
  ViewBookPage,
} from './ViewBookPage';

describe('ViewBookPage', () => {
  const bookMock: IBookDTO = {
    _links: {
      self: {
        href: '/api/v1/books/1',
        method: 'GET',
      },
    },
    authors: [
      'John Doe',
      'Jane Doe',
    ],
    categories: [
      'Foo',
      'Bar',
    ],
    id: 1,
    isbn10: '1234567890',
    isbn13: '1234567890123',
    publicationDate: '2001-02-03',
    publishers: [
      'FooBar',
    ],
    title: 'Foo',
  }
  const minProps: IProps = {
    book: bookMock,
    deleteBook: jest.fn(),
    history: {},
    loadBook: jest.fn(),
    match: {
      params: {
        id: '1',
      },
    },
  } as any as IProps;

  describe('componentDidMount', () => {
    it('should call the loadBook function with the route param', () => {
      const loadBookMock = jest.fn();
      const props: IProps = {
        ...minProps,
        loadBook: loadBookMock,
      };
      shallow(<ViewBookPage {...props}/>);

      expect(loadBookMock).toHaveBeenCalledWith('1');
    });
  });

  describe('ID', () => {
    let idGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewBookPage {...minProps}/>);
      idGroup = wrapper.find(FormGroup).at(0);
    });

    it('should render its label as "ID"', () => {
      const idLabel = idGroup.find(Label);

      expect(idLabel.text()).toBe('ID');
    });

    it('should render its value based on the id of the book', () => {
      const idValue = idGroup.find(Input);

      expect(idValue.text()).toBe('1');
    });
  });

  describe('Title', () => {
    let titleGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewBookPage {...minProps}/>);
      titleGroup = wrapper.find(FormGroup).at(1);
    });

    it('should render its label as "Title"', () => {
      const titleLabel = titleGroup.find(Label);

      expect(titleLabel.text()).toBe('Title');
    });

    it('should render its value based on the title of the book', () => {
      const titleValue = titleGroup.find(Input);

      expect(titleValue.text()).toBe('Foo');
    });
  });

  describe('Categories', () => {
    let categoriesGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewBookPage {...minProps}/>);
      categoriesGroup = wrapper.find(FormGroup).at(2);
    });

    it('should render its label as "Categories"', () => {
      const categoriesLabel = categoriesGroup.find(Label);

      expect(categoriesLabel.text()).toBe('Categories');
    });

    it('should render its value based on the categories of the book', () => {
      const categoriesValues = categoriesGroup
        .find(Input)
        .map((input) => input.text());

      expect(categoriesValues).toEqual([
        'Foo',
        'Bar',
      ]);
    });
  });

  describe('Authors', () => {
    let authorsGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewBookPage {...minProps}/>);
      authorsGroup = wrapper.find(FormGroup).at(3);
    });

    it('should render its label as "Authors"', () => {
      const authorsLabel = authorsGroup.find(Label);

      expect(authorsLabel.text()).toBe('Authors');
    });

    it('should render its value based on the authors of the book', () => {
      const authorsValues = authorsGroup
        .find(Input)
        .map((input) => input.text());

      expect(authorsValues).toEqual([
        'John Doe',
        'Jane Doe',
      ]);
    });
  });

  describe('ISBN-10', () => {
    let isbn10Group: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewBookPage {...minProps}/>);
      isbn10Group = wrapper.find(FormGroup).at(4);
    });

    it('should render its label as "ISBN-10"', () => {
      const isbn10Label = isbn10Group.find(Label);

      expect(isbn10Label.text()).toBe('ISBN-10');
    });

    it('should render its value based on the ISBN-10 of the book', () => {
      const isbn10Value = isbn10Group.find(Input);

      expect(isbn10Value.text()).toBe('1234567890');
    });
  });

  describe('ISBN-13', () => {
    let isbn13Group: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewBookPage {...minProps}/>);
      isbn13Group = wrapper.find(FormGroup).at(5);
    });

    it('should render its label as "ISBN-13"', () => {
      const isbn13Label = isbn13Group.find(Label);

      expect(isbn13Label.text()).toBe('ISBN-13');
    });

    it('should render its value based on the ISBN-13 of the book', () => {
      const isbn13Value = isbn13Group.find(Input);

      expect(isbn13Value.text()).toBe('1234567890123');
    });
  });

  describe('Publication Date', () => {
    let publicationDateGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewBookPage {...minProps}/>);
      publicationDateGroup = wrapper.find(FormGroup).at(6);
    });

    it('should render its label as "Publication Date"', () => {
      const publicationDateLabel = publicationDateGroup.find(Label);

      expect(publicationDateLabel.text()).toBe('Publication Date');
    });

    it('should render its value based on the publication date of the book', () => {
      const publicationDateValue = publicationDateGroup.find(Input);

      expect(publicationDateValue.text()).toBe('2001-02-03');
    });
  });

  describe('Publishers', () => {
    let publishersGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewBookPage {...minProps}/>);
      publishersGroup = wrapper.find(FormGroup).at(7);
    });

    it('should render its label as "Publishers"', () => {
      const publishersLabel = publishersGroup.find(Label);

      expect(publishersLabel.text()).toBe('Publishers');
    });

    it('should render its value based on the publishers of the book', () => {
      const publishersValues = publishersGroup
        .find(Input)
        .map((input) => input.text());

      expect(publishersValues).toEqual([
        'FooBar',
      ]);
    });
  });

  describe('Edit button', () => {
    it('should be rendered if the update link exists', () => {
      const props: IProps = {
        ...minProps,
        book: {
          ...minProps.book,
          _links: {
            ...minProps.book._links,
            update: {
              href: '/api/v1/books/1',
              method: 'PATCH',
            },
          },
        },
      };
      const wrapper = shallow(<ViewBookPage {...props}/>);
      const editButton = wrapper
        .find(ActionBar)
        .find(RoutedButton)
        .find({ color: 'outline-secondary' });

      expect(editButton.exists()).toBeTruthy();
    });

    it('should not be rendered if the update link does not exist', () => {
      const wrapper = shallow(<ViewBookPage {...minProps}/>);
      const editButton = wrapper
        .find(ActionBar)
        .find(RoutedButton)
        .find({ color: 'outline-secondary' });

      expect(editButton.exists()).toBeFalsy();
    });
  });

  describe('Delete button', () => {
    it('should be rendered if the delete link exists', () => {
      const props: IProps = {
        ...minProps,
        book: {
          ...minProps.book,
          _links: {
            ...minProps.book._links,
            delete: {
              href: '/api/v1/books/1',
              method: 'DELETE',
            },
          },
        },
      };
      const wrapper = shallow(<ViewBookPage {...props}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });

      expect(deleteButton.exists()).toBeTruthy();
    });

    it('should not be rendered if the delete link does not exist', () => {
      const wrapper = shallow(<ViewBookPage {...minProps}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });

      expect(deleteButton.exists()).toBeFalsy();
    });
  });

  describe('Confirmation modal', () => {
    it('should be shown if the Delete button is clicked', () => {
      const props: IProps = {
        ...minProps,
        book: {
          ...minProps.book,
          _links: {
            ...minProps.book._links,
            delete: {
              href: '/api/v1/books/1',
              method: 'DELETE',
            },
          },
        },
      };
      const wrapper = mount(<ViewBookPage {...props}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });
      deleteButton.simulate('click');
      const modal = wrapper.find(ConfirmationModal);
      
      expect(modal.exists()).toBeTruthy();
    });

    describe('given it is being displayed', () => {
      const deletableBookMock: IBookDTO = {
        ...bookMock,
        _links: {
          ...bookMock._links,
          delete: {
            href: '/api/v1/books/1',
            method: 'DELETE',
          },
        },
      };
      let deleteBookMock: jest.Mock;
      let modal: ReactWrapper;
      let wrapper: ReactWrapper;
      
      beforeEach(() => {
        deleteBookMock = jest.fn();
        const props: IProps = {
          ...minProps,
          book: deletableBookMock,
          deleteBook: deleteBookMock,
        };
        wrapper = mount( <ViewBookPage {...props}/>);
        const deleteButton = wrapper
          .find(ActionBar)
          .find(Button)
          .find({ color: 'outline-danger' });
        deleteButton.simulate('click');
        modal = wrapper.find(ConfirmationModal);
      });

      it('should display its body properly', () => {
        const body = modal.find(ModalBody);

        expect(body.text()).toBe('Are you sure you want to delete Foo (ID: 1) ?');
      });
      
      it('should be hidden if its Cancel button is clicked', () => {
        const cancelButton = modal
          .find(Button)
          .find({ color: 'secondary' });
        jest.useFakeTimers();
        cancelButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
      });

      it('should call the deleteBook function with the given book, its delete link and route if its Delete button is clicked', () => {
        const deleteButton = modal
          .find(Button)
          .find({ color: 'danger' });
        jest.useFakeTimers();
        deleteButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
        expect(deleteBookMock).toHaveBeenCalledWith(deletableBookMock, deletableBookMock._links.delete!, '/books');
      });
    });
  });
});
