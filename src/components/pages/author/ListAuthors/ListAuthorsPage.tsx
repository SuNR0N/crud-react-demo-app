import * as React from 'react';
import { Table } from 'reactstrap';

import { IAction } from '../../../../actions/ActionHelpers';
import { ActionTypes } from '../../../../actions/AuthorActions';
import { RouteConfig } from '../../../../config/RouteConfig';
import {
  IAuthorDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { AuthorRowRenderer } from '../../../author/AuthorRowRenderer';
import { ConfirmationModal } from '../../../common/ConfirmationModal';
import { RoutedButton } from '../../../common/RoutedButton';
import { SearchField } from '../../../common/SearchField';

export interface IDispatchProps {
  deleteAuthor: (author: IAuthorDTO, link: IHATEOASLink, route?: string) => IAction<ActionTypes.DELETE_AUTHOR_REQUEST>;
  searchAuthors: (query?: string) => IAction<ActionTypes.LOAD_AUTHORS_REQUEST>;
}

export interface IStateProps {
  authors: IAuthorDTO[];
  loggedIn: boolean;
}

export interface IState {
  isModalOpen: boolean;
  selectedAuthor: IAuthorDTO | null;
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListAuthorsPage extends React.Component<IProps, IState> {
  public state: IState = {
    isModalOpen: false,
    selectedAuthor: null,
  };

  public componentDidMount() {
    this.props.searchAuthors();
  }

  public render() {
    const {
      authorRowRenderer,
      closeModal,
      deleteAuthor,
      onSearchTextChange,
      props: {
        authors,
        loggedIn,
      },
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
              placeholder="Search authors..."
            />
          </div>
          <RoutedButton
            color="primary"
            disabled={!loggedIn}
            route={RouteConfig.createAuthor}
            symbol="plus-square-regular"
          >
            Create New Author
          </RoutedButton>
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
        <ConfirmationModal
          htmlContent={
            this.state.selectedAuthor ?
            `Are you sure you want to delete <strong>${this.state.selectedAuthor.fullName}</strong> <i>(ID: ${this.state.selectedAuthor.id})</i> ?` :
            undefined
          }
          onConfirm={deleteAuthor}
          isOpen={isModalOpen}
          toggle={closeModal}
        />
      </div>
    );
  }

  private authorRowRenderer = (author: IAuthorDTO) => (
    <AuthorRowRenderer 
      author={author}
      key={author.id}
      onDelete={this.showConfirmationModal}
    />
  )

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedAuthor: null,
    });
  }

  private deleteAuthor = () => {
    if (this.state.selectedAuthor && this.state.selectedAuthor._links.delete) {
      this.props.deleteAuthor(this.state.selectedAuthor, this.state.selectedAuthor._links.delete);
    }
    this.closeModal();
  }

  private onSearchTextChange = (text: string) => {
    this.props.searchAuthors(text);
  }
  
  private showConfirmationModal = (author: IAuthorDTO) => {
    this.setState({
      isModalOpen: true,
      selectedAuthor: author,
    });
  }
}