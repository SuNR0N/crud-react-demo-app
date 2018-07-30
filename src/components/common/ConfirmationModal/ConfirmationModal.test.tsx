import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

import { ConfirmationModal } from './ConfirmationModal';

describe('ConfirmationModal', () => {
  it('should apply the "confirmation-modal" class name', () => {
    const wrapper = shallow(<ConfirmationModal/>);

    expect(wrapper.hasClass('confirmation-modal')).toBeTruthy();
  });

  it('should add additional classes if they are provided through the className property', () => {
    const wrapper = shallow(<ConfirmationModal className="foo"/>);

    expect(wrapper.hasClass('foo')).toBeTruthy();
  });

  it('should set the title to "Confirmation" by default', () => {
    const wrapper = mount(<ConfirmationModal isOpen={true}/>);
    const header = wrapper.find('h4');

    expect(header.text()).toBe('Confirmation');
  });

  it('should override the title if it is provided', () => {
    const wrapper = mount(
      <ConfirmationModal
        isOpen={true}
        title="Foo"
      />
    );
    const header = wrapper.find('h4');

    expect(header.text()).toBe('Foo');
  });

  it('should set the text of the Cancel button to "Cancel" by default', () => {
    const wrapper = mount(<ConfirmationModal isOpen={true}/>);
    const cancelButton = wrapper
      .find(Button)
      .find({ color: 'secondary' });

    expect(cancelButton.text()).toBe('Cancel');
  });

  it('should override the text of the Cancel button if it is provided', () => {
    const wrapper = mount(
      <ConfirmationModal
        cancelButtonText="Foo"
        isOpen={true}
      />
    );
    const cancelButton = wrapper
      .find(Button)
      .find({ color: 'secondary' });

    expect(cancelButton.text()).toBe('Foo');
  });

  it('should set the text of the Delete button to "Delete" by default', () => {
    const wrapper = mount(<ConfirmationModal isOpen={true}/>);
    const deleteButton = wrapper
      .find(Button)
      .find({ color: 'danger' });

    expect(deleteButton.text()).toBe('Delete');
  });

  it('should override the text of the Delete button if it is provided', () => {
    const wrapper = mount(
      <ConfirmationModal
        confirmButtonText="Foo"
        isOpen={true}
      />
    );
    const deleteButton = wrapper
      .find(Button)
      .find({ color: 'danger' });

    expect(deleteButton.text()).toBe('Foo');
  });

  it('should call the toggle function when the Close button is clicked', () => {
    const toggleMock = jest.fn();
    const wrapper = mount(
      <ConfirmationModal
        isOpen={true}
        toggle={toggleMock}
      />
    );
    const closeButton = wrapper
      .find(ModalHeader)
      .find('button');
    closeButton.simulate('click');

    expect(toggleMock).toHaveBeenCalled();
  });

  it('should call the toggle function when the Cancel button is clicked', () => {
    const toggleMock = jest.fn();
    const wrapper = mount(
      <ConfirmationModal
        isOpen={true}
        toggle={toggleMock}
      />
    );
    const cancelButton = wrapper
      .find(ModalFooter)
      .find(Button)
      .first();
    cancelButton.simulate('click');

    expect(toggleMock).toHaveBeenCalled();
  });

  it('should call the toggle function when the Delete button is clicked and the onConfirm is not defined', () => {
    const toggleMock = jest.fn();
    const wrapper = mount(
      <ConfirmationModal
        isOpen={true}
        toggle={toggleMock}
      />
    );
    const deleteButton = wrapper
      .find(ModalFooter)
      .find(Button)
      .last();
    deleteButton.simulate('click');

    expect(toggleMock).toHaveBeenCalled();
  });

  it('should call the onConfirm function when the Delete button is clicked and the onConfirm is defined', () => {
    const onConfirmMock = jest.fn();
    const wrapper = mount(
      <ConfirmationModal
        isOpen={true}
        onConfirm={onConfirmMock}
      />
    );
    const deleteButton = wrapper
      .find(ModalFooter)
      .find(Button)
      .last();
    deleteButton.simulate('click');

    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('should render html content within the body if the htmlContent property is set', () => {
    const htmlContent = '<b>Foo</b> <i>Bar</i>';
    const wrapper = mount(
      <ConfirmationModal
        htmlContent={htmlContent}
        isOpen={true}
      />
    );
    const body = wrapper.find(ModalBody);

    expect(body.render().html()).toBe('<div><b>Foo</b> <i>Bar</i></div>');
  });

  it('should render the provided children within the body', () => {
    const child = (<div>Foo</div>);
    const wrapper = mount(
      <ConfirmationModal isOpen={true}>
        {child}
      </ConfirmationModal>
    );
    const body = wrapper.find(ModalBody);

    expect(body.contains(child)).toBeTruthy();
  });
});
