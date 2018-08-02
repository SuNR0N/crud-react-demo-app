import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isValid,
  submit,
} from 'redux-form';

import {
  AuthorActions,
  BookActions,
  CategoryActions,
  PublisherActions,
} from '../../../../actions';
import { EDIT_BOOK_FORM } from '../../../../constants/forms';
import {
  IBookUpdateDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers/RootState';
import {
  EditBookPage,
  IDispatchProps,
  IStateProps,
} from './EditBookPage';

export const mapStateToProps = (state: IRootState): IStateProps => ({
  authors: state.author.authors,
  categories: state.category.categories,
  currentBook: state.book.currentBook,
  initialFormData: {
    authors: state.author.authors
      .filter((author) => Array.isArray(state.book.currentBook.authors) &&
        state.book.currentBook.authors.indexOf(author.fullName) !== -1)
      .map((author) => author.id),
    categories: state.category.categories
      .filter((category) => Array.isArray(state.book.currentBook.categories) &&
        state.book.currentBook.categories.indexOf(category.name) !== -1)
      .map((category) => category.id),
    id: state.book.currentBook.id,
    isbn10: state.book.currentBook.isbn10,
    isbn13: state.book.currentBook.isbn13,
    publicationDate: state.book.currentBook.publicationDate,
    publishers: state.publisher.publishers
      .filter((publisher) => Array.isArray(state.book.currentBook.publishers) &&
        state.book.currentBook.publishers.indexOf(publisher.name) !== -1)
      .map((publisher) => publisher.id),
    title: state.book.currentBook.title,
  },
  isFormValid: isValid(EDIT_BOOK_FORM)(state),
  publishers: state.publisher.publishers,
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  loadAuthors: () => dispatch(AuthorActions.loadAuthors()),
  loadBook: (id: number) => dispatch(BookActions.loadBook(id)),
  loadCategories: () => dispatch(CategoryActions.loadCategories()),
  loadPublishers: () => dispatch(PublisherActions.loadPublishers()),
  saveBook: (book: IBookUpdateDTO, id: number, link: IHATEOASLink) => dispatch(BookActions.updateBook(book, id, link)),
  submitForm: () => dispatch(submit(EDIT_BOOK_FORM)),
});

export const EditBookPageConnected = connect(mapStateToProps, mapDispatchToProps)(EditBookPage);