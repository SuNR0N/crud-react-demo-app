import React, { Component } from 'react';
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
  Spinner,
} from '../../../common';

export interface IDispatchProps {
  deleteBook: (book: IBookDTO, link: IHATEOASLink, route?: string) => IAction<BookActionTypes.DELETE_BOOK_REQUEST>;
  paginateBooks: (link: IHATEOASLink) => IAction<BookActionTypes.PAGINATE_BOOKS_REQUEST>;
  searchBooks: (query?: string) => IAction<BookActionTypes.LOAD_BOOKS_REQUEST>;
}

export interface IStateProps {
  booksCollection: IPageableCollectionDTO<IBookDTO>; 
  isLoading: boolean;
  loggedIn: boolean;
}

export interface IState {
  isModalOpen: boolean;
  selectedBook: IBookDTO | null;
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListBooksPage extends Component<IProps, IState> {
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
        isLoading,
        loggedIn,
      },
      state: {
        isModalOpen,
      },
    } = this;

    return (
      <div className="container-fluid">
        <div className="row flex-column-reverse flex-sm-row no-gutters my-3 d-flex align-items-center">
          <div className="col-sm-6">
            <SearchField
              onValueChange={onSearchTextChange}
              placeholder="Search books..."
            />
          </div>
          <div className="col-sm-6 d-flex justify-content-sm-end justify-content-center mb-3 mb-sm-0">
            <RoutedButton
              color="primary"
              disabled={!loggedIn}
              route={RouteConfig.createBook}
              symbol="plus-square-regular"
            >
              Create New Book
            </RoutedButton>
          </div>
        </div>
        {
          isLoading ?
          <Spinner/> :
          <Table
            borderless={true}
            striped={true}
            responsive={true}
          >
            <thead className="thead-dark">
              <tr className="d-flex">
                <th className="col-1">ID</th>
                <th className="col-lg-3 col-md-5 col-sm-8 col-7">Title</th>
                <th className="col-lg-2 col-md-3 d-none d-md-block">Category</th>
                <th className="col-lg-2 d-none d-lg-block">Author</th>
                <th className="col-xl-1 col-lg-2 d-none d-lg-block">Publisher</th>
                <th className="col-xl-1 d-none d-xl-block">Publication Date</th>
                <th className="col-lg-2 col-sm-3 col-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {booksCollection.content.map(bookRowRenderer)}
            </tbody>
          </Table>
        }
        <Pagination
          disabled={isLoading}
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