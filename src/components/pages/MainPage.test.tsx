import {
  mount,
  shallow,
} from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import createMockStore from 'redux-mock-store';

import { IRootState } from '../../reducers/RootState';
import { NavigationBarConnected } from '../common/NavigationBar';
import { AuthorRoutes } from './author/AuthorRoutes';
import { BookRoutes } from './book/BookRoutes';
import { CategoryRoutes } from './category/CategoryRoutes';
import { MainPage } from './MainPage';
import { PublisherRoutes } from './publisher/PublisherRoutes';

describe('MainPage', () => {
  const initialState = {
    auth: {},
    request: {
      pendingRequests: {}
    },
  } as IRootState;
  const mockStore = createMockStore();

  it('should render the navigation bar', () => {
    const wrapper = shallow(<MainPage/>);
    const navigationBar = wrapper.find(NavigationBarConnected);

    expect(navigationBar.exists()).toBeTruthy();
  });

  it('should redirect to the BookRoutes component from root', () => {
    const state = {
      ...initialState,
      book: {
        books: {
          content: [],
        },
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/']}>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );
    const bookRoutes = wrapper.find(BookRoutes);

    expect(bookRoutes.exists()).toBeTruthy();
  });

  it('should load the AuthorRoutes component when the path matches on "/authors"', () => {
    const state = {
      ...initialState,
      author: {
        authors: [],
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/authors']}>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );
    const authorRoutes = wrapper.find(AuthorRoutes);

    expect(authorRoutes.exists()).toBeTruthy();
  });

  it('should load the BookRoutes component when the path matches on "/books"', () => {
    const state = {
      ...initialState,
      book: {
        books: {
          content: [],
        },
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/books']}>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );
    const bookRoutes = wrapper.find(BookRoutes);

    expect(bookRoutes.exists()).toBeTruthy();
  });

  it('should load the CategoryRoutes component when the path matches on "/categories"', () => {
    const state = {
      ...initialState,
      category: {
        categories: [],
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/categories']}>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );
    const categoryRoutes = wrapper.find(CategoryRoutes);

    expect(categoryRoutes.exists()).toBeTruthy();
  });

  it('should load the PublisherRoutes component when the path matches on "/publishers"', () => {
    const state = {
      ...initialState,
      publisher: {
        publishers: [],
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/publishers']}>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );
    const publisherRoutes = wrapper.find(PublisherRoutes);

    expect(publisherRoutes.exists()).toBeTruthy();
  });
});
