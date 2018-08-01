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

import { IAuthorDTO } from '../../../../interfaces/dtos/AuthorDTO';
import {
  ActionBar, 
  ConfirmationModal,
  RoutedButton,
} from '../../../common';
import {
  IProps,
  ViewAuthorPage,
} from './ViewAuthorPage';

describe('ViewAuthorPage', () => {
  const authorMock: IAuthorDTO = {
    _links: {
      self: {
        href: '/api/v1/authors/1',
        method: 'GET',
      },
    },
    firstName: 'John',
    fullName: 'John Doe',
    id: 1,
    lastName: 'Doe',
    middleName: 'X',
  }
  const minProps: IProps = {
    author: authorMock,
    deleteAuthor: jest.fn(),
    history: {},
    loadAuthor: jest.fn(),
    match: {
      params: {
        id: '1',
      },
    },
  } as any as IProps;

  describe('componentDidMount', () => {
    it('should call the loadAuthor function with the route param', () => {
      const loadAuthorMock = jest.fn();
      const props: IProps = {
        ...minProps,
        loadAuthor: loadAuthorMock,
      };
      shallow(<ViewAuthorPage {...props}/>);

      expect(loadAuthorMock).toHaveBeenCalledWith('1');
    });
  });

  describe('ID', () => {
    let idGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewAuthorPage {...minProps}/>);
      idGroup = wrapper.find(FormGroup).at(0);
    });

    it('should render its label as "ID"', () => {
      const idLabel = idGroup.find(Label);

      expect(idLabel.text()).toBe('ID');
    });

    it('should render its value based on the id of the author', () => {
      const idValue = idGroup.find(Input);

      expect(idValue.text()).toBe('1');
    });
  });

  describe('First Name', () => {
    let firstNameGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewAuthorPage {...minProps}/>);
      firstNameGroup = wrapper.find(FormGroup).at(1);
    });

    it('should render its label as "First Name"', () => {
      const firstNameLabel = firstNameGroup.find(Label);

      expect(firstNameLabel.text()).toBe('First Name');
    });

    it('should render its value based on the first name of the author', () => {
      const firstNameValue = firstNameGroup.find(Input);

      expect(firstNameValue.text()).toBe('John');
    });
  });

  describe('Middle Name', () => {
    let middleNameGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewAuthorPage {...minProps}/>);
      middleNameGroup = wrapper.find(FormGroup).at(2);
    });

    it('should render its label as "Middle Name"', () => {
      const middleNameLabel = middleNameGroup.find(Label);

      expect(middleNameLabel.text()).toBe('Middle Name');
    });

    it('should render its value based on the middle name of the author', () => {
      const middleNameValue = middleNameGroup.find(Input);

      expect(middleNameValue.text()).toBe('X');
    });
  });

  describe('Last Name', () => {
    let lastNameGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewAuthorPage {...minProps}/>);
      lastNameGroup = wrapper.find(FormGroup).at(3);
    });
    
    it('should render its label as "Last Name"', () => {
      const lastNameLabel = lastNameGroup.find(Label);

      expect(lastNameLabel.text()).toBe('Last Name');
    });

    it('should render its value based on the last name of the author', () => {
      const lastNameValue = lastNameGroup.find(Input);

      expect(lastNameValue.text()).toBe('Doe');
    });
  });

  describe('Edit button', () => {
    it('should be rendered if the update link exists', () => {
      const props: IProps = {
        ...minProps,
        author: {
          ...minProps.author,
          _links: {
            ...minProps.author._links,
            update: {
              href: '/api/v1/authors/1',
              method: 'PATCH',
            },
          },
        },
      };
      const wrapper = shallow(<ViewAuthorPage {...props}/>);
      const editButton = wrapper
        .find(ActionBar)
        .find(RoutedButton)
        .find({ color: 'outline-secondary' });

      expect(editButton.exists()).toBeTruthy();
    });

    it('should not be rendered if the update link does not exist', () => {
      const wrapper = shallow(<ViewAuthorPage {...minProps}/>);
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
        author: {
          ...minProps.author,
          _links: {
            ...minProps.author._links,
            delete: {
              href: '/api/v1/authors/1',
              method: 'DELETE',
            },
          },
        },
      };
      const wrapper = shallow(<ViewAuthorPage {...props}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });

      expect(deleteButton.exists()).toBeTruthy();
    });

    it('should not be rendered if the delete link does not exist', () => {
      const wrapper = shallow(<ViewAuthorPage {...minProps}/>);
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
        author: {
          ...minProps.author,
          _links: {
            ...minProps.author._links,
            delete: {
              href: '/api/v1/authors/1',
              method: 'DELETE',
            },
          },
        },
      };
      const wrapper = mount(<ViewAuthorPage {...props}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });
      deleteButton.simulate('click');
      const modal = wrapper.find(ConfirmationModal);
      
      expect(modal.exists()).toBeTruthy();
    });

    describe('given it is being displayed', () => {
      const deletableAuthorMock: IAuthorDTO = {
        ...authorMock,
        _links: {
          ...authorMock._links,
          delete: {
            href: '/api/v1/authors/1',
            method: 'DELETE',
          },
        },
      };
      let deleteAuthorMock: jest.Mock;
      let modal: ReactWrapper;
      let wrapper: ReactWrapper;
      
      beforeEach(() => {
        deleteAuthorMock = jest.fn();
        const props: IProps = {
          ...minProps,
          author: deletableAuthorMock,
          deleteAuthor: deleteAuthorMock,
        };
        wrapper = mount( <ViewAuthorPage {...props}/>);
        const deleteButton = wrapper
          .find(ActionBar)
          .find(Button)
          .find({ color: 'outline-danger' });
        deleteButton.simulate('click');
        modal = wrapper.find(ConfirmationModal);
      });

      it('should display its body properly', () => {
        const body = modal.find(ModalBody);

        expect(body.text()).toBe('Are you sure you want to delete John Doe (ID: 1) ?');
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

      it('should call the deleteAuthor function with the given author, its delete link and route if its Delete button is clicked', () => {
        const deleteButton = modal
          .find(Button)
          .find({ color: 'danger' });
        jest.useFakeTimers();
        deleteButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
        expect(deleteAuthorMock).toHaveBeenCalledWith(deletableAuthorMock, deletableAuthorMock._links.delete!, '/authors');
      });
    });
  });
});
