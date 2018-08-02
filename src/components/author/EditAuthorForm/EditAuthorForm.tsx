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
} from 'redux-form';

import { EDIT_AUTHOR_FORM } from '../../../constants';
import { validate } from '../../../validators/AuthorFormValidators';
import {
  ReadOnlyField,
  TextField,
} from '../../common';
import { IFormData as CreateAuthorFormData } from '../CreateAuthorForm';

export enum FormDataNames {
  firstName = 'firstName',
  id = 'id',
  lastName = 'lastName',
  middleName = 'middleName',
}

export interface IFormData extends CreateAuthorFormData {
  id: number;
}

export interface IProps extends IFormData, InjectedFormProps<IFormData> {}

const EditAuthorFormComponent: SFC<IProps> = (props) => {
  const { handleSubmit } = props;
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.id}
          md={2}
          sm={3}
        >
          ID
        </Label>
        <Col
          md={10}
          sm={9}
        >
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
          for={FormDataNames.firstName}
          md={2}
          sm={3}
        >
          First Name
        </Label>
        <Col
          md={10}
          sm={9}
        >
          <Field
            id={FormDataNames.firstName}
            name={FormDataNames.firstName}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.middleName}
          md={2}
          sm={3}
        >
          Middle Name
        </Label>
        <Col
          md={10}
          sm={9}
        >
          <Field
            id={FormDataNames.middleName}
            name={FormDataNames.middleName}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          className="required"
          for={FormDataNames.lastName}
          md={2}
          sm={3}
        >
          Last Name
        </Label>
        <Col
          md={10}
          sm={9}
        >
          <Field
            id={FormDataNames.lastName}
            name={FormDataNames.lastName}
            component={TextField}
          />
        </Col>
      </FormGroup>
    </Form>
  );
};

export const EditAuthorForm = reduxForm<IFormData>({
  enableReinitialize: true,
  form: EDIT_AUTHOR_FORM,
  validate,
})(EditAuthorFormComponent);