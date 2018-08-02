import React, { SFC } from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import {
  ActionCell,
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
      <td className="col-lg-9 col-md-8 col-sm-7 col-6">{category.name}</td>
      <ActionCell className="col-lg-2 col-md-3 col-sm-4 col-5">
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
      </ActionCell>
    </tr>
  );
};