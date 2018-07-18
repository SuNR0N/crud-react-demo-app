import * as React from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { IconButton} from '../../common/IconButton';
import { RoutedButton } from '../../common/RoutedButton';

export interface IProps {
  author: IAuthorDTO;
  onDelete?: (author: IAuthorDTO) => void;
}

export const AuthorRowRenderer: React.SFC<IProps> = (props) => {
  const {
    author,
    onDelete,
  } = props;

  return (
    <tr>
      <td>{author.id}</td>
      <td>{author.firstName}</td>
      <td>{author.middleName}</td>
      <td>{author.lastName}</td>
      <td>
        {author._links.self &&
          <RoutedButton
            className="btn-sm"
            color="outline-primary"
            symbol="eye-regular"
            route={RouteConfig.viewAuthor.replace(':id', String(author.id))}
          />
        }
        {author._links.update &&
          <RoutedButton
            className="btn-sm"
            color="outline-secondary"
            symbol="edit-regular"
            route={RouteConfig.editAuthor.replace(':id', String(author.id))}
          />
        }
        {author._links.delete &&
          <IconButton
            className="btn-sm"
            color="outline-danger"
            onClick={onDelete ? () => onDelete(author) : undefined}
            symbol="trash-alt-regular"
          />
        }
      </td>
    </tr>
  );
};