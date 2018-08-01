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
  IAuthorDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import {
  EditAuthorForm,
  FormDataNames,
  IFormData,
} from '../../../author/EditAuthorForm';
import { ActionBar } from '../../../common/ActionBar';
import {
  EditAuthorPage,
  IProps,
} from './EditAuthorPage';

describe('EditAuthorPage', () => {
  const minProps = {
    currentAuthor: {} as IAuthorDTO,
    initialFormData: {},
    isFormValid: false,
    loadAuthor: jest.fn(),
    match: {
      params: {},
    },
    saveAuthor: jest.fn(),
    submitForm: jest.fn(),
  } as any as IProps;

  describe('componentDidMount', () => {
    let loadAuthorMock: jest.Mock;

    beforeEach(() => {
      loadAuthorMock = jest.fn();
    });

    it('should call the loadAuthor function if the current route param does not match the id of the current author', () => {
      const props: IProps = {
        ...minProps,
        currentAuthor: {
          ...minProps.currentAuthor,
          id: 3,
        },
        loadAuthor: loadAuthorMock,
        match: {
          ...minProps.match,
          params: {
            id: '1'
          },
        },
      };
      shallow(<EditAuthorPage {...props}/>);

      expect(loadAuthorMock).toBeCalledWith(1);
    });

    it('should not call the loadAuthor function if the current route param matches the id of the current author', () => {
      const props: IProps = {
        ...minProps,
        currentAuthor: {
          ...minProps.currentAuthor,
          id: 1,
        },
        loadAuthor: loadAuthorMock,
        match: {
          ...minProps.match,
          params: {
            id: '1'
          },
        },
      };
      shallow(<EditAuthorPage {...props}/>);

      expect(loadAuthorMock).not.toHaveBeenCalled();
    });
  });

  it('should render its title as "Edit Author"', () => { 
    const wrapper = shallow(<EditAuthorPage {...minProps}/>);
    const header = wrapper.find('h2');

    expect(header.text()).toBe('Edit Author');
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
    const wrapper = shallow(<EditAuthorPage {...props}/>);
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
    const wrapper = shallow(<EditAuthorPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);
    saveButton.simulate('click');

    expect(submitFormMock).toHaveBeenCalled();
  });

  it('should disable the Save button if the form is invalid', () => {
    const wrapper = shallow(<EditAuthorPage {...minProps}/>);
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
    const wrapper = shallow(<EditAuthorPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);

    expect(saveButton.prop('disabled')).toBe(false);
  });

  it('should set the initialValues on the form', () => {
    const initialFormData: Partial<IFormData> = {
      firstName: 'John',
    };
    const props: IProps = {
      ...minProps,
      initialFormData,
    };
    const wrapper = shallow(<EditAuthorPage {...props}/>);
    const form = wrapper.find(EditAuthorForm);

    expect(form.prop('initialValues')).toBe(initialFormData);
  });

  describe('when submitting the form', () => {
    const currentAuthor: IAuthorDTO = {
      ...minProps.currentAuthor,
      _links: {
        self: {} as IHATEOASLink,
        update: {} as IHATEOASLink,
      },
      id: 1,
    };
    let saveAuthorMock: jest.Mock;
    let props: IProps;
    let form: ReactWrapper<any>;
    let firstNameInput: ReactWrapper;
    let lastNameInput: ReactWrapper;
    let middleNameInput: ReactWrapper;

    beforeEach(() => {
      saveAuthorMock = jest.fn();
      props = {
        ...minProps,
        currentAuthor,
        initialFormData: {
          firstName: 'John',
          lastName: 'Doe',
        },
        saveAuthor: saveAuthorMock,
      };
      const wrapper = mount(
        <Provider store={createStore(combineReducers({ form: formReducer }))}>
          <EditAuthorPage {...props}/>
        </Provider>
      );
      form = wrapper.find(EditAuthorForm);
      firstNameInput = form
        .find(Input)
        .find({ id: FormDataNames.firstName })
        .hostNodes();
      lastNameInput = form
        .find(Input)
        .find({ id: FormDataNames.lastName })
        .hostNodes();
      middleNameInput = form
        .find(Input)
        .find({ id: FormDataNames.middleName })
        .hostNodes();
    });

    it('should not provide the firstName to the saveAuthor function if it did not change', () => {
      firstNameInput.simulate('change', { target: { value: 'John' }});
      form.simulate('submit');
  
      const [ authorArgument ] = saveAuthorMock.mock.calls[0];
      expect(authorArgument).not.toHaveProperty('firstName');
    });

    it('should provide the firstName to the saveAuthor function if it changed', () => {
      firstNameInput.simulate('change', { target: { value: 'Jane' }});
      form.simulate('submit');
  
      const [ authorArgument ] = saveAuthorMock.mock.calls[0];
      expect(authorArgument).toEqual(expect.objectContaining({
        firstName: 'Jane',
      }));
    });

    it('should not provide the lastName to the saveAuthor function if it did not change', () => {
      lastNameInput.simulate('change', { target: { value: 'Doe' }});
      form.simulate('submit');
  
      const [ authorArgument ] = saveAuthorMock.mock.calls[0];
      expect(authorArgument).not.toHaveProperty('lastName');
    });

    it('should provide the firstName to the saveAuthor function if it changed', () => {
      lastNameInput.simulate('change', { target: { value: 'Roe' }});
      form.simulate('submit');
  
      const [ authorArgument ] = saveAuthorMock.mock.calls[0];
      expect(authorArgument).toEqual(expect.objectContaining({
        lastName: 'Roe',
      }));
    });

    it('should not provide the middleName to the saveAuthor function if it did not change', () => {
      middleNameInput.simulate('change', { target: { value: '' }});
      form.simulate('submit');
  
      const [ authorArgument ] = saveAuthorMock.mock.calls[0];
      expect(authorArgument).not.toHaveProperty('middleName');
    });

    it('should provide the middleName to the saveAuthor function if it changed', () => {
      middleNameInput.simulate('change', { target: { value: 'X' }});
      form.simulate('submit');
  
      const [ authorArgument ] = saveAuthorMock.mock.calls[0];
      expect(authorArgument).toEqual(expect.objectContaining({
        middleName: 'X',
      }));
    });

    it('should call the saveAuthor function with the author, its id and its update link', () => {
      firstNameInput.simulate('change', { target: { value: 'Jane' }});
      lastNameInput.simulate('change', { target: { value: 'Roe' }});
      form.simulate('submit');

      const [ authorArgument, idArgument, linkArgument ] = saveAuthorMock.mock.calls[0];
      expect(authorArgument).toEqual({
        firstName: 'Jane',
        lastName: 'Roe'
      });
      expect(idArgument).toBe(currentAuthor.id);
      expect(linkArgument).toBe(currentAuthor._links.update!);
    });
  });
});
