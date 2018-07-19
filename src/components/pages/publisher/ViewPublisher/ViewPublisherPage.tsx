import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import {
  IAction,
  PublisherActionTypes,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import {
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import {
  ActionBar,
  ConfirmationModal,
  RoutedButton,
} from '../../../common';

export interface IDispatchProps {
  deletePublisher: (publisher: IPublisherDTO, link: IHATEOASLink, route?: string) => IAction<PublisherActionTypes.DELETE_PUBLISHER_REQUEST>;
  loadPublisher: (id: number) => IAction<PublisherActionTypes.LOAD_PUBLISHER_REQUEST>;
}

export interface IRouteProps {
  id: number
}

export interface IStateProps {
  publisher: IPublisherDTO;
}

export interface IState {
  isModalOpen: boolean;
}

export interface IProps extends IDispatchProps, RouteComponentProps<IRouteProps>, IStateProps {}

export class ViewPublisherPage extends React.Component<IProps, IState> {
  public state: IState = {
    isModalOpen: false,
  };
  
  public componentDidMount() {
    this.props.loadPublisher(this.props.match.params.id);
  }

  public render() {
    const {
      closeModal,
      deletePublisher,
      props: {
        publisher,
      },
      showConfirmationModal,
      state: {
        isModalOpen,
      },
    } = this;

    return (
      <div className="container-fluid">
        <h2>View Publisher</h2>
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
        <ActionBar>
          {publisher._links && publisher._links.update &&
            <RoutedButton
              color="outline-secondary"
              route={RouteConfig.editPublisher.replace(':id', String(publisher.id))}
            >
              Edit
            </RoutedButton>
          }
          {publisher._links && publisher._links.delete &&
            <Button
              color="outline-danger"
              onClick={showConfirmationModal}
            >
              Delete
            </Button>
          }
        </ActionBar>
        <ConfirmationModal
          htmlContent={`Are you sure you want to delete <strong>${publisher.name}</strong> <i>(ID: ${publisher.id})</i> ?`}
          onConfirm={deletePublisher}
          isOpen={isModalOpen}
          toggle={closeModal}
        />
      </div>
    )
  }

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  private deletePublisher = () => {
    if (this.props.publisher._links.delete) {
      this.props.deletePublisher(this.props.publisher, this.props.publisher._links.delete, RouteConfig.publishers);
    }
    this.closeModal();
  }

  private showConfirmationModal = () => {
    this.setState({
      isModalOpen: true,
    });
  }
}