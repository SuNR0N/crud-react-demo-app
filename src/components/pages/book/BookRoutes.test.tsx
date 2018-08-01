import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import createMockStore from 'redux-mock-store';

import { BookRoutes } from './BookRoutes';
import { CreateBookPageConnected } from './CreateBook/CreateBookPageConnected';
import { EditBookPageConnected } from './EditBook/EditBookPageConnected';
import { ListBooksPageConnected } from './ListBooks/ListBooksPageConnected';
import { ViewBookPageConnected } from './ViewBook/ViewBookPageConnected';

describe('BookRoutes', () => {
  const initialState = {};
  const mockStore = createMockStore();

  it('should load the Edit Book page when the path matches on "/books/:id/edit"', () => {
    const state = {
      ...initialState,
      author: {
        authors: [],
      },
      book: {
        currentBook: {},
      },
      category: {
        categories: [],
      },
      publisher: {
        publishers: [],
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/books/1/edit']}>
          <BookRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const editBookPage = wrapper.find(EditBookPageConnected);

    expect(editBookPage.exists()).toBeTruthy();
  });

  it('should load the Create Book page when the path matches on "/books/create"', () => {
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={['/books/create']}>
          <BookRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const createBookPage = wrapper.find(CreateBookPageConnected);

    expect(createBookPage.exists()).toBeTruthy();
  });

  it('should load the View Book page when the path matches on "/books/:id"', () => {
    const state = {
      ...initialState,
      book: {
        currentBook: {},
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/books/1']}>
          <BookRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const viewBookPage = wrapper.find(ViewBookPageConnected);

    expect(viewBookPage.exists()).toBeTruthy();
  });

  it('should load the List Books page when the path matches on "/books"', () => {
    const state = {
      ...initialState,
      auth: {},
      book: {
        books: {
          content: [],
        },
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/books']}>
          <BookRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const listBooksPage = wrapper.find(ListBooksPageConnected);

    expect(listBooksPage.exists()).toBeTruthy();
  });
});
