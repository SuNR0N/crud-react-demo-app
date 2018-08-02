import {
  mount,
  ReactWrapper,
  shallow,
  ShallowWrapper,
} from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import {
  Button,
  ModalBody,
  Table,
} from 'reactstrap';

import {
  IBookDTO,
  IPageableCollectionDTO,
} from '../../../../interfaces/dtos';
import {
  ConfirmationModal,
  IconButton,
  Pagination,
  RoutedButton,
  Spinner,
} from '../../../common';
import {
  IProps as ISearchFieldProps,
  SearchField,
} from '../../../common/SearchField';
import {
  IProps,
  ListBooksPage,
} from './ListBooksPage';

describe('ListBooksPage', () => {
  const collectionMock: IPageableCollectionDTO<IBookDTO> = {
    _links: {
      last: {
        href: '/last',
        method: 'GET',
      },
      next: {
        href: '/next',
        method: 'GET',
      },
    },
    content: [
      {
        _links: {
          delete: {
            href: '/api/v1/books/1',
            method: 'DELETE',
          },
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
      },
      {
        _links: {
          delete: {
            href: '/api/v1/books/2',
            method: 'DELETE',
          },
          self: {
            href: '/api/v1/books/2',
            method: 'GET',
          },
        },
        authors: [
          'John Roe',
        ],
        categories: [
          'FooBar',
        ],
        id: 2,
        isbn10: '0987654321',
        isbn13: '3210987654321',
        publicationDate: '2003-02-01',
        publishers: [
          'Foo',
          'Bar',
        ],
        title: 'Bar',
      },
    ],
    currentPage: 1,
    totalItems: 2,
    totalPages: 1,
  };
  const minProps: IProps = {
    booksCollection: collectionMock,
    deleteBook: jest.fn(),
    isLoading: false,
    loggedIn: false,
    paginateBooks: jest.fn(),
    searchBooks: jest.fn(),
  };
  
  describe('componentDidMount', () => {
    it('should call the searchBooks function', () => {
      const searchBooksMock = jest.fn();
      const props: IProps = {
        ...minProps,
        searchBooks: searchBooksMock,
      };
      shallow(<ListBooksPage {...props}/>);

      expect(searchBooksMock).toHaveBeenCalled();
    });
  });

  describe('Search field', () => {
    let searchField: ShallowWrapper<ISearchFieldProps>;
    let searchBooksMock: jest.Mock;
    
    beforeEach(() => {
      searchBooksMock = jest.fn();
      const props: IProps = {
        ...minProps,
        searchBooks: searchBooksMock,
      };
      const wrapper = shallow(<ListBooksPage {...props}/>);
      searchField = wrapper.find(SearchField);
    });

    it('should be rendered', () => {
      expect(searchField.exists()).toBeTruthy();
    });

    it('should contains the "Search books..." placeholder text', () => {
      expect(searchField.prop('placeholder')).toBe('Search books...');
    });

    it('should call the searchBooks function on change', () => {
      searchBooksMock.mockClear();
      searchField.prop('onValueChange')('foo');

      expect(searchBooksMock).toHaveBeenCalledWith('foo');
    });
  });

  describe('Create button', () => {
    let createButton: ShallowWrapper | ReactWrapper;
    
    beforeEach(() => {
      const wrapper = shallow(<ListBooksPage {...minProps}/>);
      createButton = wrapper.find(RoutedButton);
    });
    
    it('should be disabled if the user is not logged in', () => {
      expect(createButton.prop('disabled')).toBeTruthy();
    });

    it('should not be disabled if the user is logged in', () => {
      const props: IProps = {
        ...minProps,
        loggedIn: true,
      };
      const wrapper = shallow(<ListBooksPage {...props}/>);
      createButton = wrapper.find(RoutedButton);

      expect(createButton.prop('disabled')).toBeFalsy();
    });

    it('should route to the Create Book page', () => {
      expect(createButton.prop('route')).toBe('/books/create');
    });

    it('should be labelled as "Create New Book"', () => {
      const wrapper = mount(
        <MemoryRouter>
          <ListBooksPage {...minProps}/>
        </MemoryRouter>
      );
      createButton = wrapper
        .find(RoutedButton)
        .find({ symbol: 'plus-square-regular' })
        .first();

      expect(createButton.text()).toBe('Create New Book');
    });
  });

  describe('Table', () => {
    it('should not be displayed if the isLoading property is true', () => {
      const props: IProps = {
        ...minProps,
        isLoading: true,
      };
      const wrapper = shallow(<ListBooksPage {...props}/>);
      const table = wrapper.find(Table);

      expect(table.exists()).toBeFalsy();
    });

    it('should display the headers properly', () => {
      const wrapper = shallow(<ListBooksPage {...minProps}/>);
      const headers = wrapper
        .find(Table)
        .find('th')
        .map((header) => header.text());

      expect(headers).toEqual([
        'ID',
        'Title',
        'Category',
        'Author',
        'Publisher',
        'Publication Date',
        'Actions',
      ]);
    });

    it('should display as many rows as the number of books', () => {
      const props: IProps = {
        ...minProps,
        booksCollection: collectionMock,
      };
      const wrapper = mount(
        <MemoryRouter>
          <ListBooksPage {...props}/>
        </MemoryRouter>
      );
      const rows = wrapper
        .find(Table)
        .find('tbody')
        .find('tr');

      expect(rows).toHaveLength(2);
    });
  });

  describe('Spinner', () => {
    it('should not be displayed if the isLoading property is false', () => {
      const wrapper = shallow(<ListBooksPage {...minProps}/>);
      const spinner = wrapper.find(Spinner);

      expect(spinner.exists()).toBeFalsy();
    });

    it('should displayed if the isLoading property is true', () => {
      const props: IProps = {
        ...minProps,
        isLoading: true,
      };
      const wrapper = shallow(<ListBooksPage {...props}/>);
      const spinner = wrapper.find(Spinner);

      expect(spinner.exists()).toBeTruthy();
    });
  });

  describe('Confirmation modal', () => {
    it('should be shown if the delete button of a given book is clicked', () => {
      const props: IProps = {
        ...minProps,
        booksCollection: collectionMock,
      };
      const wrapper = mount(
        <MemoryRouter>
          <ListBooksPage {...props}/>
        </MemoryRouter>
      );
      const deleteButton = wrapper
        .find(Table)
        .find('tbody tr')
        .at(0)
        .find(IconButton)
        .find({ symbol: 'trash-alt-regular' })
        .at(0);
      deleteButton.simulate('click');
      const modal = wrapper.find(ConfirmationModal);
      
      expect(modal.exists()).toBeTruthy();
    });

    describe('given it is being displayed', () => {
      let deleteBookMock: jest.Mock;
      let modal: ReactWrapper;
      let wrapper: ReactWrapper;
      
      beforeEach(() => {
        deleteBookMock = jest.fn();
        const props: IProps = {
          ...minProps,
          booksCollection: collectionMock,
          deleteBook: deleteBookMock,
        };
        wrapper = mount(
          <MemoryRouter>
            <ListBooksPage {...props}/>
          </MemoryRouter>
        );
        const deleteButton = wrapper
          .find(Table)
          .find('tbody tr')
          .at(0)
          .find(IconButton)
          .find({ symbol: 'trash-alt-regular' })
          .at(0);
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

      it('should call the deleteBook function with the given book if its Delete button is clicked', () => {
        const deleteButton = modal
          .find(Button)
          .find({ color: 'danger' });
        jest.useFakeTimers();
        deleteButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
        expect(deleteBookMock).toHaveBeenCalledWith(collectionMock.content[0], collectionMock.content[0]._links.delete!);
      });
    });
  });

  describe('Pagination', () => {
    it('should call the onPaginate function with the link when a pagination occurs', () => {
      const paginateBooksMock = jest.fn();
      const props: IProps = {
        ...minProps,
        paginateBooks: paginateBooksMock,
      };
      const wrapper = shallow(<ListBooksPage {...props}/>);
      const pagination = wrapper.find(Pagination);

      pagination.prop('onPaginate')(collectionMock._links!.next);

      expect(paginateBooksMock).toHaveBeenCalledWith(collectionMock._links!.next);
    });
  });
});
