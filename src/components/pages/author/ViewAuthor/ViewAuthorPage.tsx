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
import { ActionTypes } from '../../../../actions/AuthorActions';
import { IAuthorDTO } from '../../../../interfaces/dtos/AuthorDTO';

export interface IDispatchProps {
  loadAuthor: (id: number) => IAction<ActionTypes.LOAD_AUTHOR_REQUEST>;
}

export interface IRouteProps {
  id: number
}

export interface IStateProps {
  author: IAuthorDTO;
}

export interface IProps extends IDispatchProps, RouteComponentProps<IRouteProps>, IStateProps {}

export class ViewAuthorPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.loadAuthor(this.props.match.params.id);
  }

  public render() {
    const {
      props: {
        author,
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
              {author.id}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          <Label
            id="labelFirstName"
            for="firstName"
            sm={2}
          >
            First Name
          </Label>
          <Col sm={10}>
            <Input
              aria-labelledby="labelFirstName"
              id="firstName"
              plaintext={true}
            >
              {author.firstName}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          <Label
            id="labelMiddleName"
            for="middleName"
            sm={2}
          >
            Middle Name
          </Label>
          <Col sm={10}>
            <Input
              aria-labelledby="labelMiddleName"
              id="middleName"
              plaintext={true}
            >
              {author.middleName}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row={true}>
          <Label
            id="labelLastName"
            for="lastName"
            sm={2}
          >
            Last Name
          </Label>
          <Col sm={10}>
            <Input
              aria-labelledby="labelLastName"
              id="lastName"
              plaintext={true}
            >
              {author.lastName}
            </Input>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}