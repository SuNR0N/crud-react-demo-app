import * as React from 'react';
import { Table } from 'reactstrap';

import { ICategoryDTO } from '../../../../interfaces/dtos/CategoryDTO';
import { CategoryRowRenderer } from '../../../category/CategoryRowRenderer';

export interface IDispatchProps {
  loadCategories: () => any;
}

export interface IStateProps {
  categories: ICategoryDTO[]; 
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListCategoriesPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.loadCategories();
  }

  public render() {
    const {
      categoryRowRenderer,
      props: {
        categories,
      },
    } = this;

    return (
      <div>
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
}