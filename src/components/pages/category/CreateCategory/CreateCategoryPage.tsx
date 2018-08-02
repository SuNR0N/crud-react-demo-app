import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'reactstrap';
import { FormAction } from 'redux-form';

import {
  CategoryActionTypes,
  IAction,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import { INewCategoryDTO } from '../../../../interfaces/dtos/NewCategoryDTO';
import {
  CreateCategoryForm,
  IFormData,
} from '../../../category/CreateCategoryForm';
import { ActionBar } from '../../../common/ActionBar';

export interface IDispatchProps {
  saveCategory: (category: INewCategoryDTO) => IAction<CategoryActionTypes.CREATE_CATEGORY_REQUEST>;
  submitForm: () => FormAction;
}

export interface IStateProps {
  isFormValid: boolean;
}

export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps<any> { }

export class CreateCategoryPage extends Component<IProps> {
  public render() {
    const {
      navigateToListCategories,
      props: {
        isFormValid,
        submitForm,
      },
      saveCategory,
    } = this;

    return (
     <div className="container-fluid">
       <h2>Create New Category</h2>
       <CreateCategoryForm onSubmit={saveCategory}/>
       <ActionBar>
         <Button
           color="outline-secondary"
           onClick={navigateToListCategories}
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

  private navigateToListCategories = () => {
    this.props.history.push(RouteConfig.categories);
  }

  private saveCategory = (values: IFormData) => {
    const category: INewCategoryDTO = {
      name: values.name,
    };
    this.props.saveCategory(category);
  }
}