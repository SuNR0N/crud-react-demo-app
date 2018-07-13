import * as React from 'react';
import { Table } from 'reactstrap';

import { IAuthorDTO } from '../../../../interfaces/dtos/AuthorDTO';
import { AuthorRowRenderer } from '../../../author/AuthorRowRenderer';

export interface IDispatchProps {
  loadAuthors: () => any;
}

export interface IStateProps {
  authors: IAuthorDTO[]; 
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListAuthorsPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.loadAuthors();
  }

  public render() {
    const {
      props: {
        authors,
      },
      authorRowRenderer,
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
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(authorRowRenderer)}
          </tbody>
        </Table>
      </div>
    );
  }

  private authorRowRenderer = (author: IAuthorDTO) => (
    <AuthorRowRenderer 
      author={author}
      key={author.id}
    />
  )
}