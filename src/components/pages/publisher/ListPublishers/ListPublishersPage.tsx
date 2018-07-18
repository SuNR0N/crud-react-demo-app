import * as React from 'react';
import { Table } from 'reactstrap';

import { IAction } from '../../../../actions/ActionHelpers';
import { ActionTypes } from '../../../../actions/PublisherActions';
import { RouteConfig } from '../../../../config/RouteConfig';
import { IPublisherDTO } from '../../../../interfaces/dtos/PublisherDTO';
import { RoutedButton } from '../../../common/RoutedButton';
import { SearchField } from '../../../common/SearchField';
import { PublisherRowRenderer } from '../../../publisher/PublisherRowRenderer';

export interface IDispatchProps {
  searchPublishers: (query?: string) => IAction<ActionTypes.LOAD_PUBLISHERS_REQUEST>;
}

export interface IStateProps {
  loggedIn: boolean;
  publishers: IPublisherDTO[]; 
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListPublishersPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.searchPublishers();
  }

  public render() {
    const {
      onSearchTextChange,
      props: {
        loggedIn,
        publishers,
      },
      publisherRowRenderer,
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
          striped={true}
          responsive={true}
        >
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map(publisherRowRenderer)}
          </tbody>
        </Table>
      </div>
    );
  }

  private onSearchTextChange = (text: string) => {
    this.props.searchPublishers(text);
  }

  private publisherRowRenderer = (publisher: IPublisherDTO) => (
    <PublisherRowRenderer 
      publisher={publisher}
      key={publisher.id}
    />
  )
}