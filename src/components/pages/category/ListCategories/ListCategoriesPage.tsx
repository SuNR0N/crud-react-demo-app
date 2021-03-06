import React, { Component } from 'react';
import { Table } from 'reactstrap';

import {
  CategoryActionTypes,
  IAction,
} from '../../../../actions';
import { RouteConfig } from '../../../../config/RouteConfig';
import {
  ICategoryDTO,
  IHATEOASLink,
} from '../../../../interfaces';
import { CategoryRowRenderer } from '../../../category/CategoryRowRenderer';
import {
  ConfirmationModal,
  RoutedButton,
  SearchField,
  Spinner,
} from '../../../common';

export interface IDispatchProps {
  deleteCategory: (category: ICategoryDTO, link: IHATEOASLink, route?: string) => IAction<CategoryActionTypes.DELETE_CATEGORY_REQUEST>;
  searchCategories: (query?: string) => IAction<CategoryActionTypes.LOAD_CATEGORIES_REQUEST>;
}

export interface IStateProps {
  categories: ICategoryDTO[];
  isLoading: boolean;
  loggedIn: boolean;
}

export interface IState {
  isModalOpen: boolean;
  selectedCategory: ICategoryDTO | null;
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListCategoriesPage extends Component<IProps, IState> {
  public state: IState = {
    isModalOpen: false,
    selectedCategory: null,
  };
  
  public componentDidMount() {
    this.props.searchCategories();
  }

  public render() {
    const {
      categoryRowRenderer,
      closeModal,
      deleteCategory,
      onSearchTextChange,
      props: {
        categories,
        isLoading,
        loggedIn,
      },
      state: {
        isModalOpen,
      },
    } = this;

    return (
      <div className="container-fluid">
        <div className="row flex-column-reverse flex-sm-row no-gutters my-3 d-flex align-items-center">
          <div className="col-sm-6">
            <SearchField
              onValueChange={onSearchTextChange}
              placeholder="Search categories..."
            />
          </div>
          <div className="col-sm-6 d-flex justify-content-sm-end justify-content-center mb-3 mb-sm-0">
            <RoutedButton
              color="primary"
              disabled={!loggedIn}
              route={RouteConfig.createCategory}
              symbol="plus-square-regular"
            >
              Create New Category
            </RoutedButton>
          </div>
        </div>
        {
          isLoading ?
          <Spinner/> :
          <Table
            borderless={true}
            striped={true}
            responsive={true}
          >
            <thead className="thead-dark">
              <tr className="d-flex">
                <th className="col-1">ID</th>
                <th className="col-lg-9 col-md-8 col-sm-7 col-6">Name</th>
                <th className="col-lg-2 col-md-3 col-sm-4 col-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(categoryRowRenderer)}
            </tbody>
          </Table>
        }
        <ConfirmationModal
          htmlContent={
            this.state.selectedCategory ?
            `Are you sure you want to delete <strong>${this.state.selectedCategory.name}</strong> <i>(ID: ${this.state.selectedCategory.id})</i> ?` :
            undefined
          }
          onConfirm={deleteCategory}
          isOpen={isModalOpen}
          toggle={closeModal}
        />
      </div>
    );
  }

  private categoryRowRenderer = (category: ICategoryDTO) => (
    <CategoryRowRenderer 
      category={category}
      key={category.id}
      onDelete={this.showConfirmationModal}
    />
  )

  private closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedCategory: null,
    });
  }

  private deleteCategory = () => {
    if (this.state.selectedCategory && this.state.selectedCategory._links.delete) {
      this.props.deleteCategory(this.state.selectedCategory, this.state.selectedCategory._links.delete);
    }
    this.closeModal();
  }

  private onSearchTextChange = (text: string) => {
    this.props.searchCategories(text);
  }

  private showConfirmationModal = (category: ICategoryDTO) => {
    this.setState({
      isModalOpen: true,
      selectedCategory: category,
    });
  }
}