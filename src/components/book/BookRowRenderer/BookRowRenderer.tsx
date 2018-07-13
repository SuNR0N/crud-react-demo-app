import * as React from 'react';
import { Button } from 'reactstrap';

import { RouteConfig } from '../../../config/RouteConfig';
import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import { Icon } from '../../common/Icon';
import { RoutedIconButton } from '../../common/RoutedIconButton';

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
          <RoutedIconButton
            color="primary"
            symbol="eye-regular"
            route={RouteConfig.viewBook.replace(':id', String(book.id))}
          />
        }
        {book._links.update &&
          <RoutedIconButton
            color="secondary"
            symbol="edit-regular"
            route={RouteConfig.editBook.replace(':id', String(book.id))}
          />
        }
        {book._links.delete &&
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