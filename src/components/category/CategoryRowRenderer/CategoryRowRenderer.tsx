import * as React from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import { IconButton } from '../../common/IconButton';
import { RoutedButton } from '../../common/RoutedButton';

export interface IProps {
  category: ICategoryDTO;
}

export const CategoryRowRenderer: React.SFC<IProps> = (props) => {
  const { category } = props;

  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>
        {category._links.self &&
          <RoutedButton
            color="outline-primary"
            symbol="eye-regular"
            route={RouteConfig.viewCategory.replace(':id', String(category.id))}
          />
        }
        {category._links.update &&
          <RoutedButton
            color="outline-secondary"
            symbol="edit-regular"
            route={RouteConfig.editCategory.replace(':id', String(category.id))}
          />
        }
        {category._links.delete &&
          <IconButton
            color="outline-danger"
            symbol="trash-alt-regular"
          />
        }
      </td>
    </tr>
  );
};