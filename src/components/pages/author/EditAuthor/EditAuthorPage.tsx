import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import { IAction } from '../../../../actions/ActionHelpers';
import { ActionTypes } from '../../../../actions/AuthorActions';
import {
  IAuthorDTO,
  IAuthorUpdateDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import {
  EditAuthorForm,
  IFormData,
} from '../../../author/EditAuthorForm';

export interface IDispatchProps {
  loadAuthor: (id: number) => IAction<ActionTypes.LOAD_AUTHOR_REQUEST>;
  saveAuthor: (author: IAuthorUpdateDTO, link: IHATEOASLink) => IAction<ActionTypes.UPDATE_AUTHOR_REQUEST>;
  submitForm: () => FormAction;
}

export interface IRouteProps {
  id: string;
}

export interface IStateProps {
  currentAuthor: IAuthorDTO;
  initialFormData: Partial<IFormData>;
  isFormValid: boolean;
}

export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps<IRouteProps> { }

export class EditAuthorPage extends React.Component<IProps> {
  public componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    if (this.props.currentAuthor.id !== id) {
      this.props.loadAuthor(id);
    }
  }

  public render() {
    const {
      navigateBack,
      props: {
        initialFormData,
        isFormValid,
        submitForm,
      },
      saveAuthor,
    } = this;

    return (
      <div className="container-fluid">
        <h2>Edit Author</h2>
        <EditAuthorForm
          initialValues={initialFormData}
          onSubmit={saveAuthor}
        />
        <div className="d-flex justify-content-center">
          <Button
            color="outline-secondary"
            onClick={navigateBack}
          >
            Cancel
          </Button>
          <Button
            color="outline-success"
            onClick={submitForm}
            disabled={!isFormValid}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }

  private navigateBack = () => {
    this.props.history.goBack();
  }

  private saveAuthor = (values: IFormData) => {
    const author: IAuthorUpdateDTO = {
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
    }
    this.props.saveAuthor(author, this.props.currentAuthor._links.update!);
  }
}