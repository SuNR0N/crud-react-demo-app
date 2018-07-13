import * as React from 'react';
import { Button } from 'reactstrap';

import { RouteConfig } from '../../../config/RouteConfig';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { Icon } from '../../common/Icon';
import { RoutedIconButton } from '../../common/RoutedIconButton';

export interface IProps {
  author: IAuthorDTO;
}

export const AuthorRowRenderer: React.SFC<IProps> = (props) => {
  const { author } = props;

  return (
    <tr>
      <td>{author.id}</td>
      <td>{author.firstName}</td>
      <td>{author.middleName}</td>
      <td>{author.lastName}</td>
      <td>
        {author._links.self &&
          <RoutedIconButton
            color="primary"
            symbol="eye-regular"
            route={RouteConfig.viewAuthor.replace(':id', String(author.id))}
          />
        }
        {author._links.update &&
          <RoutedIconButton
            color="secondary"
            symbol="edit-regular"
            route={RouteConfig.editAuthor.replace(':id', String(author.id))}
          />
        }
        {author._links.delete &&
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