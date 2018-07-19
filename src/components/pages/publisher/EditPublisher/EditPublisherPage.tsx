import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import {
  IAction,
  PublisherActionTypes,
} from '../../../../actions';
import {
  IHATEOASLink,
  INewPublisherDTO,
  IPublisherDTO,
} from '../../../../interfaces';
import { ActionBar } from '../../../common/ActionBar';
import {
  EditPublisherForm,
  IFormData,
} from '../../../publisher/EditPublisherForm';

export interface IDispatchProps {
  loadPublisher: (id: number) => IAction<PublisherActionTypes.LOAD_PUBLISHER_REQUEST>;
  savePublisher: (publisher: INewPublisherDTO, link: IHATEOASLink) => IAction<PublisherActionTypes.UPDATE_PUBLISHER_REQUEST>;
  submitForm: () => FormAction;
}

export interface IRouteProps {
  id: string;
}

export interface IStateProps {
  currentPublisher: IPublisherDTO;
  initialFormData: Partial<IFormData>;
  isFormValid: boolean;
}

export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps<IRouteProps> { }

export class EditPublisherPage extends React.Component<IProps> {
  public componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    if (this.props.currentPublisher.id !== id) {
      this.props.loadPublisher(id);
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
      savePublisher,
    } = this;

    return (
      <div className="container-fluid">
        <h2>Edit Publisher</h2>
        <EditPublisherForm
          initialValues={initialFormData}
          onSubmit={savePublisher}
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

  private savePublisher = (values: IFormData) => {
    const publisher: INewPublisherDTO = {
      name: values.name,
    }
    this.props.savePublisher(publisher, this.props.currentPublisher._links.update!);
  }
}