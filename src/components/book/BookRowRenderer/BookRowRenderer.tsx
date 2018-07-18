import * as React from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import { IconButton } from '../../common/IconButton';
import { RoutedButton } from '../../common/RoutedButton';

export interface IProps {
  book: IBookDTO;
}

export const BookRowRenderer: React.SFC<IProps> = (props) => {
  const { book } = props;

  return (
    <tr>
      <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.categories.join(', ')}</td>
      <td>{book.authors.join(', ')}</td>
      <td>{book.publishers.join(', ')}</td>
      <td>{book.publicationDate}</td>
      <td>
        {book._links.self &&
          <RoutedButton
            color="outline-primary"
            symbol="eye-regular"
            route={RouteConfig.viewBook.replace(':id', String(book.id))}
          />
        }
        {book._links.update &&
          <RoutedButton
            color="outline-secondary"
            symbol="edit-regular"
            route={RouteConfig.editBook.replace(':id', String(book.id))}
          />
        }
        {book._links.delete &&
          <IconButton
            color="outline-danger"
            symbol="trash-alt-regular"
          />
        }
      </td>
    </tr>
  );
};