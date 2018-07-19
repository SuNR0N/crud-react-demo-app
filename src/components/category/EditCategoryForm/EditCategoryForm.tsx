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

import { EDIT_CATEGORY_FORM } from '../../../constants';
import { validate } from '../../../validators/CategoryForms';
import {
  ReadOnlyField,
  TextField,
} from '../../common';
import { IFormData as CreateCategoryFormData } from '../CreateCategoryForm';

export enum FormDataNames {
  id = 'id',
  name = 'name',
}

export interface IFormData extends CreateCategoryFormData {
  id: number;
}

export interface IProps extends IFormData, InjectedFormProps<IFormData> {}

const EditCategoryFormComponent: React.SFC<IProps> = (props) => {
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
          for={FormDataNames.name}
          sm={2}
        >
          Name
        </Label>
        <Col sm={10}>
          <Field
            id={FormDataNames.name}
            name={FormDataNames.name}
            component={TextField}
          />
        </Col>
      </FormGroup>
    </Form>
  );
}

export const EditCategoryForm = reduxForm<IFormData>({
  enableReinitialize: true,
  form: EDIT_CATEGORY_FORM,
  validate,
})(EditCategoryFormComponent);