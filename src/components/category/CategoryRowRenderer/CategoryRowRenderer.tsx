import * as React from 'react';
import { Button } from 'reactstrap';

import { RoutedIconButton } from 'src/components/common/RoutedIconButton';
import { RouteConfig } from '../../../config/RouteConfig';
import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import { Icon } from '../../common/Icon';

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
          <RoutedIconButton
            color="outline-primary"
            symbol="eye-regular"
            route={RouteConfig.viewCategory.replace(':id', String(category.id))}
          />
        }
        {category._links.update &&
          <RoutedIconButton
            color="outline-secondary"
            symbol="edit-regular"
            route={RouteConfig.editCategory.replace(':id', String(category.id))}
          />
        }
        {category._links.delete &&
          <Button color="outline-danger">
            <Icon symbol="trash-alt-regular"/>
          </Button>
        }
      </td>
    </tr>
  );
};