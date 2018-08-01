import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import createMockStore from 'redux-mock-store';

import { AuthorRoutes } from './AuthorRoutes';
import { CreateAuthorPageConnected } from './CreateAuthor/CreateAuthorPageConnected';
import { EditAuthorPageConnected } from './EditAuthor/EditAuthorPageConnected';
import { ListAuthorsPageConnected } from './ListAuthors/ListAuthorsPageConnected';
import { ViewAuthorPageConnected } from './ViewAuthor/ViewAuthorPageConnected';

describe('AuthorRoutes', () => {
  const initialState = {};
  const mockStore = createMockStore();

  it('should load the Edit Author page when the path matches on "/authors/:id/edit"', () => {
    const state = {
      ...initialState,
      author: {
        currentAuthor: {},
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/authors/1/edit']}>
          <AuthorRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const editAuthorPage = wrapper.find(EditAuthorPageConnected);

    expect(editAuthorPage.exists()).toBeTruthy();
  });

  it('should load the Create Author page when the path matches on "/authors/create"', () => {
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={['/authors/create']}>
          <AuthorRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const createAuthorPage = wrapper.find(CreateAuthorPageConnected);

    expect(createAuthorPage.exists()).toBeTruthy();
  });

  it('should load the View Author page when the path matches on "/authors/:id"', () => {
    const state = {
      ...initialState,
      author: {
        currentAuthor: {},
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/authors/1']}>
          <AuthorRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const viewAuthorPage = wrapper.find(ViewAuthorPageConnected);

    expect(viewAuthorPage.exists()).toBeTruthy();
  });

  it('should load the List Authors page when the path matches on "/authors"', () => {
    const state = {
      ...initialState,
      auth: {},
      author: {
        authors: [],
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/authors']}>
          <AuthorRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const listAuthorsPage = wrapper.find(ListAuthorsPageConnected);

    expect(listAuthorsPage.exists()).toBeTruthy();
  });
});
