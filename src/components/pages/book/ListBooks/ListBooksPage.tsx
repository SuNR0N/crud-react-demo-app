import * as React from 'react';
import { Table } from 'reactstrap';

import {
  BookActionTypes,
  IAction,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import {
  IBookDTO,
  IHATEOASLink,
  IPageableCollectionDTO,
} from '../../../../interfaces';
import { BookRowRenderer } from '../../../book/BookRowRenderer';
import {
  ConfirmationModal,
  Pagination,
  RoutedButton,
  SearchField,
} from '../../../common';

export interface IDispatchProps {
  deleteBook: (book: IBookDTO, link: IHATEOASLink, route?: string) => IAction<BookActionTypes.DELETE_BOOK_REQUEST>;
  paginateBooks: (link: IHATEOASLink) => IAction<BookActionTypes.PAGINATE_BOOKS_REQUEST>;
  searchBooks: (query?: string) => IAction<BookActionTypes.LOAD_BOOKS_REQUEST>;
}

export interface IStateProps {
  loggedIn: boolean;
  booksCollection: IPageableCollectionDTO<IBookDTO>; 
}

export interface IState {
  isModalOpen: boolean;
  selectedBook: IBookDTO | null;
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListBooksPage extends React.Component<IProps, IState> {
  public state: IState = {
    isModalOpen: false,
    selectedBook: null,
  };
  
  public componentDidMount() {
    this.props.searchBooks();
  }

  public render() {
    const {
      bookRowRenderer,
      closeModal,
      deleteBook,
      onPaginate,
      onSearchTextChange,
      props: {
        booksCollection,
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
              placeholder="Search books..."
            />
          </div>
          <RoutedButton
            color="primary"
            disabled={!loggedIn}
            route={RouteConfig.createBook}
            symbol="plus-square-regular"
          >
            Create New Book
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
              <th className="col-3">Title</th>
              <th className="col-2">Category</th>
              <th className="col-2">Author</th>
              <th className="col-1">Publisher</th>
              <th className="col-1">Publication Date</th>
              <th className="col-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {booksCollection.content.map(bookRowRenderer)}
          </tbody>
        </Table>
        <Pagination
          onPaginate={onPaginate}
          pageableCollection={booksCollection}
        />
        <ConfirmationModal
          htmlContent={
            this.state.selectedBook ?
            `Are you sure you want to delete <strong>${this.state.selectedBook.title}</strong> <i>(ID: ${this.state.selectedBook.id})</i> ?` :
            undefined
          }
          onConfirm={deleteBook}
          isOpen={isModalOpen}
          toggle={closeModal}
        />
      </div>
    );
  }

  private bookRowRenderer = (book: IBookDTO) => (
    <BookRowRenderer 
      book={book}
      key={book.id}
      onDelete={this.showConfirmationModal}
    />
  )

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedBook: null,
    });
  }

  private deleteBook = () => {
    if (this.state.selectedBook && this.state.selectedBook._links.delete) {
      this.props.deleteBook(this.state.selectedBook, this.state.selectedBook._links.delete);
    }
    this.closeModal();
  }

  private onPaginate = (link: IHATEOASLink) => {
    this.props.paginateBooks(link);
  }

  private onSearchTextChange = (text: string) => {
    this.props.searchBooks(text);
  }

  private showConfirmationModal = (book: IBookDTO) => {
    this.setState({
      isModalOpen: true,
      selectedBook: book,
    });
  }
}