import React, { Component } from 'react';
import { Table } from 'reactstrap';

import {
  IAction,
  PublisherActionTypes,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import {
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import {
  ConfirmationModal,
  RoutedButton,
  SearchField,
} from '../../../common';
import { PublisherRowRenderer } from '../../../publisher/PublisherRowRenderer';

export interface IDispatchProps {
  deletePublisher: (publisher: IPublisherDTO, link: IHATEOASLink, route?: string) => IAction<PublisherActionTypes.DELETE_PUBLISHER_REQUEST>;
  searchPublishers: (query?: string) => IAction<PublisherActionTypes.LOAD_PUBLISHERS_REQUEST>;
}

export interface IStateProps {
  loggedIn: boolean;
  publishers: IPublisherDTO[]; 
}

export interface IState {
  isModalOpen: boolean;
  selectedPublisher: IPublisherDTO | null;
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListPublishersPage extends Component<IProps, IState> {
  public state: IState = {
    isModalOpen: false,
    selectedPublisher: null,
  };
  
  public componentDidMount() {
    this.props.searchPublishers();
  }

  public render() {
    const {
      closeModal,
      deletePublisher,
      onSearchTextChange,
      props: {
        loggedIn,
        publishers,
      },
      publisherRowRenderer,
      state: {
        isModalOpen,
      },
    } = this;

    return (
      <div className="container-fluid">
        <div className="row no-gutters my-3 d-flex justify-content-between align-items-center">
          <div className="col-sm-6">
            <SearchField
              onValueChange={onSearchTextChange}
              placeholder="Search publishers..."
            />
          </div>
          <RoutedButton
            color="primary"
            disabled={!loggedIn}
            route={RouteConfig.createPublisher}
            symbol="plus-square-regular"
          >
            Create New Publisher
          </RoutedButton>
        </div>
        <Table
          borderless={true}
          striped={true}
          responsive={true}
        >
          <thead className="thead-dark">
            <tr className="d-flex">
              <th className="col-1">ID</th>
              <th className="col-9">Name</th>
              <th className="col-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map(publisherRowRenderer)}
          </tbody>
        </Table>
        <ConfirmationModal
          htmlContent={
            this.state.selectedPublisher ?
            `Are you sure you want to delete <strong>${this.state.selectedPublisher.name}</strong> <i>(ID: ${this.state.selectedPublisher.id})</i> ?` :
            undefined
          }
          onConfirm={deletePublisher}
          isOpen={isModalOpen}
          toggle={closeModal}
        />
      </div>
    );
  }

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedPublisher: null,
    });
  }

  private deletePublisher = () => {
    if (this.state.selectedPublisher && this.state.selectedPublisher._links.delete) {
      this.props.deletePublisher(this.state.selectedPublisher, this.state.selectedPublisher._links.delete);
    }
    this.closeModal();
  }

  private onSearchTextChange = (text: string) => {
    this.props.searchPublishers(text);
  }

  private publisherRowRenderer = (publisher: IPublisherDTO) => (
    <PublisherRowRenderer 
      publisher={publisher}
      key={publisher.id}
      onDelete={this.showConfirmationModal}
    />
  )

  private showConfirmationModal = (publisher: IPublisherDTO) => {
    this.setState({
      isModalOpen: true,
      selectedPublisher: publisher,
    });
  }
}