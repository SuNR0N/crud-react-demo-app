import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import { IAction } from '../../../../actions/ActionHelpers';
import { ActionTypes } from '../../../../actions/AuthorActions';
import { RouteConfig } from '../../../../config/RouteConfig';
import { INewAuthorDTO } from '../../../../interfaces/dtos/NewAuthorDTO';
import { CreateAuthorForm, IFormData } from '../../../author/CreateAuthorForm';

export interface IDispatchProps {
  saveAuthor: (author: INewAuthorDTO) => IAction<ActionTypes.CREATE_AUTHOR_REQUEST>;
  submitForm: () => FormAction;
}

export interface IStateProps {
  isFormValid: boolean;
}

export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps<any> { }

export class CreateAuthorPage extends React.Component<IProps> {
  public render() {
    const {
      navigateToListAuthors,
      props: {
        isFormValid,
        submitForm,
      },
      saveAuthor,
    } = this;

    return (
     <div className="container-fluid">
       <h2>Create New Author</h2>
       <CreateAuthorForm onSubmit={saveAuthor}/>
       <div className="d-flex justify-content-center">
         <Button
           color="outline-success"
           onClick={submitForm}
           disabled={!isFormValid}
         >
           Save
         </Button>
         <Button
           color="outline-secondary"
           onClick={navigateToListAuthors}
         >
           Cancel
         </Button>
       </div>
     </div>
   );
  }

  private navigateToListAuthors = () => {
    this.props.history.push(RouteConfig.authors);
  }

  private saveAuthor = (values: IFormData) => {
    const author: INewAuthorDTO = {
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
    }
    this.props.saveAuthor(author);
  }
}