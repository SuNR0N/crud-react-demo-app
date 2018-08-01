import {
  mount,
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
  CreateCategoryForm,
  FormDataNames,
} from '../../../category/CreateCategoryForm';
import { ActionBar } from '../../../common/ActionBar';
import {
  CreateCategoryPage,
  IProps,
} from './CreateCategoryPage';

describe('CreateCategoryPage', () => {
  const minProps = {
    history: {},
    isFormValid: false,
    saveCategory: jest.fn(),
    submitForm: jest.fn(),
  } as any as IProps;

  it('should render its title as "Create New Category"', () => { 
    const wrapper = shallow(<CreateCategoryPage {...minProps}/>);
    const header = wrapper.find('h2');

    expect(header.text()).toBe('Create New Category');
  });

  it('should call the saveCategory function when submitting the form', () => {
    const saveCategoryMock = jest.fn();
    const props: IProps = {
      ...minProps,
      saveCategory: saveCategoryMock,
    };
    const wrapper = mount(
      <Provider store={createStore(combineReducers({ form: formReducer }))}>
        <CreateCategoryPage {...props}/>
      </Provider>
    );
    const form = wrapper.find(CreateCategoryForm);
    const nameInput = form
      .find(Input)
      .find({ id: FormDataNames.name })
      .hostNodes();
    nameInput.simulate('change', { target: { value: 'Foo' }});
    form.simulate('submit');

    expect(saveCategoryMock).toHaveBeenCalledWith({
      name: 'Foo',
    });
  });

  it('should navigate to the List Categories page when the Cancel button is clicked', () => {
    const pushMock = jest.fn();
    const props: IProps = {
      ...minProps,
      history: {
        ...minProps.history,
        push: pushMock,
      },
    };
    const wrapper = shallow(<CreateCategoryPage {...props}/>);
    const cancelButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(0);
    cancelButton.simulate('click');

    expect(pushMock).toHaveBeenCalledWith('/categories');
  });

  it('should call the submitForm function when the Save button is clicked', () => {
    const submitFormMock = jest.fn();
    const props: IProps = {
      ...minProps,
      isFormValid: true,
      submitForm: submitFormMock,
    };
    const wrapper = shallow(<CreateCategoryPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);
    saveButton.simulate('click');

    expect(submitFormMock).toHaveBeenCalled();
  });

  it('should disable the Save button if the form is invalid', () => {
    const wrapper = shallow(<CreateCategoryPage {...minProps}/>);
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
    const wrapper = shallow(<CreateCategoryPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);

    expect(saveButton.prop('disabled')).toBe(false);
  });
});
