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
  CreateBookForm,
  FormDataNames,
} from '../../../book/CreateBookForm';
import { ActionBar } from '../../../common/ActionBar';
import {
  CreateBookPage,
  IProps,
} from './CreateBookPage';

describe('CreateBookPage', () => {
  const minProps = {
    history: {},
    isFormValid: false,
    saveBook: jest.fn(),
    submitForm: jest.fn(),
  } as any as IProps;

  it('should render its title as "Create New Book"', () => { 
    const wrapper = shallow(<CreateBookPage {...minProps}/>);
    const header = wrapper.find('h2');

    expect(header.text()).toBe('Create New Book');
  });

  it('should call the saveBook function when submitting the form', () => {
    const saveBookMock = jest.fn();
    const props: IProps = {
      ...minProps,
      saveBook: saveBookMock,
    };
    const wrapper = mount(
      <Provider store={createStore(combineReducers({ form: formReducer }))}>
        <CreateBookPage {...props}/>
      </Provider>
    );
    const form = wrapper.find(CreateBookForm);
    const isbn13Input = form
      .find(Input)
      .find({ id: FormDataNames.isbn13 })
      .hostNodes();
    const titleInput = form
      .find(Input)
      .find({ id: FormDataNames.title })
      .hostNodes();
    isbn13Input.simulate('change', { target: { value: '9780984782857' }});
    titleInput.simulate('change', { target: { value: 'Foo' }});
    form.simulate('submit');

    expect(saveBookMock).toHaveBeenCalledWith({
      isbn13: '9780984782857',
      title: 'Foo',
    });
  });

  it('should navigate to the List Books page when the Cancel button is clicked', () => {
    const pushMock = jest.fn();
    const props: IProps = {
      ...minProps,
      history: {
        ...minProps.history,
        push: pushMock,
      },
    };
    const wrapper = shallow(<CreateBookPage {...props}/>);
    const cancelButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(0);
    cancelButton.simulate('click');

    expect(pushMock).toHaveBeenCalledWith('/books');
  });

  it('should call the submitForm function when the Save button is clicked', () => {
    const submitFormMock = jest.fn();
    const props: IProps = {
      ...minProps,
      isFormValid: true,
      submitForm: submitFormMock,
    };
    const wrapper = shallow(<CreateBookPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);
    saveButton.simulate('click');

    expect(submitFormMock).toHaveBeenCalled();
  });

  it('should disable the Save button if the form is invalid', () => {
    const wrapper = shallow(<CreateBookPage {...minProps}/>);
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
    const wrapper = shallow(<CreateBookPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);

    expect(saveButton.prop('disabled')).toBe(false);
  });
});
