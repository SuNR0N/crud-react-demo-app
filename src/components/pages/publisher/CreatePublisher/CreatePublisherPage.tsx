import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import {
  IAction,
  PublisherActionTypes,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import { INewPublisherDTO } from '../../../../interfaces/dtos/NewPublisherDTO';
import { ActionBar } from '../../../common/ActionBar';
import {
  CreatePublisherForm,
  IFormData,
} from '../../../publisher/CreatePublisherForm';

export interface IDispatchProps {
  savePublisher: (publisher: INewPublisherDTO) => IAction<PublisherActionTypes.CREATE_PUBLISHER_REQUEST>;
  submitForm: () => FormAction;
}

export interface IStateProps {
  isFormValid: boolean;
}

export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps<any> { }

export class CreatePublisherPage extends Component<IProps> {
  public render() {
    const {
      navigateToListPublishers,
      props: {
        isFormValid,
        submitForm,
      },
      savePublisher,
    } = this;

    return (
     <div className="container-fluid">
       <h2>Create New Publisher</h2>
       <CreatePublisherForm onSubmit={savePublisher}/>
       <ActionBar>
         <Button
           color="outline-secondary"
           onClick={navigateToListPublishers}
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

  private navigateToListPublishers = () => {
    this.props.history.push(RouteConfig.publishers);
  }

  private savePublisher = (values: IFormData) => {
    const publisher: INewPublisherDTO = {
      name: values.name,
    }
    this.props.savePublisher(publisher);
  }
}