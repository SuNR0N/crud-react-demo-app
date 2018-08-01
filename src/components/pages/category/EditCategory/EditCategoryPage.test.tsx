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
  ICategoryDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import {
  EditCategoryForm,
  FormDataNames,
  IFormData,
} from '../../../category/EditCategoryForm';
import { ActionBar } from '../../../common/ActionBar';
import {
  EditCategoryPage,
  IProps,
} from './EditCategoryPage';

describe('EditCategoryPage', () => {
  const minProps = {
    currentCategory: {} as ICategoryDTO,
    initialFormData: {},
    isFormValid: false,
    loadCategory: jest.fn(),
    match: {
      params: {},
    },
    saveCategory: jest.fn(),
    submitForm: jest.fn(),
  } as any as IProps;

  describe('componentDidMount', () => {
    let loadCategoryMock: jest.Mock;

    beforeEach(() => {
      loadCategoryMock = jest.fn();
    });

    it('should call the loadCategory function if the current route param does not match the id of the current category', () => {
      const props: IProps = {
        ...minProps,
        currentCategory: {
          ...minProps.currentCategory,
          id: 3,
        },
        loadCategory: loadCategoryMock,
        match: {
          ...minProps.match,
          params: {
            id: '1'
          },
        },
      };
      shallow(<EditCategoryPage {...props}/>);

      expect(loadCategoryMock).toBeCalledWith(1);
    });

    it('should not call the loadCategory function if the current route param matches the id of the current category', () => {
      const props: IProps = {
        ...minProps,
        currentCategory: {
          ...minProps.currentCategory,
          id: 1,
        },
        loadCategory: loadCategoryMock,
        match: {
          ...minProps.match,
          params: {
            id: '1'
          },
        },
      };
      shallow(<EditCategoryPage {...props}/>);

      expect(loadCategoryMock).not.toHaveBeenCalled();
    });
  });

  it('should render its title as "Edit Category"', () => { 
    const wrapper = shallow(<EditCategoryPage {...minProps}/>);
    const header = wrapper.find('h2');

    expect(header.text()).toBe('Edit Category');
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
    const wrapper = shallow(<EditCategoryPage {...props}/>);
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
    const wrapper = shallow(<EditCategoryPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);
    saveButton.simulate('click');

    expect(submitFormMock).toHaveBeenCalled();
  });

  it('should disable the Save button if the form is invalid', () => {
    const wrapper = shallow(<EditCategoryPage {...minProps}/>);
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
    const wrapper = shallow(<EditCategoryPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);

    expect(saveButton.prop('disabled')).toBe(false);
  });

  it('should set the initialValues on the form', () => {
    const initialFormData: Partial<IFormData> = {
      name: 'Foo',
    };
    const props: IProps = {
      ...minProps,
      initialFormData,
    };
    const wrapper = shallow(<EditCategoryPage {...props}/>);
    const form = wrapper.find(EditCategoryForm);

    expect(form.prop('initialValues')).toBe(initialFormData);
  });

  describe('when submitting the form', () => {
    const currentCategory: ICategoryDTO = {
      ...minProps.currentCategory,
      _links: {
        self: {} as IHATEOASLink,
        update: {} as IHATEOASLink,
      },
      id: 1,
    };
    let saveCategoryMock: jest.Mock;
    let props: IProps;
    let form: ReactWrapper<any>;
    let nameInput: ReactWrapper;

    beforeEach(() => {
      saveCategoryMock = jest.fn();
      props = {
        ...minProps,
        currentCategory,
        initialFormData: {
          name: 'Foo',
        },
        saveCategory: saveCategoryMock,
      };
      const wrapper = mount(
        <Provider store={createStore(combineReducers({ form: formReducer }))}>
          <EditCategoryPage {...props}/>
        </Provider>
      );
      form = wrapper.find(EditCategoryForm);
      nameInput = form
        .find(Input)
        .find({ id: FormDataNames.name })
        .hostNodes();
    });

    it('should call the saveCategory function with the category, its id and its update link', () => {
      nameInput.simulate('change', { target: { value: 'Bar' }});
      form.simulate('submit');

      const [ categoryArgument, idArgument, linkArgument ] = saveCategoryMock.mock.calls[0];
      expect(categoryArgument).toEqual({
        name: 'Bar',
      });
      expect(idArgument).toBe(currentCategory.id);
      expect(linkArgument).toBe(currentCategory._links.update!);
    });
  });
});
