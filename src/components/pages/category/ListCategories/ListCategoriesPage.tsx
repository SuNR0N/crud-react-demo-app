import * as React from 'react';
import { Table } from 'reactstrap';

import { IAction } from '../../../../actions/ActionHelpers';
import { ActionTypes } from '../../../../actions/CategoryActions';
import { RouteConfig } from '../../../../config/RouteConfig';
import { ICategoryDTO } from '../../../../interfaces/dtos/CategoryDTO';
import { CategoryRowRenderer } from '../../../category/CategoryRowRenderer';
import { RoutedIconButton } from '../../../common/RoutedIconButton';
import { SearchField } from '../../../common/SearchField';

export interface IDispatchProps {
  searchCategories: (query?: string) => IAction<ActionTypes.LOAD_CATEGORIES_REQUEST>;
}

export interface IStateProps {
  categories: ICategoryDTO[];
  loggedIn: boolean;
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListCategoriesPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.searchCategories();
  }

  public render() {
    const {
      categoryRowRenderer,
      onSearchTextChange,
      props: {
        categories,
        loggedIn,
      },
    } = this;

    return (
      <div className="container-fluid">
        <div className="row no-gutters my-3 d-flex justify-content-between align-items-center">
          <div className="col-sm-6">
            <SearchField
              onValueChange={onSearchTextChange}
              placeholder="Search categories..."
            />
          </div>
          <RoutedIconButton
            color="primary"
            disabled={!loggedIn}
            route={RouteConfig.createCategory}
            symbol="plus-square-regular"
          >
            Create New Category
          </RoutedIconButton>
        </div>
        <Table
          striped={true}
          responsive={true}
        >
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(categoryRowRenderer)}
          </tbody>
        </Table>
      </div>
    );
  }

  private categoryRowRenderer = (category: ICategoryDTO) => (
    <CategoryRowRenderer 
      category={category}
      key={category.id}
    />
  )

  private onSearchTextChange = (text: string) => {
    this.props.searchCategories(text);
  }
}