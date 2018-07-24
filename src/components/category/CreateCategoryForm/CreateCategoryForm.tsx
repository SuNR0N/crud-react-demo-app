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

import { CREATE_CATEGORY_FORM } from '../../../constants';
import { validate } from '../../../validators/CategoryFormValidators';
import { TextField } from '../../common/TextField';

export enum FormDataNames {
  name = 'name',
}

export interface IFormData {
  name: string;
}

export interface IProps extends IFormData, InjectedFormProps<IFormData> {}

const CreateCategoryFormComponent: React.SFC<IProps> = (props) => {
  const { handleSubmit } = props;
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row={true}>
        <Label
          className="required"
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

export const CreateCategoryForm = reduxForm<IFormData>({
  form: CREATE_CATEGORY_FORM,
  validate,
})(CreateCategoryFormComponent);