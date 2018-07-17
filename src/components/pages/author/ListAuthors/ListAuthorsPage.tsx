import * as React from 'react';
import { Table } from 'reactstrap';

import { IAction } from '../../../../actions/ActionHelpers';
import { ActionTypes } from '../../../../actions/AuthorActions';
import { RouteConfig } from '../../../../config/RouteConfig';
import { IAuthorDTO } from '../../../../interfaces/dtos/AuthorDTO';
import { AuthorRowRenderer } from '../../../author/AuthorRowRenderer';
import { RoutedIconButton } from '../../../common/RoutedIconButton';
import { SearchField } from '../../../common/SearchField';

export interface IDispatchProps {
  searchAuthors: (query?: string) => IAction<ActionTypes.LOAD_AUTHORS_REQUEST>;
}

export interface IStateProps {
  authors: IAuthorDTO[];
  loggedIn: boolean;
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListAuthorsPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.searchAuthors();
  }

  public render() {
    const {
      authorRowRenderer,
      onSearchTextChange,
      props: {
        authors,
        loggedIn,
      },
    } = this;

    return (
      <div className="container-fluid">
        <div className="row no-gutters my-3 d-flex justify-content-between align-items-center">
          <div className="col-sm-6">
            <SearchField
              onValueChange={onSearchTextChange}
              placeholder="Search authors..."
            />
          </div>
          <RoutedIconButton
            color="primary"
            disabled={!loggedIn}
            route={RouteConfig.createAuthor}
            symbol="plus-square-regular"
          >
            Create New Author
          </RoutedIconButton>
        </div>
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

  private onSearchTextChange = (text: string) => {
    this.props.searchAuthors(text);
  }
}