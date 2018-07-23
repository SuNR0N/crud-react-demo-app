import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import {
  BookActionTypes,
  IAction,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import { INewBookDTO } from '../../../../interfaces/dtos/NewBookDTO';
import {
  CreateBookForm,
  IFormData,
} from '../../../book/CreateBookForm';
import { ActionBar } from '../../../common/ActionBar';

export interface IDispatchProps {
  saveBook: (book: INewBookDTO) => IAction<BookActionTypes.CREATE_BOOK_REQUEST>;
  submitForm: () => FormAction;
}

export interface IStateProps {
  isFormValid: boolean;
}

export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps<any> { }

export class CreateBookPage extends React.Component<IProps> {
  public render() {
    const {
      navigateToListBooks,
      props: {
        isFormValid,
        submitForm,
      },
      saveBook,
    } = this;

    return (
     <div className="container-fluid">
       <h2>Create New Book</h2>
       <CreateBookForm onSubmit={saveBook}/>
       <ActionBar>
         <Button
           color="outline-secondary"
           onClick={navigateToListBooks}
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

  private navigateToListBooks = () => {
    this.props.history.push(RouteConfig.books);
  }

  private saveBook = (values: IFormData) => {
    const book: INewBookDTO = {
      authors: values.authors,
      categories: values.authors,
      isbn10: values.isbn10,
      isbn13: values.isbn13,
      publicationDate: values.publicationDate,
      publishers: values.publishers,
      title: values.title,
    };
    this.props.saveBook(book);
  }
}