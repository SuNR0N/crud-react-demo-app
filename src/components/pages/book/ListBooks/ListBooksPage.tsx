import * as React from 'react';
import { Table } from 'reactstrap';

import { IAction } from '../../../../actions/ActionHelpers';
import { ActionTypes } from '../../../../actions/BookActions';
import { RouteConfig } from '../../../../config';
import {
  IBookDTO,
  IPageableCollectionDTO,
} from '../../../../interfaces/dtos';
import { BookRowRenderer } from '../../../book/BookRowRenderer';
import { RoutedIconButton } from '../../../common/RoutedIconButton';
import { SearchField } from '../../../common/SearchField';

export interface IDispatchProps {
  searchBooks: (query?: string) => IAction<ActionTypes.LOAD_BOOKS_REQUEST>;
}

export interface IStateProps {
  loggedIn: boolean;
  booksCollection: IPageableCollectionDTO<IBookDTO>; 
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListBooksPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.searchBooks();
  }

  public render() {
    const {
      props: {
        booksCollection,
        loggedIn,
      },
      bookRowRenderer,
      onSearchTextChange,
    } = this;

    return (
      <div className="container-fluid">
        <div className="row no-gutters my-3 d-flex justify-content-between align-items-center">
          <div className="col-sm-6">
            <SearchField
              onValueChange={onSearchTextChange}
              placeholder="Search books..."
            />
          </div>
          <RoutedIconButton
            color="primary"
            disabled={!loggedIn}
            route={RouteConfig.createBook}
            symbol="plus-square-regular"
          >
            Create New Book
          </RoutedIconButton>
        </div>
        <Table
          striped={true}
          responsive={true}
        >
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Publication Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {booksCollection.content.map(bookRowRenderer)}
          </tbody>
        </Table>
      </div>
    );
  }

  private bookRowRenderer = (book: IBookDTO) => (
    <BookRowRenderer 
      book={book}
      key={book.id}
    />
  )

  private onSearchTextChange = (text: string) => {
    this.props.searchBooks(text);
  }
}