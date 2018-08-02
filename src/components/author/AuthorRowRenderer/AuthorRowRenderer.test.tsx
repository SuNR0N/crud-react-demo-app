import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import {
  ActionCell,
  IconButton,
  RoutedButton,
} from '../../common';
import {
  AuthorRowRenderer,
  IProps,
} from './AuthorRowRenderer';

describe('AuthorRowRenderer', () => {
  const author: IAuthorDTO = {
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
  };

  it('should display the id of the author', () => {
    const wrapper = shallow<IProps>(<AuthorRowRenderer author={author} />);
    const idCell = wrapper.find('td').at(0);

    expect(idCell.text()).toBe('1');
  });

  it('should display the name of the author', () => {
    const wrapper = shallow<IProps>(<AuthorRowRenderer author={author} />);
    const nameCell = wrapper.find('td').at(1);

    expect(nameCell.text()).toBe('John Doe');
  });

  it('should display the first name of the author', () => {
    const wrapper = shallow<IProps>(<AuthorRowRenderer author={author} />);
    const firstNameCell = wrapper.find('td').at(2);

    expect(firstNameCell.text()).toBe('John');
  });

  it('should display the middle name of the author', () => {
    const wrapper = shallow<IProps>(<AuthorRowRenderer author={author} />);
    const middleNameCell = wrapper.find('td').at(3);

    expect(middleNameCell.text()).toBe('X');
  });

  it('should display the last name of the author', () => {
    const wrapper = shallow<IProps>(<AuthorRowRenderer author={author} />);
    const lastNameCell = wrapper.find('td').at(4);

    expect(lastNameCell.text()).toBe('Doe');
  });

  it('should display an eye action button if the self link exists', () => {
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <AuthorRowRenderer author={author} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const eyeButton = wrapper
      .find(ActionCell)
      .find(RoutedButton)
      .find({ symbol: 'eye-regular' })
      .first();
    
    expect(eyeButton.exists()).toBeTruthy();
  });

  it('should not display an eye action button if the self link does not exist', () => {
    const authorWithoutSelfLink = {
      ...author,
      _links: {},
    } as IAuthorDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <AuthorRowRenderer author={authorWithoutSelfLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const eyeButton = wrapper
      .find('td').at(4)
      .find(RoutedButton)
      .find({ symbol: 'eye-regular' })
      .first();
    
    expect(eyeButton.exists()).toBeFalsy();
  });

  it('should display an edit action button if the update link exists', () => {
    const authorWithUpdateLink = {
      ...author,
      _links: {
        update: {
          href: '/api/v1/authors/1',
          method: 'PATCH',
        },
      },
    } as IAuthorDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <AuthorRowRenderer author={authorWithUpdateLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const editButton = wrapper
      .find(ActionCell)
      .find(RoutedButton)
      .find({ symbol: 'edit-regular' })
      .first();
    
    expect(editButton.exists()).toBeTruthy();
  });

  it('should not display an edit action button if the update link does not exist', () => {
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <AuthorRowRenderer author={author} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const editButton = wrapper
      .find('td').at(4)
      .find(RoutedButton)
      .find({ symbol: 'edit-regular' })
      .first();
    
    expect(editButton.exists()).toBeFalsy();
  });

  it('should display a trash action button if the delete link exists', () => {
    const authorWithDeleteLink = {
      ...author,
      _links: {
        delete: {
          href: '/api/v1/authors/1',
          method: 'DELETE',
        },
      },
    } as IAuthorDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <AuthorRowRenderer author={authorWithDeleteLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find(ActionCell)
      .find(IconButton)
      .find({ symbol: 'trash-alt-regular' })
      .first();
    
    expect(deleteButton.exists()).toBeTruthy();
  });

  it('should not display a trash action button if the delete link does not exist', () => {
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <AuthorRowRenderer author={author} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find('td').at(4)
      .find(IconButton)
      .find({ symbol: 'trash-alt-regular' })
      .first();
    
    expect(deleteButton.exists()).toBeFalsy();
  });

  it('should call the provided onDelete function if the delete action button is clicked', () => {
    const onDeleteMock = jest.fn();
    const authorWithDeleteLink = {
      ...author,
      _links: {
        delete: {
          href: '/api/v1/authors/1',
          method: 'DELETE',
        },
      },
    } as IAuthorDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <AuthorRowRenderer author={authorWithDeleteLink} onDelete={onDeleteMock} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find(ActionCell)
      .find(IconButton)
      .find({ symbol: 'trash-alt-regular' })
      .first();
    
    deleteButton.simulate('click');

    expect(onDeleteMock).toHaveBeenCalledWith(authorWithDeleteLink);
  });
});
