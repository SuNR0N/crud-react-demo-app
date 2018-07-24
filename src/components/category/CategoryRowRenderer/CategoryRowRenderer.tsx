import React, { SFC } from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import {
  IconButton,
  RoutedButton,
} from '../../common';

export interface IProps {
  category: ICategoryDTO;
  onDelete?: (category: ICategoryDTO) => void;
}

export const CategoryRowRenderer: SFC<IProps> = (props) => {
  const {
    category,
    onDelete,
  } = props;

  return (
    <tr className="d-flex align-items-center">
      <td className="col-1">{category.id}</td>
      <td className="col-9">{category.name}</td>
      <td className="col-2 d-flex justify-content-around">
        {category._links.self &&
          <RoutedButton
            className="btn-sm"
            color="outline-primary"
            symbol="eye-regular"
            route={RouteConfig.viewCategory.replace(':id', String(category.id))}
          />
        }
        {category._links.update &&
          <RoutedButton
            className="btn-sm"
            color="outline-secondary"
            symbol="edit-regular"
            route={RouteConfig.editCategory.replace(':id', String(category.id))}
          />
        }
        {category._links.delete &&
          <IconButton
            className="btn-sm"
            color="outline-danger"
            onClick={onDelete ? () => onDelete(category) : undefined}
            symbol="trash-alt-regular"
          />
        }
      </td>
    </tr>
  );
};