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

import { CREATE_AUTHOR_FORM } from '../../../constants';
import { validate } from '../../../validators/AuthorForms';
import { TextField } from '../../common/TextField';

export enum FormDataNames {
  firstName = 'firstName',
  lastName = 'lastName',
  middleName = 'middleName',
}

export interface IFormData {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface IProps extends IFormData, InjectedFormProps<IFormData> {}

const CreateAuthorFormComponent: React.SFC<IProps> = (props) => {
  const { handleSubmit } = props;
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row={true}>
        <Label
          className="required"
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
          className="required"
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

export const CreateAuthorForm = reduxForm<IFormData>({
  form: CREATE_AUTHOR_FORM,
  validate,
})(CreateAuthorFormComponent);