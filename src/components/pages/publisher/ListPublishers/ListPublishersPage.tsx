import * as React from 'react';
import { Table } from 'reactstrap';

import { IPublisherDTO } from '../../../../interfaces/dtos/PublisherDTO';
import { PublisherRowRenderer } from '../../../publisher/PublisherRowRenderer';

export interface IDispatchProps {
  loadPublishers: () => any;
}

export interface IStateProps {
  publishers: IPublisherDTO[]; 
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListPublishersPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.loadPublishers();
  }

  public render() {
    const {
      props: {
        publishers,
      },
      publisherRowRenderer,
    } = this;

    return (
      <div>
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

  private publisherRowRenderer = (publisher: IPublisherDTO) => (
    <PublisherRowRenderer 
      publisher={publisher}
      key={publisher.id}
    />
  )
}