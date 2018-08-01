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

import { ICategoryDTO } from '../../../../interfaces/dtos/CategoryDTO';
import {
  ActionBar, 
  ConfirmationModal,
  RoutedButton,
} from '../../../common';
import {
  IProps,
  ViewCategoryPage,
} from './ViewCategoryPage';

describe('ViewCategoryPage', () => {
  const categoryMock: ICategoryDTO = {
    _links: {
      self: {
        href: '/api/v1/categories/1',
        method: 'GET',
      },
    },
    id: 1,
    name: 'Foo',
  };
  const minProps: IProps = {
    category: categoryMock,
    deleteCategory: jest.fn(),
    history: {},
    loadCategory: jest.fn(),
    match: {
      params: {
        id: '1',
      },
    },
  } as any as IProps;

  describe('componentDidMount', () => {
    it('should call the loadCategory function with the route param', () => {
      const loadCategoryMock = jest.fn();
      const props: IProps = {
        ...minProps,
        loadCategory: loadCategoryMock,
      };
      shallow(<ViewCategoryPage {...props}/>);

      expect(loadCategoryMock).toHaveBeenCalledWith('1');
    });
  });

  describe('ID', () => {
    let idGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewCategoryPage {...minProps}/>);
      idGroup = wrapper.find(FormGroup).at(0);
    });

    it('should render its label as "ID"', () => {
      const idLabel = idGroup.find(Label);

      expect(idLabel.text()).toBe('ID');
    });

    it('should render its value based on the id of the category', () => {
      const idValue = idGroup.find(Input);

      expect(idValue.text()).toBe('1');
    });
  });

  describe('Name', () => {
    let nameGroup: ReactWrapper;

    beforeEach(() => {
      const wrapper = mount(<ViewCategoryPage {...minProps}/>);
      nameGroup = wrapper.find(FormGroup).at(1);
    });

    it('should render its label as "Name"', () => {
      const nameLabel = nameGroup.find(Label);

      expect(nameLabel.text()).toBe('Name');
    });

    it('should render its value based on the name of the category', () => {
      const nameValue = nameGroup.find(Input);

      expect(nameValue.text()).toBe('Foo');
    });
  });

  describe('Edit button', () => {
    it('should be rendered if the update link exists', () => {
      const props: IProps = {
        ...minProps,
        category: {
          ...minProps.category,
          _links: {
            ...minProps.category._links,
            update: {
              href: '/api/v1/categories/1',
              method: 'PUT',
            },
          },
        },
      };
      const wrapper = shallow(<ViewCategoryPage {...props}/>);
      const editButton = wrapper
        .find(ActionBar)
        .find(RoutedButton)
        .find({ color: 'outline-secondary' });

      expect(editButton.exists()).toBeTruthy();
    });

    it('should not be rendered if the update link does not exist', () => {
      const wrapper = shallow(<ViewCategoryPage {...minProps}/>);
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
        category: {
          ...minProps.category,
          _links: {
            ...minProps.category._links,
            delete: {
              href: '/api/v1/categories/1',
              method: 'DELETE',
            },
          },
        },
      };
      const wrapper = shallow(<ViewCategoryPage {...props}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });

      expect(deleteButton.exists()).toBeTruthy();
    });

    it('should not be rendered if the delete link does not exist', () => {
      const wrapper = shallow(<ViewCategoryPage {...minProps}/>);
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
        category: {
          ...minProps.category,
          _links: {
            ...minProps.category._links,
            delete: {
              href: '/api/v1/categories/1',
              method: 'DELETE',
            },
          },
        },
      };
      const wrapper = mount(<ViewCategoryPage {...props}/>);
      const deleteButton = wrapper
        .find(ActionBar)
        .find(Button)
        .find({ color: 'outline-danger' });
      deleteButton.simulate('click');
      const modal = wrapper.find(ConfirmationModal);
      
      expect(modal.exists()).toBeTruthy();
    });

    describe('given it is being displayed', () => {
      const deletableCategoryMock: ICategoryDTO = {
        ...categoryMock,
        _links: {
          ...categoryMock._links,
          delete: {
            href: '/api/v1/categories/1',
            method: 'DELETE',
          },
        },
      };
      let deleteCategoryMock: jest.Mock;
      let modal: ReactWrapper;
      let wrapper: ReactWrapper;
      
      beforeEach(() => {
        deleteCategoryMock = jest.fn();
        const props: IProps = {
          ...minProps,
          category: deletableCategoryMock,
          deleteCategory: deleteCategoryMock,
        };
        wrapper = mount( <ViewCategoryPage {...props}/>);
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

      it('should call the deleteCategory function with the given category, its delete link and route if its Delete button is clicked', () => {
        const deleteButton = modal
          .find(Button)
          .find({ color: 'danger' });
        jest.useFakeTimers();
        deleteButton.simulate('click');
        jest.advanceTimersByTime(1000);

        expect(modal.html()).toBeNull();
        expect(deleteCategoryMock).toHaveBeenCalledWith(deletableCategoryMock, deletableCategoryMock._links.delete!, '/categories');
      });
    });
  });
});
