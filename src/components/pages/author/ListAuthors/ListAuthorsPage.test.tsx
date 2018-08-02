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

import { IAuthorDTO } from '../../../../interfaces/dtos/AuthorDTO';
import {
  ConfirmationModal,
  IconButton,
  RoutedButton,
  Spinner,
} from '../../../common';
import {
  IProps as ISearchFieldProps,
  SearchField,
} from '../../../common/SearchField';
import {
  IProps,
  ListAuthorsPage,
} from './ListAuthorsPage';

describe('ListAuthorsPage', () => {
  const authors: IAuthorDTO[] = [
    {
      _links: {
        delete: {
          href: '/api/v1/authors/1',
          method: 'DELETE',
        },
        self: {
          href: '/api/v1/authors/1',
          method: 'GET',
        },
      },
      firstName: 'John',
      fullName: 'John X Doe',
      id: 1,
      lastName: 'Doe',
      middleName: 'X',
    },
    {
      _links: {
        delete: {
          href: '/api/v1/authors/2',
          method: 'DELETE',
        },
        self: {
          href: '/api/v1/authors/2',
          method: 'GET',
        },
      },
      firstName: 'Jane',
      fullName: 'Jane Doe',
      id: 2,
      lastName: 'Doe',
    },
  ];
  const minProps: IProps = {
    authors: [],
    deleteAuthor: jest.fn(),
    isLoading: false,
    loggedIn: false,
    searchAuthors: jest.fn(),
  };
  
  describe('componentDidMount', () => {
    it('should call the searchAuthors function', () => {
      const searchAuthorsMock = jest.fn();
      const props: IProps = {
        ...minProps,
        searchAuthors: searchAuthorsMock,
      };
      shallow(<ListAuthorsPage {...props}/>);

      expect(searchAuthorsMock).toHaveBeenCalled();
    });
  });

  describe('Search field', () => {
    let searchField: ShallowWrapper<ISearchFieldProps>;
    let searchAuthorsMock: jest.Mock;
    
    beforeEach(() => {
      searchAuthorsMock = jest.fn();
      const props: IProps = {
        ...minProps,
        searchAuthors: searchAuthorsMock,
      };
      const wrapper = shallow(<ListAuthorsPage {...props}/>);
      searchField = wrapper.find(SearchField);
    });

    it('should be rendered', () => {
      expect(searchField.exists()).toBeTruthy();
    });

    it('should contains the "Search authors..." placeholder text', () => {
      expect(searchField.prop('placeholder')).toBe('Search authors...');
    });

    it('should call the searchAuthors function on change', () => {
      searchAuthorsMock.mockClear();
      searchField.prop('onValueChange')('foo');

      expect(searchAuthorsMock).toHaveBeenCalledWith('foo');
    });
  });

  describe('Create button', () => {
    let createButton: ShallowWrapper | ReactWrapper;
    
    beforeEach(() => {
      const wrapper = shallow(<ListAuthorsPage {...minProps}/>);
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
      const wrapper = shallow(<ListAuthorsPage {...props}/>);
      createButton = wrapper.find(RoutedButton);

      expect(createButton.prop('disabled')).toBeFalsy();
    });

    it('should route to the Create Author page', () => {
      expect(createButton.prop('route')).toBe('/authors/create');
    });

    it('should be labelled as "Create New Author"', () => {
      const wrapper = mount(
        <MemoryRouter>
          <ListAuthorsPage {...minProps}/>
        </MemoryRouter>
      );
      createButton = wrapper.find(RoutedButton);

      expect(createButton.text()).toBe('Create New Author');
    });
  });

  describe('Table', () => {
    it('should not be displayed if the isLoading property is true', () => {
      const props: IProps = {
        ...minProps,
        isLoading: true,
      };
      const wrapper = shallow(<ListAuthorsPage {...props}/>);
      const table = wrapper.find(Table);

      expect(table.exists()).toBeFalsy();
    });

    it('should display the headers properly', () => {
      const wrapper = shallow(<ListAuthorsPage {...minProps}/>);
      const headers = wrapper
        .find(Table)
        .find('th')
        .map((header) => header.text());

      expect(headers).toEqual([
        'ID',
        'Name',
        'First Name',
        'Middle Name',
        'Last Name',
        'Actions',
      ]);
    });

    it('should display as many rows as the number of authors', () => {
      const props: IProps = {
        ...minProps,
        authors,
      };
      const wrapper = mount(
        <MemoryRouter>
          <ListAuthorsPage {...props}/>
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
      const wrapper = shallow(<ListAuthorsPage {...minProps}/>);
      const spinner = wrapper.find(Spinner);

      expect(spinner.exists()).toBeFalsy();
    });

    it('should displayed if the isLoading property is true', () => {
      const props: IProps = {
        ...minProps,
        isLoading: true,
      };
      const wrapper = shallow(<ListAuthorsPage {...props}/>);
      const spinner = wrapper.find(Spinner);

      expect(spinner.exists()).toBeTruthy();
    });
  });

  describe('Confirmation modal', () => {
    it('should be shown if the delete button of a given author is clicked', () => {
      const props: IProps = {
        ...minProps,
        authors,
      };
      const wrapper = mount(
        <MemoryRouter>
          <ListAuthorsPage {...props}/>
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
      let deleteAuthorMock: jest.Mock;
      let modal: ReactWrapper;
      let wrapper: ReactWrapper;
      
      beforeEach(() => {
        deleteAuthorMock = jest.fn();
        const props: IProps = {
          ...minProps,
          authors,
          deleteAuthor: deleteAuthorMock,
        };
        wrapper = mount(
          <MemoryRouter>
            <ListAuthorsPage {...props}/>
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

        expect(body.text()).toBe('Are you sure you want to delete John X Doe (ID: 1) ?');
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

      it('should call the deleteAuthor function with the given author if its Delete button is clicked', () => {
        const deleteButton = modal
          .find(Button)
          .find({ color: 'danger' });
        jest.useFakeTimers();
        deleteButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
        expect(deleteAuthorMock).toHaveBeenCalledWith(authors[0], authors[0]._links.delete!);
      });
    });
  });
});
