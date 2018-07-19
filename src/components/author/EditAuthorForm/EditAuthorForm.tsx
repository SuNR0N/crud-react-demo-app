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

import { EDIT_AUTHOR_FORM } from '../../../constants';
import { validate } from '../../../validators/AuthorForms';
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

const EditAuthorFormComponent: React.SFC<IProps> = (props) => {
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
          for={FormDataNames.firstName}
          sm={2}
        >
          First Name
        </Label>
        <Col sm={10}>
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
          sm={2}
        >
          Middle Name
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.middleName}
            name={FormDataNames.middleName}
            component={TextField}
          />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.lastName}
          sm={2}
        >
          Last Name
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.lastName}
            name={FormDataNames.lastName}
            component={TextField}
          />
        </Col>
      </FormGroup>
    </Form>
  );
}

export const EditAuthorForm = reduxForm<IFormData>({
  enableReinitialize: true,
  form: EDIT_AUTHOR_FORM,
  validate,
})(EditAuthorFormComponent);