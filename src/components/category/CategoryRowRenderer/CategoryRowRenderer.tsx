import * as React from 'react';
import { Button } from 'reactstrap';

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
          <Button
            outline={true}
            color="primary"
          >
            <Icon symbol="eye-regular"/>
          </Button>
        }
        {category._links.update &&
          <Button
            outline={true}
            color="secondary"
          >
            <Icon symbol="edit-regular"/>
          </Button>
        }
        {category._links.delete &&
          <Button
            outline={true}
            color="danger"
          >
            <Icon symbol="trash-alt-regular"/>
          </Button>
        }
      </td>
    </tr>
  );
};