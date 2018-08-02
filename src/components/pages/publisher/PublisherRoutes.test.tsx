import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import createMockStore from 'redux-mock-store';

import { CreatePublisherPageConnected } from './CreatePublisher/CreatePublisherPageConnected';
import { EditPublisherPageConnected } from './EditPublisher/EditPublisherPageConnected';
import { ListPublishersPageConnected } from './ListPublishers/ListPublishersPageConnected';
import { PublisherRoutes } from './PublisherRoutes';
import { ViewPublisherPageConnected } from './ViewPublisher/ViewPublisherPageConnected';

describe('PublisherRoutes', () => {
  const initialState = {};
  const mockStore = createMockStore();

  it('should load the Edit Publisher page when the path matches on "/publishers/:id/edit"', () => {
    const state = {
      ...initialState,
      publisher: {
        currentPublisher: {},
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/publishers/1/edit']}>
          <PublisherRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const editPublisherPage = wrapper.find(EditPublisherPageConnected);

    expect(editPublisherPage.exists()).toBeTruthy();
  });

  it('should load the Create Publisher page when the path matches on "/publishers/create"', () => {
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={['/publishers/create']}>
          <PublisherRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const createPublisherPage = wrapper.find(CreatePublisherPageConnected);

    expect(createPublisherPage.exists()).toBeTruthy();
  });

  it('should load the View Publisher page when the path matches on "/publishers/:id"', () => {
    const state = {
      ...initialState,
      publisher: {
        currentPublisher: {},
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/publishers/1']}>
          <PublisherRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const viewPublisherPage = wrapper.find(ViewPublisherPageConnected);

    expect(viewPublisherPage.exists()).toBeTruthy();
  });

  it('should load the List Publishers page when the path matches on "/publishers"', () => {
    const state = {
      ...initialState,
      auth: {},
      publisher: {
        publishers: [],
      },
      request: {
        pendingRequests: {},
      },
    };
    const wrapper = mount(
      <Provider store={mockStore(state)}>
        <MemoryRouter initialEntries={['/publishers']}>
          <PublisherRoutes/>
        </MemoryRouter>
      </Provider>
    );
    const listPublishersPage = wrapper.find(ListPublishersPageConnected);

    expect(listPublishersPage.exists()).toBeTruthy();
  });
});
