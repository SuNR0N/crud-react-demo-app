import React, { Component } from 'react';
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
  AuthorActionTypes,
  IAction,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import {
  IAuthorDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import {
  ActionBar,
  ConfirmationModal,
  RoutedButton,
} from '../../../common';

export interface IDispatchProps {
  deleteAuthor: (author: IAuthorDTO, link: IHATEOASLink, route?: string) => IAction<AuthorActionTypes.DELETE_AUTHOR_REQUEST>;
  loadAuthor: (id: number) => IAction<AuthorActionTypes.LOAD_AUTHOR_REQUEST>;
}

export interface IRouteProps {
  id: number
}

export interface IStateProps {
  author: IAuthorDTO;
}

export interface IState {
  isModalOpen: boolean;
}

export interface IProps extends IDispatchProps, RouteComponentProps<IRouteProps>, IStateProps {}

export class ViewAuthorPage extends Component<IProps, IState> {
  public state: IState = {
    isModalOpen: false,
  };
  
  public componentDidMount() {
    this.props.loadAuthor(this.props.match.params.id);
  }

  public render() {
    const {
      closeModal,
      deleteAuthor,
      props: {
        author,
      },
      showConfirmationModal,
      state: {
        isModalOpen,
      },
    } = this;

    return (
      <div className="container-fluid">
        <h2>View Author</h2>
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
        <ActionBar>
          {author._links && author._links.update &&
            <RoutedButton
              color="outline-secondary"
              route={RouteConfig.editAuthor.replace(':id', String(author.id))}
            >
              Edit
            </RoutedButton>
          }
          {author._links && author._links.delete &&
            <Button
              color="outline-danger"
              onClick={showConfirmationModal}
            >
              Delete
            </Button>
          }
        </ActionBar>
        <ConfirmationModal
          htmlContent={`Are you sure you want to delete <strong>${author.fullName}</strong> <i>(ID: ${author.id})</i> ?`}
          onConfirm={deleteAuthor}
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

  private deleteAuthor = () => {
    if (this.props.author._links.delete) {
      this.props.deleteAuthor(this.props.author, this.props.author._links.delete, RouteConfig.authors);
    }
    this.closeModal();
  }

  private showConfirmationModal = () => {
    this.setState({
      isModalOpen: true,
    });
  }
}