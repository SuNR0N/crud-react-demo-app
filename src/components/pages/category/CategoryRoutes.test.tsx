import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import createMockStore from 'redux-mock-store';

import { CategoryRoutes } from './CategoryRoutes';
import { CreateCategoryPageConnected } from './CreateCategory/CreateCategoryPageConnected';
import { EditCategoryPageConnected } from './EditCategory/EditCategoryPageConnected';
import { ListCategoriesPageConnected } from './ListCategories/ListCategoriesPageConnected';
import { ViewCategoryPageConnected } from './ViewCategory/ViewCategoryPageConnected';

describe('CategoryRoutes', () => {
  const initialState = {};
  const mockStore = createMockStore();

  it('should load the Edit Category page when the path matches on "/categories/:id/edit"', () => {
    const state = {
      ...initialState,
      category: {
        currentCategory: {},
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/categories/1/edit']}>
          <CategoryRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const editCategoryPage = wrapper.find(EditCategoryPageConnected);

    expect(editCategoryPage.exists()).toBeTruthy();
  });

  it('should load the Create Category page when the path matches on "/categories/create"', () => {
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={['/categories/create']}>
          <CategoryRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const createCategoryPage = wrapper.find(CreateCategoryPageConnected);

    expect(createCategoryPage.exists()).toBeTruthy();
  });

  it('should load the View Category page when the path matches on "/categories/:id"', () => {
    const state = {
      ...initialState,
      category: {
        currentCategory: {},
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/categories/1']}>
          <CategoryRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const viewCategoryPage = wrapper.find(ViewCategoryPageConnected);

    expect(viewCategoryPage.exists()).toBeTruthy();
  });

  it('should load the List Categories page when the path matches on "/categories"', () => {
    const state = {
      ...initialState,
      auth: {},
      category: {
        categories: [],
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/categories']}>
          <CategoryRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const listCategoriesPage = wrapper.find(ListCategoriesPageConnected);

    expect(listCategoriesPage.exists()).toBeTruthy();
  });
});
