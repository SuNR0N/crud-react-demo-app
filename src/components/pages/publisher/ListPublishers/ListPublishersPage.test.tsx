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

import { IPublisherDTO } from '../../../../interfaces/dtos/PublisherDTO';
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
  ListPublishersPage,
} from './ListPublishersPage';

describe('ListPublishersPage', () => {
  const publishers: IPublisherDTO[] = [
    {
      _links: {
        delete: {
          href: '/api/v1/publishers/1',
          method: 'DELETE',
        },
        self: {
          href: '/api/v1/publishers/1',
          method: 'GET',
        },
      },
      id: 1,
      name: 'Foo',
    },
    {
      _links: {
        delete: {
          href: '/api/v1/publishers/2',
          method: 'DELETE',
        },
        self: {
          href: '/api/v1/publishers/2',
          method: 'GET',
        },
      },
      id: 2,
      name: 'Bar',
    },
  ];
  const minProps: IProps = {
    deletePublisher: jest.fn(),
    loggedIn: false,
    publishers: [],
    searchPublishers: jest.fn(),
  };
  
  describe('componentDidMount', () => {
    it('should call the searchPublishers function', () => {
      const searchPublishersMock = jest.fn();
      const props: IProps = {
        ...minProps,
        searchPublishers: searchPublishersMock,
      };
      shallow(<ListPublishersPage {...props}/>);

      expect(searchPublishersMock).toHaveBeenCalled();
    });
  });

  describe('Search field', () => {
    let searchField: ShallowWrapper<ISearchFieldProps>;
    let searchPublishersMock: jest.Mock;
    
    beforeEach(() => {
      searchPublishersMock = jest.fn();
      const props: IProps = {
        ...minProps,
        searchPublishers: searchPublishersMock,
      };
      const wrapper = shallow(<ListPublishersPage {...props}/>);
      searchField = wrapper.find(SearchField);
    });

    it('should be rendered', () => {
      expect(searchField.exists()).toBeTruthy();
    });

    it('should contains the "Search publishers..." placeholder text', () => {
      expect(searchField.prop('placeholder')).toBe('Search publishers...');
    });

    it('should call the searchPublishers function on change', () => {
      searchPublishersMock.mockClear();
      searchField.prop('onValueChange')('foo');

      expect(searchPublishersMock).toHaveBeenCalledWith('foo')
    });
  });

  describe('Create button', () => {
    let createButton: ShallowWrapper | ReactWrapper;
    
    beforeEach(() => {
      const wrapper = shallow(<ListPublishersPage {...minProps}/>);
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
      const wrapper = shallow(<ListPublishersPage {...props}/>);
      createButton = wrapper.find(RoutedButton);

      expect(createButton.prop('disabled')).toBeFalsy();
    });

    it('should route to the Create Publisher page', () => {
      expect(createButton.prop('route')).toBe('/publishers/create');
    });

    it('should be labelled as "Create New Publisher"', () => {
      const wrapper = mount(
        <MemoryRouter>
          <ListPublishersPage {...minProps}/>
        </MemoryRouter>
      );
      createButton = wrapper.find(RoutedButton);

      expect(createButton.text()).toBe('Create New Publisher');
    });
  });

  describe('Table', () => {
    it('should display the headers properly', () => {
      const wrapper = shallow(<ListPublishersPage {...minProps}/>);
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

    it('should display as many rows as the number of publishers', () => {
      const props: IProps = {
        ...minProps,
        publishers,
      };
      const wrapper = mount(
        <MemoryRouter>
          <ListPublishersPage {...props}/>
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
    it('should be shown if the delete button of a given publisher is clicked', () => {
      const props: IProps = {
        ...minProps,
        publishers,
      };
      const wrapper = mount(
        <MemoryRouter>
          <ListPublishersPage {...props}/>
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
      let deletePublisherMock: jest.Mock;
      let modal: ReactWrapper;
      let wrapper: ReactWrapper;
      
      beforeEach(() => {
        deletePublisherMock = jest.fn();
        const props: IProps = {
          ...minProps,
          deletePublisher: deletePublisherMock,
          publishers,
        };
        wrapper = mount(
          <MemoryRouter>
            <ListPublishersPage {...props}/>
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

      it('should call the deletePublisher function with the given publisher if its Delete button is clicked', () => {
        const deleteButton = modal
          .find(Button)
          .find({ color: 'danger' });
        jest.useFakeTimers();
        deleteButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
        expect(deletePublisherMock).toHaveBeenCalledWith(publishers[0], publishers[0]._links.delete!);
      });
    });
  });
});
