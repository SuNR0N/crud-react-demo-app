import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import {
  BookActionTypes,
  IAction,
} from '../../../../actions';
import {
  DATE_FORMAT,
  RouteConfig,
} from '../../../../config';
import {
  IBookDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import {
  ActionBar,
  ConfirmationModal,
  RoutedButton,
} from '../../../common';

export interface IDispatchProps {
  deleteBook: (book: IBookDTO, link: IHATEOASLink, route?: string) => IAction<BookActionTypes.DELETE_BOOK_REQUEST>;
  loadBook: (id: number) => IAction<BookActionTypes.LOAD_BOOK_REQUEST>;
}

export interface IRouteProps {
  id: number
}

export interface IStateProps {
  book: IBookDTO;
}

export interface IState {
  isModalOpen: boolean;
}

export interface IProps extends IDispatchProps, RouteComponentProps<IRouteProps>, IStateProps {}

export class ViewBookPage extends React.Component<IProps, IState> {
  public state: IState = {
    isModalOpen: false,
  };
  
  public componentDidMount() {
    this.props.loadBook(this.props.match.params.id);
  }

  public render() {
    const {
      closeModal,
      deleteBook,
      inputRowRenderer,
      props: {
        book,
      },
      showConfirmationModal,
      state: {
        isModalOpen,
      },
    } = this;

    return (
      <div className="container-fluid">
        <h2>View Book</h2>
        <Form>
          <FormGroup row={true}>
            <Label
              id="labelId"
              for="id"
              sm={2}
            >
              ID
            </Label>
            <Col sm={10}>
              <Input
                aria-labelledby="labelId"
                id="id"
                plaintext={true}
              >
                {book.id}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label
              id="labelTitle"
              for="title"
              sm={2}
            >
              Title
            </Label>
            <Col sm={10}>
              <Input
                aria-labelledby="labelTitle"
                id="title"
                plaintext={true}
              >
                {book.title}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label
              id="labelCategories"
              sm={2}
            >
              Categories
            </Label>
            <Col sm={10}>
              {
                Array.isArray(book.categories) &&
                book.categories.map(inputRowRenderer('labelCategories'))
              }
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label
              id="labelAuthors"
              sm={2}
            >
              Authors
            </Label>
            <Col sm={10}>
              {
                Array.isArray(book.authors) &&
                book.authors.map(inputRowRenderer('labelAuthors'))
              }
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label
              id="labelIsbn10"
              for="isbn10"
              sm={2}
            >
              ISBN-10
            </Label>
            <Col sm={10}>
              <Input
                aria-labelledby="labelIsbn10"
                id="isbn10"
                plaintext={true}
              >
                {book.isbn10}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label
              id="labelIsbn13"
              for="isbn13"
              sm={2}
            >
              ISBN-13
            </Label>
            <Col sm={10}>
              <Input
                aria-labelledby="labelIsbn13"
                id="isbn13"
                plaintext={true}
              >
                {book.isbn13}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label
              id="labelPublicationDate"
              for="publicationDate"
              sm={2}
            >
              Publication Date
            </Label>
            <Col sm={10}>
              <Input
                aria-labelledby="labelPublicationDate"
                id="publicationDate"
                plaintext={true}
              >
                {moment(book.publicationDate, 'YYYY-MM-DD').format(DATE_FORMAT)}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label
              id="labelPublishers"
              sm={2}
            >
              Publishers
            </Label>
            <Col sm={10}>
              {
                Array.isArray(book.publishers) &&
                book.publishers.map(inputRowRenderer('labelPublishers'))
              }
            </Col>
          </FormGroup>
        </Form>
        <ActionBar>
          {book._links && book._links.update &&
            <RoutedButton
              color="outline-secondary"
              route={RouteConfig.editBook.replace(':id', String(book.id))}
            >
              Edit
            </RoutedButton>
          }
          {book._links && book._links.delete &&
            <Button
              color="outline-danger"
              onClick={showConfirmationModal}
            >
              Delete
            </Button>
          }
        </ActionBar>
        <ConfirmationModal
          htmlContent={`Are you sure you want to delete <strong>${book.title}</strong> <i>(ID: ${book.id})</i> ?`}
          onConfirm={deleteBook}
          isOpen={isModalOpen}
          toggle={closeModal}
        />
      </div>
    )
  }

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  private deleteBook = () => {
    if (this.props.book._links.delete) {
      this.props.deleteBook(this.props.book, this.props.book._links.delete, RouteConfig.books);
    }
    this.closeModal();
  }

  private inputRowRenderer = (labelId: string) => (text: string, index: number) => (
    <Input
      aria-labelledby={labelId}
      key={index}
      plaintext={true}
    >
      {text}
    </Input>
  )

  private showConfirmationModal = () => {
    this.setState({
      isModalOpen: true,
    });
  }
}