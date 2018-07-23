import * as React from 'react';
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
  saveBook: (book: IBookUpdateDTO, link: IHATEOASLink) => IAction<BookActionTypes.UPDATE_BOOK_REQUEST>;
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

export class EditBookPage extends React.Component<IProps> {
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
      authors: values.authors,
      categories: values.authors,
      isbn10: values.isbn10,
      isbn13: values.isbn13,
      publicationDate: values.publicationDate,
      publishers: values.publishers,
      title: values.title,
    }
    this.props.saveBook(book, this.props.currentBook._links.update!);
  }
}