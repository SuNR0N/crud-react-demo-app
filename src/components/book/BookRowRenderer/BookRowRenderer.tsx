import * as moment from 'moment';
import * as React from 'react';

import {
  DATE_FORMAT,
  RouteConfig,
} from '../../../config';
import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import {
  IconButton,
  RoutedButton,
} from '../../common';

export interface IProps {
  book: IBookDTO;
  onDelete?: (book: IBookDTO) => void;
}

export const BookRowRenderer: React.SFC<IProps> = (props) => {
  const {
    book,
    onDelete,
  } = props;

  return (
    <tr className="d-flex align-items-center">
      <td className="col-1">{book.id}</td>
      <td className="col-3">{book.title}</td>
      <td className="col-2">{book.categories.join(', ')}</td>
      <td className="col-2">{book.authors.join(', ')}</td>
      <td className="col-1">{book.publishers.join(', ')}</td>
      <td className="col-1">{moment(book.publicationDate, 'YYYY-MM-DD').format(DATE_FORMAT)}</td>
      <td className="col-2 d-flex justify-content-around">
        {book._links.self &&
          <RoutedButton
            className="btn-sm"
            color="outline-primary"
            symbol="eye-regular"
            route={RouteConfig.viewBook.replace(':id', String(book.id))}
          />
        }
        {book._links.update &&
          <RoutedButton
            className="btn-sm"
            color="outline-secondary"
            symbol="edit-regular"
            route={RouteConfig.editBook.replace(':id', String(book.id))}
          />
        }
        {book._links.delete &&
          <IconButton
            className="btn-sm"
            color="outline-danger"
            onClick={onDelete ? () => onDelete(book) : undefined}
            symbol="trash-alt-regular"
          />
        }
      </td>
    </tr>
  );
};