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
import { ActionTypes } from '../../../../actions/PublisherActions';
import { IPublisherDTO } from '../../../../interfaces/dtos/PublisherDTO';

export interface IDispatchProps {
  loadPublisher: (id: number) => IAction<ActionTypes.LOAD_PUBLISHER_REQUEST>;
}

export interface IRouteProps {
  id: number
}

export interface IStateProps {
  publisher: IPublisherDTO;
}

export interface IProps extends IDispatchProps, RouteComponentProps<IRouteProps>, IStateProps {}

export class ViewPublisherPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.loadPublisher(this.props.match.params.id);
  }

  public render() {
    const {
      props: {
        publisher,
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
              {publisher.id}
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
              {publisher.name}
            </Input>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}