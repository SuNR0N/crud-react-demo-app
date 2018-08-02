import React, { SFC } from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import {
  ActionCell,
  IconButton,
  RoutedButton,
} from '../../common';

export interface IProps {
  author: IAuthorDTO;
  onDelete?: (author: IAuthorDTO) => void;
}

export const AuthorRowRenderer: SFC<IProps> = (props) => {
  const {
    author,
    onDelete,
  } = props;

  return (
    <tr className="d-flex align-items-center">
      <td className="col-1">{author.id}</td>
      <td className="col-sm-7 col-6 d-block d-md-none">{author.fullName}</td>
      <td className="col-md-3 d-none d-md-block">{author.firstName}</td>
      <td className="col-lg-3 col-md-2 d-none d-md-block">{author.middleName}</td>
      <td className="col-md-3 d-none d-md-block">{author.lastName}</td>
      <ActionCell className="col-lg-2 col-md-3 col-sm-4 col-5">
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
      </ActionCell>
    </tr>
  );
};