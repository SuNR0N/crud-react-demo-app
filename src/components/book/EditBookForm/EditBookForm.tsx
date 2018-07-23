import { isMoment, Moment } from 'moment';
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
  WrappedFieldProps,
} from 'redux-form';

import {
  AuthorsApi,
  CategoriesApi,
  PublishersApi,
} from '../../../api';
import { DATE_FORMAT } from '../../../config';
import { EDIT_BOOK_FORM } from '../../../constants';
import {
  IAuthorDTO,
  ICategoryDTO,
  IPublisherDTO,
} from '../../../interfaces/dtos';
import { validate } from '../../../validators/BookForms';
import {
  DatePicker,
  Dropdown,
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

export interface IOwnProps {
  defaultAuthorOptions?: IAuthorDTO[];
  defaultCategoryOptions?: ICategoryDTO[];
  defaultPublisherOptions?: IPublisherDTO[];
}

export interface IProps extends IFormData, InjectedFormProps<IFormData>, IOwnProps {}

const dateNormalizer = (value: Moment) => isMoment(value) ? value.format(DATE_FORMAT) : null;

const optionListNormalizer = (options: Array<IAuthorDTO | ICategoryDTO | IPublisherDTO>) => {
  return (Array.isArray(options) && options.length > 0) ? options.map((option) => {
    return (typeof option === 'object') ? option.id : option;
  }) : [];
};

const renderAuthorsDropdown = ({ input, ...custom }: WrappedFieldProps) => {
  const getOptionLabel = (author: IAuthorDTO) => author.fullName;
  const getOptionValue = (author: IAuthorDTO) => author.id;
  const noOptionsMessage = () => 'No author found';
  const promiseOptions = (query?: string) => AuthorsApi.getAuthors(query);

  return (
    <Dropdown
      {...input}
      {...custom}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      noOptionsMessage={noOptionsMessage}
      promiseOptions={promiseOptions}
    />
  );
}

const renderCategoriesDropdown = ({ input, ...custom }: WrappedFieldProps) => {
  const getOptionLabel = (category: ICategoryDTO) => category.name;
  const getOptionValue = (category: ICategoryDTO) => category.id;
  const noOptionsMessage = () => 'No category found';
  const promiseOptions = (query?: string) => CategoriesApi.getCategories(query);

  return (
    <Dropdown
      {...input}
      {...custom}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      noOptionsMessage={noOptionsMessage}
      promiseOptions={promiseOptions}
    />
  );
}

const renderDatePicker = ({ input }: WrappedFieldProps) => (
  <DatePicker {...input}/>
);

const renderPublishersDropdown = ({ input, ...custom }: WrappedFieldProps) => {
  const getOptionLabel = (publisher: IPublisherDTO) => publisher.name;
  const getOptionValue = (publisher: IPublisherDTO) => publisher.id;
  const noOptionsMessage = () => 'No publisher found';
  const promiseOptions = (query?: string) => PublishersApi.getPublishers(query);

  return (
    <Dropdown
      {...input}
      {...custom}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      noOptionsMessage={noOptionsMessage}
      promiseOptions={promiseOptions}
    />
  );
}

const EditBookFormComponent: React.SFC<IProps> = (props) => {
  const {
    defaultAuthorOptions,
    defaultCategoryOptions,
    defaultPublisherOptions,
    handleSubmit,
  } = props;
  
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
          className="required"
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
            component={renderCategoriesDropdown}
            normalize={optionListNormalizer}
            {...{
              defaultOptions: defaultCategoryOptions,
            }}
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
            component={renderAuthorsDropdown}
            normalize={optionListNormalizer}
            {...{
              defaultOptions: defaultAuthorOptions,
            }}
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
          className="required"
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
            component={renderDatePicker}
            normalize={dateNormalizer}
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
            component={renderPublishersDropdown}
            normalize={optionListNormalizer}
            {...{
              defaultOptions: defaultPublisherOptions,
            }}
          />
        </Col>
      </FormGroup>
    </Form>
  );
}

export const EditBookForm = reduxForm<IFormData, IOwnProps>({
  enableReinitialize: true,
  form: EDIT_BOOK_FORM,
  validate,
})(EditBookFormComponent);