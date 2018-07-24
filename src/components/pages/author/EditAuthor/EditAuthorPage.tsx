import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import {
  AuthorActionTypes,
  IAction,
} from '../../../../actions';
import {
  IAuthorDTO,
  IAuthorUpdateDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import {
  EditAuthorForm,
  IFormData,
} from '../../../author/EditAuthorForm';
import { ActionBar } from '../../../common/ActionBar';

export interface IDispatchProps {
  loadAuthor: (id: number) => IAction<AuthorActionTypes.LOAD_AUTHOR_REQUEST>;
  saveAuthor: (author: IAuthorUpdateDTO, id: number, link: IHATEOASLink) => IAction<AuthorActionTypes.UPDATE_AUTHOR_REQUEST>;
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
        <ActionBar>
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
        </ActionBar>
      </div>
    );
  }

  private navigateBack = () => {
    this.props.history.goBack();
  }

  private saveAuthor = (values: IFormData) => {
    const author: IAuthorUpdateDTO = {
      ...(
        this.props.initialFormData.firstName !== values.firstName ?
        { firstName: values.firstName } :
        {}
      ),
      ...(
        this.props.initialFormData.lastName !== values.lastName ?
        { lastName: values.lastName } :
        {}
      ),
      ...(
        this.props.initialFormData.middleName !== values.middleName ?
        { middleName: values.middleName } :
        {}
      ),
    }
    this.props.saveAuthor(author, this.props.currentAuthor.id, this.props.currentAuthor._links.update!);
  }
}