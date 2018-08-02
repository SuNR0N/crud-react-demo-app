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

import { EDIT_PUBLISHER_FORM } from '../../../constants';
import { validate } from '../../../validators/PublisherFormValidators';
import {
  ReadOnlyField,
  TextField,
} from '../../common';
import { IFormData as CreatePublisherFormData } from '../CreatePublisherForm';

export enum FormDataNames {
  id = 'id',
  name = 'name',
}

export interface IFormData extends CreatePublisherFormData {
  id: number;
}

export interface IProps extends IFormData, InjectedFormProps<IFormData> {}

const EditPublisherFormComponent: SFC<IProps> = (props) => {
  const { handleSubmit } = props;
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup row={true}>
        <Label
          for={FormDataNames.id}
          md={1}
          sm={2}
        >
          ID
        </Label>
        <Col
          md={11}
          sm={10}
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
          for={FormDataNames.name}
          md={1}
          sm={2}
        >
          Name
        </Label>
        <Col
          md={11}
          sm={10}
        >
          <Field
            id={FormDataNames.name}
            name={FormDataNames.name}
            component={TextField}
          />
        </Col>
      </FormGroup>
    </Form>
  );
};

export const EditPublisherForm = reduxForm<IFormData>({
  enableReinitialize: true,
  form: EDIT_PUBLISHER_FORM,
  validate,
})(EditPublisherFormComponent);