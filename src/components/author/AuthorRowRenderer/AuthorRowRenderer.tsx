import * as React from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import {
  IconButton,
  RoutedButton,
} from '../../common';

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
    <tr className="d-flex align-items-center">
      <td className="col-1">{author.id}</td>
      <td className="col-3">{author.firstName}</td>
      <td className="col-3">{author.middleName}</td>
      <td className="col-3">{author.lastName}</td>
      <td className="col-2 d-flex justify-content-around">
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