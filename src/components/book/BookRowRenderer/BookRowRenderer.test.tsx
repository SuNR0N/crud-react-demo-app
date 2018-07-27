import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import {
  IconButton,
  RoutedButton,
} from '../../common';
import {
  BookRowRenderer,
  IProps,
} from './BookRowRenderer';

describe('BookRowRenderer', () => {
  const book: IBookDTO = {
    _links: {
      self: {
        href: '/api/v1/books/1',
        method: 'GET',
      },
    },
    authors: [
      'John Doe',
      'Jane Doe',
    ],
    categories: [
      'Category #1',
      'Category #2',
    ],
    id: 1,
    isbn10: '1234567890',
    isbn13: '1234567890123',
    publicationDate: '2001-02-03',
    publishers: [
      'Publisher #1',
      'Publisher #2',
    ],
    title: 'FooBar',
  };

  it('should display the id of the book', () => {
    const wrapper = shallow<IProps>(<BookRowRenderer book={book} />);
    const idCell = wrapper.find('td').at(0);

    expect(idCell.text()).toBe('1');
  });

  it('should display the title of the book', () => {
    const wrapper = shallow<IProps>(<BookRowRenderer book={book} />);
    const titleCell = wrapper.find('td').at(1);

    expect(titleCell.text()).toBe('FooBar');
  });

  it('should display the categories of the book', () => {
    const wrapper = shallow<IProps>(<BookRowRenderer book={book} />);
    const categoriesCell = wrapper.find('td').at(2);

    expect(categoriesCell.text()).toBe('Category #1, Category #2');
  });

  it('should display the authors of the book', () => {
    const wrapper = shallow<IProps>(<BookRowRenderer book={book} />);
    const authorsCell = wrapper.find('td').at(3);

    expect(authorsCell.text()).toBe('John Doe, Jane Doe');
  });

  it('should display the publishers of the book', () => {
    const wrapper = shallow<IProps>(<BookRowRenderer book={book} />);
    const publishersCell = wrapper.find('td').at(4);

    expect(publishersCell.text()).toBe('Publisher #1, Publisher #2');
  });

  it('should display the formatted publication date of the book', () => {
    const wrapper = shallow<IProps>(<BookRowRenderer book={book} />);
    const publicationDateCell = wrapper.find('td').at(5);

    expect(publicationDateCell.text()).toBe('2001-02-03');
  });

  it('should display an eye action button if the self link exists', () => {
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <BookRowRenderer book={book} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const eyeButton = wrapper
      .find('td').at(6)
      .find(RoutedButton)
      .find({ symbol: 'eye-regular' })
      .first();
    
    expect(eyeButton.exists()).toBeTruthy();
  });

  it('should not display an eye action button if the self link does not exist', () => {
    const bookWithoutSelfLink = {
      ...book,
      _links: {},
    } as IBookDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <BookRowRenderer book={bookWithoutSelfLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const eyeButton = wrapper
      .find('td').at(6)
      .find(RoutedButton)
      .find({ symbol: 'eye-regular' })
      .first();
    
    expect(eyeButton.exists()).toBeFalsy();
  });

  it('should display an edit action button if the update link exists', () => {
    const bookWithUpdateLink = {
      ...book,
      _links: {
        update: {
          href: '/api/v1/books/1',
          method: 'PATCH',
        },
      },
    } as IBookDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <BookRowRenderer book={bookWithUpdateLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const editButton = wrapper
      .find('td').at(6)
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
            <BookRowRenderer book={book} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const editButton = wrapper
      .find('td').at(6)
      .find(RoutedButton)
      .find({ symbol: 'edit-regular' })
      .first();
    
    expect(editButton.exists()).toBeFalsy();
  });

  it('should display a trash action button if the delete link exists', () => {
    const bookWithDeleteLink = {
      ...book,
      _links: {
        delete: {
          href: '/api/v1/books/1',
          method: 'DELETE',
        },
      },
    } as IBookDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <BookRowRenderer book={bookWithDeleteLink} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find('td').at(6)
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
            <BookRowRenderer book={book} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find('td').at(6)
      .find(IconButton)
      .find({ symbol: 'trash-alt-regular' })
      .first();
    
    expect(deleteButton.exists()).toBeFalsy();
  });

  it('should call the provided onDelete function if the delete action button is clicked', () => {
    const onDeleteMock = jest.fn();
    const bookWithDeleteLink = {
      ...book,
      _links: {
        delete: {
          href: '/api/v1/books/1',
          method: 'DELETE',
        },
      },
    } as IBookDTO;
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <BookRowRenderer book={bookWithDeleteLink} onDelete={onDeleteMock} />
          </tbody>
        </table>
      </MemoryRouter>
    );
    const deleteButton = wrapper
      .find('td').at(6)
      .find(IconButton)
      .find({ symbol: 'trash-alt-regular' })
      .first();
    
    deleteButton.simulate('click');

    expect(onDeleteMock).toHaveBeenCalledWith(bookWithDeleteLink);
  });
});
