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
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import { ActionBar } from '../../../common/ActionBar';
import {
  EditPublisherForm,
  FormDataNames,
  IFormData,
} from '../../../publisher/EditPublisherForm';
import {
  EditPublisherPage,
  IProps,
} from './EditPublisherPage';

describe('EditPublisherPage', () => {
  const minProps = {
    currentPublisher: {} as IPublisherDTO,
    initialFormData: {},
    isFormValid: false,
    loadPublisher: jest.fn(),
    match: {
      params: {},
    },
    savePublisher: jest.fn(),
    submitForm: jest.fn(),
  } as any as IProps;

  describe('componentDidMount', () => {
    let loadPublisherMock: jest.Mock;

    beforeEach(() => {
      loadPublisherMock = jest.fn();
    });

    it('should call the loadPublisher function if the current route param does not match the id of the current publisher', () => {
      const props: IProps = {
        ...minProps,
        currentPublisher: {
          ...minProps.currentPublisher,
          id: 3,
        },
        loadPublisher: loadPublisherMock,
        match: {
          ...minProps.match,
          params: {
            id: '1'
          },
        },
      };
      shallow(<EditPublisherPage {...props}/>);

      expect(loadPublisherMock).toBeCalledWith(1);
    });

    it('should not call the loadPublisher function if the current route param matches the id of the current publisher', () => {
      const props: IProps = {
        ...minProps,
        currentPublisher: {
          ...minProps.currentPublisher,
          id: 1,
        },
        loadPublisher: loadPublisherMock,
        match: {
          ...minProps.match,
          params: {
            id: '1'
          },
        },
      };
      shallow(<EditPublisherPage {...props}/>);

      expect(loadPublisherMock).not.toHaveBeenCalled();
    });
  });

  it('should render its title as "Edit Publisher"', () => { 
    const wrapper = shallow(<EditPublisherPage {...minProps}/>);
    const header = wrapper.find('h2');

    expect(header.text()).toBe('Edit Publisher');
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
    const wrapper = shallow(<EditPublisherPage {...props}/>);
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
    const wrapper = shallow(<EditPublisherPage {...props}/>);
    const saveButton = wrapper
      .find(ActionBar)
      .find(Button)
      .at(1);
    saveButton.simulate('click');

    expect(submitFormMock).toHaveBeenCalled();
  });

  it('should disable the Save button if the form is invalid', () => {
    const wrapper = shallow(<EditPublisherPage {...minProps}/>);
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
    const wrapper = shallow(<EditPublisherPage {...props}/>);
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
    const wrapper = shallow(<EditPublisherPage {...props}/>);
    const form = wrapper.find(EditPublisherForm);

    expect(form.prop('initialValues')).toBe(initialFormData);
  });

  describe('when submitting the form', () => {
    const currentPublisher: IPublisherDTO = {
      ...minProps.currentPublisher,
      _links: {
        self: {} as IHATEOASLink,
        update: {} as IHATEOASLink,
      },
      id: 1,
    };
    let savePublisherMock: jest.Mock;
    let props: IProps;
    let form: ReactWrapper<any>;
    let nameInput: ReactWrapper;

    beforeEach(() => {
      savePublisherMock = jest.fn();
      props = {
        ...minProps,
        currentPublisher,
        initialFormData: {
          name: 'Foo',
        },
        savePublisher: savePublisherMock,
      };
      const wrapper = mount(
        <Provider store={createStore(combineReducers({ form: formReducer }))}>
          <EditPublisherPage {...props}/>
        </Provider>
      );
      form = wrapper.find(EditPublisherForm);
      nameInput = form
        .find(Input)
        .find({ id: FormDataNames.name })
        .hostNodes();
    });

    it('should call the savePublisher function with the publisher, its id and its update link', () => {
      nameInput.simulate('change', { target: { value: 'Bar' }});
      form.simulate('submit');

      const [ publisherArgument, idArgument, linkArgument ] = savePublisherMock.mock.calls[0];
      expect(publisherArgument).toEqual({
        name: 'Bar',
      });
      expect(idArgument).toBe(currentPublisher.id);
      expect(linkArgument).toBe(currentPublisher._links.update!);
    });
  });
});
