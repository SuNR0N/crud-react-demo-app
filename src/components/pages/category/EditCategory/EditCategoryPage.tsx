import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import {
  CategoryActionTypes,
  IAction,
} from '../../../../actions';
import {
  ICategoryDTO,
  IHATEOASLink,
  INewCategoryDTO,
} from '../../../../interfaces';
import {
  EditCategoryForm,
  IFormData,
} from '../../../category/EditCategoryForm';
import { ActionBar } from '../../../common/ActionBar';

export interface IDispatchProps {
  loadCategory: (id: number) => IAction<CategoryActionTypes.LOAD_CATEGORY_REQUEST>;
  saveCategory: (category: INewCategoryDTO, id: number, link: IHATEOASLink) => IAction<CategoryActionTypes.UPDATE_CATEGORY_REQUEST>;
  submitForm: () => FormAction;
}

export interface IRouteProps {
  id: string;
}

export interface IStateProps {
  currentCategory: ICategoryDTO;
  initialFormData: Partial<IFormData>;
  isFormValid: boolean;
}

export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps<IRouteProps> { }

export class EditCategoryPage extends Component<IProps> {
  public componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    if (this.props.currentCategory.id !== id) {
      this.props.loadCategory(id);
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
      saveCategory,
    } = this;

    return (
      <div className="container-fluid">
        <h2>Edit Category</h2>
        <EditCategoryForm
          initialValues={initialFormData}
          onSubmit={saveCategory}
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

  private saveCategory = (values: IFormData) => {
    const category: INewCategoryDTO = {
      name: values.name,
    }
    this.props.saveCategory(category, this.props.currentCategory.id, this.props.currentCategory._links.update!);
  }
}