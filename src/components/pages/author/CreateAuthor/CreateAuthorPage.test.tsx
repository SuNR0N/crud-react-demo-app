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
  CreateAuthorForm,
  FormDataNames,
} from '../../../author/CreateAuthorForm';
import { ActionBar } from '../../../common/ActionBar';
import {
  CreateAuthorPage,
  IProps,
} from './CreateAuthorPage';

describe('CreateAuthorPage', () => {
  const minProps = {
    history: {},
    isFormValid: false,
    saveAuthor: jest.fn(),
    submitForm: jest.fn(),
  } as any as IProps;

  it('should render its title as "Create New Author"', () => { 
    const wrapper = shallow(<CreateAuthorPage {...minProps}/>);
    const header = wrapper.find('h2');

    expect(header.text()).toBe('Create New Author');
  });

  it('should call the saveAuthor function when submitting the form', () => {
    const saveAuthorMock = jest.fn();
    const props: IProps = {
      ...minProps,
      saveAuthor: saveAuthorMock,
    };
    const wrapper = mount(
      <Provider store={createStore(combineReducers({ form: formReducer }))}>
        <CreateAuthorPage {...props}/>
      </Provider>
    );
    const form = wrapper.find(CreateAuthorForm);
    const firstNameInput = form
      .find(Input)
      .find({ id: FormDataNames.firstName })
      .hostNodes();
    const lastNameInput = form
      .find(Input)
      .find({ id: FormDataNames.lastName })
      .hostNodes();
    firstNameInput.simulate('change', { target: { value: 'John' }});
    lastNameInput.simulate('change', { target: { value: 'Doe' }});
    form.simulate('submit');

    expect(saveAuthorMock).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  it('should navigate to the List Authors page when the Cancel button is clicked', () => {
    const pushMock = jest.fn();
    const props: IProps = {
      ...minProps,
      history: {
        ...minProps.history,
        push: pushMock,
      },
    };
    const wrapper = shallow(<CreateAuthorPage {...props}/>);
    const cancelButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(0);
    cancelButton.simulate('click');

    expect(pushMock).toHaveBeenCalledWith('/authors');
  });

  it('should call the submitForm function when the Save button is clicked', () => {
    const submitFormMock = jest.fn();
    const props: IProps = {
      ...minProps,
      isFormValid: true,
      submitForm: submitFormMock,
    };
    const wrapper = shallow(<CreateAuthorPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);
    saveButton.simulate('click');

    expect(submitFormMock).toHaveBeenCalled();
  });

  it('should disable the Save button if the form is invalid', () => {
    const wrapper = shallow(<CreateAuthorPage {...minProps}/>);
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
    const wrapper = shallow(<CreateAuthorPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);

    expect(saveButton.prop('disabled')).toBe(false);
  });
});
