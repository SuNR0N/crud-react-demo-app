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

import { ICategoryDTO } from '../../../../interfaces/dtos/CategoryDTO';
import {
  ConfirmationModal,
  IconButton,
  RoutedButton,
} from '../../../common';
import {
  IProps as ISearchFieldProps,
  SearchField,
} from '../../../common/SearchField';
import {
  IProps,
  ListCategoriesPage,
} from './ListCategoriesPage';

describe('ListCategoriesPage', () => {
  const categories: ICategoryDTO[] = [
    {
      _links: {
        delete: {
          href: '/api/v1/categories/1',
          method: 'DELETE',
        },
        self: {
          href: '/api/v1/categories/1',
          method: 'GET',
        },
      },
      id: 1,
      name: 'Foo',
    },
    {
      _links: {
        delete: {
          href: '/api/v1/categories/2',
          method: 'DELETE',
        },
        self: {
          href: '/api/v1/categories/2',
          method: 'GET',
        },
      },
      id: 2,
      name: 'Bar',
    },
  ];
  const minProps: IProps = {
    categories: [],
    deleteCategory: jest.fn(),
    loggedIn: false,
    searchCategories: jest.fn(),
  };
  
  describe('componentDidMount', () => {
    it('should call the searchCategories function', () => {
      const searchCategoriesMock = jest.fn();
      const props: IProps = {
        ...minProps,
        searchCategories: searchCategoriesMock,
      };
      shallow(<ListCategoriesPage {...props}/>);

      expect(searchCategoriesMock).toHaveBeenCalled();
    });
  });

  describe('Search field', () => {
    let searchField: ShallowWrapper<ISearchFieldProps>;
    let searchCategoriesMock: jest.Mock;
    
    beforeEach(() => {
      searchCategoriesMock = jest.fn();
      const props: IProps = {
        ...minProps,
        searchCategories: searchCategoriesMock,
      };
      const wrapper = shallow(<ListCategoriesPage {...props}/>);
      searchField = wrapper.find(SearchField);
    });

    it('should be rendered', () => {
      expect(searchField.exists()).toBeTruthy();
    });

    it('should contains the "Search categories..." placeholder text', () => {
      expect(searchField.prop('placeholder')).toBe('Search categories...');
    });

    it('should call the searchCategories function on change', () => {
      searchCategoriesMock.mockClear();
      searchField.prop('onValueChange')('foo');

      expect(searchCategoriesMock).toHaveBeenCalledWith('foo')
    });
  });

  describe('Create button', () => {
    let createButton: ShallowWrapper | ReactWrapper;
    
    beforeEach(() => {
      const wrapper = shallow(<ListCategoriesPage {...minProps}/>);
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
      const wrapper = shallow(<ListCategoriesPage {...props}/>);
      createButton = wrapper.find(RoutedButton);

      expect(createButton.prop('disabled')).toBeFalsy();
    });

    it('should route to the Create Category page', () => {
      expect(createButton.prop('route')).toBe('/categories/create');
    });

    it('should be labelled as "Create New Category"', () => {
      const wrapper = mount(
        <MemoryRouter>
          <ListCategoriesPage {...minProps}/>
        </MemoryRouter>
      );
      createButton = wrapper.find(RoutedButton);

      expect(createButton.text()).toBe('Create New Category');
    });
  });

  describe('Table', () => {
    it('should display the headers properly', () => {
      const wrapper = shallow(<ListCategoriesPage {...minProps}/>);
      const headers = wrapper
        .find(Table)
        .find('th')
        .map((header) => header.text());

      expect(headers).toEqual([
        'ID',
        'Name',
        'Actions',
      ]);
    });

    it('should display as many rows as the number of categories', () => {
      const props: IProps = {
        ...minProps,
        categories,
      };
      const wrapper = mount(
        <MemoryRouter>
          <ListCategoriesPage {...props}/>
        </MemoryRouter>
      );
      const rows = wrapper
        .find(Table)
        .find('tbody')
        .find('tr');

      expect(rows).toHaveLength(2);
    });
  });

  describe('Confirmation modal', () => {
    it('should be shown if the delete button of a given category is clicked', () => {
      const props: IProps = {
        ...minProps,
        categories,
      };
      const wrapper = mount(
        <MemoryRouter>
          <ListCategoriesPage {...props}/>
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
      let deleteCategoryMock: jest.Mock;
      let modal: ReactWrapper;
      let wrapper: ReactWrapper;
      
      beforeEach(() => {
        deleteCategoryMock = jest.fn();
        const props: IProps = {
          ...minProps,
          categories,
          deleteCategory: deleteCategoryMock,
        };
        wrapper = mount(
          <MemoryRouter>
            <ListCategoriesPage {...props}/>
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

      it('should call the deleteCategory function with the given category if its Delete button is clicked', () => {
        const deleteButton = modal
          .find(Button)
          .find({ color: 'danger' });
        jest.useFakeTimers();
        deleteButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
        expect(deleteCategoryMock).toHaveBeenCalledWith(categories[0], categories[0]._links.delete!);
      });
    });
  });
});
