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

import { IPublisherDTO } from '../../../../interfaces/dtos/PublisherDTO';
import {
  ActionBar, 
  ConfirmationModal,
  RoutedButton,
} from '../../../common';
import {
  IProps,
  ViewPublisherPage,
} from './ViewPublisherPage';

describe('ViewPublisherPage', () => {
  const publisherMock: IPublisherDTO = {
    _links: {
      self: {
        href: '/api/v1/publishers/1',
        method: 'GET',
      },
    },
    id: 1,
    name: 'Foo',
  };
  const minProps: IProps = {
    deletePublisher: jest.fn(),
    history: {},
    loadPublisher: jest.fn(),
    match: {
      params: {
        id: '1',
      },
    },
    publisher: publisherMock,
  } as any as IProps;

  describe('componentDidMount', () => {
    it('should call the loadPublisher function with the route param', () => {
      const loadPublisherMock = jest.fn();
      const props: IProps = {
        ...minProps,
        loadPublisher: loadPublisherMock,
      };
      shallow(<ViewPublisherPage {...props}/>);

      expect(loadPublisherMock).toHaveBeenCalledWith('1');
    });
  });

  describe('ID', () => {
    let idGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewPublisherPage {...minProps}/>);
      idGroup = wrapper.find(FormGroup).at(0);
    });

    it('should render its label as "ID"', () => {
      const idLabel = idGroup.find(Label);

      expect(idLabel.text()).toBe('ID');
    });

    it('should render its value based on the id of the publisher', () => {
      const idValue = idGroup.find(Input);

      expect(idValue.text()).toBe('1');
    });
  });

  describe('Name', () => {
    let nameGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewPublisherPage {...minProps}/>);
      nameGroup = wrapper.find(FormGroup).at(1);
    });

    it('should render its label as "Name"', () => {
      const nameLabel = nameGroup.find(Label);

      expect(nameLabel.text()).toBe('Name');
    });

    it('should render its value based on the name of the publisher', () => {
      const nameValue = nameGroup.find(Input);

      expect(nameValue.text()).toBe('Foo');
    });
  });

  describe('Edit button', () => {
    it('should be rendered if the update link exists', () => {
      const props: IProps = {
        ...minProps,
        publisher: {
          ...minProps.publisher,
          _links: {
            ...minProps.publisher._links,
            update: {
              href: '/api/v1/publishers/1',
              method: 'PUT',
            },
          },
        },
      };
      const wrapper = shallow(<ViewPublisherPage {...props}/>);
      const editButton = wrapper
        .find(ActionBar)
        .find(RoutedButton)
        .find({ color: 'outline-secondary' });

      expect(editButton.exists()).toBeTruthy();
    });

    it('should not be rendered if the update link does not exist', () => {
      const wrapper = shallow(<ViewPublisherPage {...minProps}/>);
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
        publisher: {
          ...minProps.publisher,
          _links: {
            ...minProps.publisher._links,
            delete: {
              href: '/api/v1/publishers/1',
              method: 'DELETE',
            },
          },
        },
      };
      const wrapper = shallow(<ViewPublisherPage {...props}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });

      expect(deleteButton.exists()).toBeTruthy();
    });

    it('should not be rendered if the delete link does not exist', () => {
      const wrapper = shallow(<ViewPublisherPage {...minProps}/>);
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
        publisher: {
          ...minProps.publisher,
          _links: {
            ...minProps.publisher._links,
            delete: {
              href: '/api/v1/publishers/1',
              method: 'DELETE',
            },
          },
        },
      };
      const wrapper = mount(<ViewPublisherPage {...props}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });
      deleteButton.simulate('click');
      const modal = wrapper.find(ConfirmationModal);
      
      expect(modal.exists()).toBeTruthy();
    });

    describe('given it is being displayed', () => {
      const deletablePublisherMock: IPublisherDTO = {
        ...publisherMock,
        _links: {
          ...publisherMock._links,
          delete: {
            href: '/api/v1/publishers/1',
            method: 'DELETE',
          },
        },
      };
      let deletePublisherMock: jest.Mock;
      let modal: ReactWrapper;
      let wrapper: ReactWrapper;
      
      beforeEach(() => {
        deletePublisherMock = jest.fn();
        const props: IProps = {
          ...minProps,
          deletePublisher: deletePublisherMock,
          publisher: deletablePublisherMock,
        };
        wrapper = mount( <ViewPublisherPage {...props}/>);
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

      it('should call the deletePublisher function with the given publisher, its delete link and route if its Delete button is clicked', () => {
        const deleteButton = modal
          .find(Button)
          .find({ color: 'danger' });
        jest.useFakeTimers();
        deleteButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
        expect(deletePublisherMock).toHaveBeenCalledWith(deletablePublisherMock, deletablePublisherMock._links.delete!, '/publishers');
      });
    });
  });
});
