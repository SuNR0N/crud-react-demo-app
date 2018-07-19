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

import { CREATE_PUBLISHER_FORM } from '../../../constants';
import { validate } from '../../../validators/PublisherForms';
import { TextField } from '../../common/TextField';

export enum FormDataNames {
  name = 'name',
}

export interface IFormData {
  name: string;
}

export interface IProps extends IFormData, InjectedFormProps<IFormData> {}

const CreatePublisherFormComponent: React.SFC<IProps> = (props) => {
  const { handleSubmit } = props;
  
  return (
    <Form onSubmit={handleSubmit}>
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

export const CreatePublisherForm = reduxForm<IFormData>({
  form: CREATE_PUBLISHER_FORM,
  validate,
})(CreatePublisherFormComponent);