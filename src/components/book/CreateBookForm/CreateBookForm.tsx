import React, { SFC } from 'react';
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
  WrappedFieldProps,
} from 'redux-form';

import {
  AuthorsApi,
  CategoriesApi,
  PublishersApi,
} from '../../../api';
import { CREATE_BOOK_FORM } from '../../../constants';
import {
  IAuthorDTO,
  ICategoryDTO,
  IPublisherDTO,
} from '../../../interfaces';
import { validate } from '../../../validators/BookFormValidators';
import {
  DatePicker,
  Dropdown,
  TextField,
} from '../../common';

export enum FormDataNames {
  authors = 'authors',
  categories = 'categories',
  isbn10 = 'isbn10',
  isbn13 = 'isbn13',
  publicationDate = 'publicationDate',
  publishers = 'publishers',
  title = 'title',
}

export interface IFormData {
  authors?: number[];
  categories?: number[];
  isbn10?: string;
  isbn13: string;
  publicationDate?: string;
  publishers?: number[];
  title: string;
}

export interface IProps extends IFormData, InjectedFormProps<IFormData> {}

const optionListNormalizer = (options: Array<IAuthorDTO | ICategoryDTO | IPublisherDTO>) => {
  return (Array.isArray(options) && options.length > 0) ? options.map((option) => {
    return (typeof option === 'object') ? option.id : option;
  }) : [];
};

const renderAuthorsDropdown = ({ input, meta, ...custom }: WrappedFieldProps) => {
  const getOptionLabel = (author: IAuthorDTO) => author.fullName;
  const getOptionValue = (author: IAuthorDTO) => author.id;
  const noOptionsMessage = () => 'No author found';
  const promiseOptions = (query?: string) => AuthorsApi.getAuthors(query);

  return (
    <Dropdown
      {...input}
      {...meta}
      {...custom}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      noOptionsMessage={noOptionsMessage}
      promiseOptions={promiseOptions}
    />
  );
};

const renderCategoriesDropdown = ({ input, meta, ...custom }: WrappedFieldProps) => {
  const getOptionLabel = (category: ICategoryDTO) => category.name;
  const getOptionValue = (category: ICategoryDTO) => category.id;
  const noOptionsMessage = () => 'No category found';
  const promiseOptions = (query?: string) => CategoriesApi.getCategories(query);

  return (
    <Dropdown
      {...input}
      {...meta}
      {...custom}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      noOptionsMessage={noOptionsMessage}
      promiseOptions={promiseOptions}
    />
  );
};

const renderDatePicker = ({ input, meta, ...custom }: WrappedFieldProps) => (
  <DatePicker
    {...input}
    {...meta}
    {...custom}
  />
);

const renderPublishersDropdown = ({ input, meta, ...custom }: WrappedFieldProps) => {
  const getOptionLabel = (publisher: IPublisherDTO) => publisher.name;
  const getOptionValue = (publisher: IPublisherDTO) => publisher.id;
  const noOptionsMessage = () => 'No publisher found';
  const promiseOptions = (query?: string) => PublishersApi.getPublishers(query);

  return (
    <Dropdown
      {...input}
      {...meta}
      {...custom}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      noOptionsMessage={noOptionsMessage}
      promiseOptions={promiseOptions}
    />
  );
};

const CreateBookFormComponent: SFC<IProps> = (props) => {
  const { handleSubmit } = props;
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row={true}>
        <Label
          className="required"
          for={FormDataNames.title}
          lg={2}
          md={3}
          sm={4}
        >
          Title
        </Label>
        <Col
          lg={10}
          md={9}
          sm={8}
        >
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
          lg={2}
          md={3}
          sm={4}
        >
          Categories
        </Label>
        <Col
          lg={10}
          md={9}
          sm={8}
        >
          <Field
            id={FormDataNames.categories}
            name={FormDataNames.categories}
            component={renderCategoriesDropdown}
            normalize={optionListNormalizer}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.authors}
          lg={2}
          md={3}
          sm={4}
        >
          Authors
        </Label>
        <Col
          lg={10}
          md={9}
          sm={8}
        >
          <Field
            id={FormDataNames.authors}
            name={FormDataNames.authors}
            component={renderAuthorsDropdown}
            normalize={optionListNormalizer}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.isbn10}
          lg={2}
          md={3}
          sm={4}
        >
          ISBN-10
        </Label>
        <Col
          lg={10}
          md={9}
          sm={8}
        >
          <Field
            id={FormDataNames.isbn10}
            name={FormDataNames.isbn10}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          className="required"
          for={FormDataNames.isbn13}
          lg={2}
          md={3}
          sm={4}
        >
          ISBN-13
        </Label>
        <Col
          lg={10}
          md={9}
          sm={8}
        >
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
          lg={2}
          md={3}
          sm={4}
        >
          Publication Date
        </Label>
        <Col
          lg={10}
          md={9}
          sm={8}
        >
          <Field
            id={FormDataNames.publicationDate}
            name={FormDataNames.publicationDate}
            component={renderDatePicker}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.publishers}
          lg={2}
          md={3}
          sm={4}
        >
          Publishers
        </Label>
        <Col
          lg={10}
          md={9}
          sm={8}
        >
          <Field
            id={FormDataNames.publishers}
            name={FormDataNames.publishers}
            component={renderPublishersDropdown}
            normalize={optionListNormalizer}
          />
        </Col>
      </FormGroup>
    </Form>
  );
};

export const CreateBookForm = reduxForm<IFormData>({
  form: CREATE_BOOK_FORM,
  validate,
})(CreateBookFormComponent);