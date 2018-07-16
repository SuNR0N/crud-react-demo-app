import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import { IAction } from '../../../../actions/ActionHelpers';
import { ActionTypes } from '../../../../actions/CategoryActions';
import { ICategoryDTO } from '../../../../interfaces/dtos/CategoryDTO';

export interface IDispatchProps {
  loadCategory: (id: number) => IAction<ActionTypes.LOAD_CATEGORY_REQUEST>;
}

export interface IRouteProps {
  id: number
}

export interface IStateProps {
  category: ICategoryDTO;
}

export interface IProps extends IDispatchProps, RouteComponentProps<IRouteProps>, IStateProps {}

export class ViewCategoryPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.loadCategory(this.props.match.params.id);
  }

  public render() {
    const {
      props: {
        category,
      },
    } = this;

    return (
      <Form>
        <FormGroup row={true}>
          <Label
            id="labelId"
            for="id"
            sm={2}
          >
            ID
          </Label>
          <Col sm={10}>
            <Input
              aria-labelledby="labelId"
              id="id"
              plaintext={true}
            >
              {category.id}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          <Label
            id="labelName"
            for="name"
            sm={2}
          >
            Name
          </Label>
          <Col sm={10}>
            <Input
              aria-labelledby="labelName"
              id="name"
              plaintext={true}
            >
              {category.name}
            </Input>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}