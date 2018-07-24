import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import {
  AuthorActionTypes,
  BookActionTypes,
  CategoryActionTypes,
  IAction,
  PublisherActionTypes,
} from '../../../../actions';
import {
  IAuthorDTO,
  IBookDTO,
  IBookUpdateDTO,
  ICategoryDTO,
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import {
  EditBookForm,
  IFormData,
} from '../../../book/EditBookForm';
import { ActionBar } from '../../../common/ActionBar';

export interface IDispatchProps {
  loadAuthors: () => IAction<AuthorActionTypes.LOAD_AUTHORS_REQUEST>;
  loadBook: (id: number) => IAction<BookActionTypes.LOAD_BOOK_REQUEST>;
  loadCategories: () => IAction<CategoryActionTypes.LOAD_CATEGORIES_REQUEST>;
  loadPublishers: () => IAction<PublisherActionTypes.LOAD_PUBLISHERS_REQUEST>;
  saveBook: (book: IBookUpdateDTO, id: number, link: IHATEOASLink) => IAction<BookActionTypes.UPDATE_BOOK_REQUEST>;
  submitForm: () => FormAction;
}

export interface IRouteProps {
  id: string;
}

export interface IStateProps {
  authors: IAuthorDTO[];
  categories: ICategoryDTO[];
  currentBook: IBookDTO;
  initialFormData: Partial<IFormData>;
  isFormValid: boolean;
  publishers: IPublisherDTO[];
}

export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps<IRouteProps> { }

export class EditBookPage extends Component<IProps> {
  public componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    if (this.props.currentBook.id !== id) {
      this.props.loadBook(id);
    }
    this.props.loadAuthors();
    this.props.loadCategories();
    this.props.loadPublishers();
  }

  public render() {
    const {
      navigateBack,
      props: {
        authors,
        categories,
        initialFormData,
        isFormValid,
        publishers,
        submitForm,
      },
      saveBook,
    } = this;

    return (
      <div className="container-fluid">
        <h2>Edit Book</h2>
        <EditBookForm
          defaultAuthorOptions={authors}
          defaultCategoryOptions={categories}
          defaultPublisherOptions={publishers}
          initialValues={initialFormData}
          onSubmit={saveBook}
        />
        <ActionBar>
          <Button
            color="outline-secondary"
            onClick={navigateBack}
          >
            Cancel
          </Button>
          <Button
            color="outline-success"
            onClick={submitForm}
            disabled={!isFormValid}
          >
            Save
          </Button>
        </ActionBar>
      </div>
    );
  }

  private navigateBack = () => {
    this.props.history.goBack();
  }

  private saveBook = (values: IFormData) => {
    const book: IBookUpdateDTO = {
      ...(
        JSON.stringify(this.props.initialFormData.authors) !== JSON.stringify(values.authors) ?
        { authors: values.authors } :
        {}
      ),
      ...(
        JSON.stringify(this.props.initialFormData.categories) !== JSON.stringify(values.categories) ?
        { categories: values.categories } :
        {}
      ),
      ...(
        this.props.initialFormData.isbn10 !== values.isbn10 ?
        { isbn10: values.isbn10 } :
        {}
      ),
      ...(
        this.props.initialFormData.isbn13 !== values.isbn13 ?
        { isbn13: values.isbn13 } :
        {}
      ),
      ...(
        this.props.initialFormData.publicationDate !== values.publicationDate ?
        { publicationDate: values.publicationDate } :
        {}
      ),
      ...(
        JSON.stringify(this.props.initialFormData.publishers) !== JSON.stringify(values.publishers) ?
        { publishers: values.publishers } :
        {}
      ),
      ...(
        this.props.initialFormData.title !== values.title ?
        { title: values.title } :
        {}
      ),
    }
    this.props.saveBook(book, this.props.currentBook.id, this.props.currentBook._links.update!);
  }
}