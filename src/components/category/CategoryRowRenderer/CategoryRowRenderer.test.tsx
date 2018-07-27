import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import {
  IconButton,
  RoutedButton,
} from '../../common';
import {
  CategoryRowRenderer,
  IProps,
} from './CategoryRowRenderer';

describe('CategoryRowRenderer', () => {
  const category: ICategoryDTO = {
    _links: {
      self: {
        href: '/api/v1/categories/1',
        method: 'GET',
      },
    },
    id: 1,
    name: 'Foo',
  };

  it('should display the id of the category', () => {
    const wrapper = shallow<IProps>(<CategoryRowRenderer category={category} />);
    const idCell = wrapper.find('td').at(0);

    expect(idCell.text()).toBe('1');
  });

  it('should display the name of the category', () => {
    const wrapper = shallow<IProps>(<CategoryRowRenderer category={category} />);
    const nameCell = wrapper.find('td').at(1);

    expect(nameCell.text()).toBe('Foo');
  });

  it('should display an eye action button if the self link exists', () => {
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <CategoryRowRenderer category={category} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const eyeButton = wrapper
      .find('td').at(2)
      .find(RoutedButton)
      .find({ symbol: 'eye-regular' })
      .first();
    
    expect(eyeButton.exists()).toBeTruthy();
  });

  it('should not display an eye action button if the self link does not exist', () => {
    const categoryWithoutSelfLink = {
      ...category,
      _links: {},
    } as ICategoryDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <CategoryRowRenderer category={categoryWithoutSelfLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const eyeButton = wrapper
      .find('td').at(2)
      .find(RoutedButton)
      .find({ symbol: 'eye-regular' })
      .first();
    
    expect(eyeButton.exists()).toBeFalsy();
  });

  it('should display an edit action button if the update link exists', () => {
    const categoryWithUpdateLink = {
      ...category,
      _links: {
        update: {
          href: '/api/v1/categories/1',
          method: 'PUT',
        },
      },
    } as ICategoryDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <CategoryRowRenderer category={categoryWithUpdateLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const editButton = wrapper
      .find('td').at(2)
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
            <CategoryRowRenderer category={category} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const editButton = wrapper
      .find('td').at(2)
      .find(RoutedButton)
      .find({ symbol: 'edit-regular' })
      .first();
    
    expect(editButton.exists()).toBeFalsy();
  });

  it('should display a trash action button if the delete link exists', () => {
    const categoryWithDeleteLink = {
      ...category,
      _links: {
        delete: {
          href: '/api/v1/categories/1',
          method: 'DELETE',
        },
      },
    } as ICategoryDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <CategoryRowRenderer category={categoryWithDeleteLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find('td').at(2)
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
            <CategoryRowRenderer category={category} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find('td').at(2)
      .find(IconButton)
      .find({ symbol: 'trash-alt-regular' })
      .first();
    
    expect(deleteButton.exists()).toBeFalsy();
  });

  it('should call the provided onDelete function if the delete action button is clicked', () => {
    const onDeleteMock = jest.fn();
    const categoryWithDeleteLink = {
      ...category,
      _links: {
        delete: {
          href: '/api/v1/categories/1',
          method: 'DELETE',
        },
      },
    } as ICategoryDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <CategoryRowRenderer category={categoryWithDeleteLink} onDelete={onDeleteMock} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find('td').at(2)
      .find(IconButton)
      .find({ symbol: 'trash-alt-regular' })
      .first();
    
    deleteButton.simulate('click');

    expect(onDeleteMock).toHaveBeenCalledWith(categoryWithDeleteLink);
  });
});
