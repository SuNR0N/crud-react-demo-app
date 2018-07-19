import * as React from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import {
  Field,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';

import { EDIT_BOOK_FORM } from '../../../constants';
import { validate } from '../../../validators/BookForms';
import {
  ReadOnlyField,
  TextField,
} from '../../common';
import { IFormData as CreateBookFormData } from '../CreateBookForm';

export enum FormDataNames {
  authors = 'authors',
  categories = 'categories',
  id = 'id',
  isbn10 = 'isbn10',
  isbn13 = 'isbn13',
  publicationDate = 'publicationDate',
  publishers = 'publishers',
  title = 'title',
}

export interface IFormData extends CreateBookFormData {
  id: number;
}

export interface IProps extends IFormData, InjectedFormProps<IFormData> {}

const EditBookFormComponent: React.SFC<IProps> = (props) => {
  const { handleSubmit } = props;
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.id}
          sm={2}
        >
          ID
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.id}
            name={FormDataNames.id}
            component={ReadOnlyField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.title}
          sm={2}
        >
          Title
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.title}
            name={FormDataNames.title}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.categories}
          sm={2}
        >
          Categories
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.categories}
            name={FormDataNames.categories}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.authors}
          sm={2}
        >
          Authors
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.authors}
            name={FormDataNames.authors}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.isbn10}
          sm={2}
        >
          ISBN-10
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.isbn10}
            name={FormDataNames.isbn10}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.isbn13}
          sm={2}
        >
          ISBN-13
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.isbn13}
            name={FormDataNames.isbn13}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.publicationDate}
          sm={2}
        >
          Publication Date
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.publicationDate}
            name={FormDataNames.publicationDate}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.publishers}
          sm={2}
        >
          Publishers
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.publishers}
            name={FormDataNames.publishers}
            component={TextField}
          />
        </Col>
      </FormGroup>
    </Form>
  );
}

export const EditBookForm = reduxForm<IFormData>({
  enableReinitialize: true,
  form: EDIT_BOOK_FORM,
  validate,
})(EditBookFormComponent);