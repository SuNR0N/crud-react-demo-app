import moment from 'moment';
import React, { SFC } from 'react';

import {
  DATE_FORMAT,
  RouteConfig,
} from '../../../config';
import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import {
  ActionCell,
  IconButton,
  RoutedButton,
} from '../../common';

export interface IProps {
  book: IBookDTO;
  onDelete?: (book: IBookDTO) => void;
}

export const BookRowRenderer: SFC<IProps> = (props) => {
  const {
    book,
    onDelete,
  } = props;

  return (
    <tr className="d-flex align-items-center">
      <td className="col-1">{book.id}</td>
      <td className="col-lg-3 col-md-5 col-sm-8 col-7">{book.title}</td>
      <td className="col-lg-2 col-md-3 d-none d-md-block">{book.categories.join(', ')}</td>
      <td className="col-lg-2 d-none d-lg-block">{book.authors.join(', ')}</td>
      <td className="col-xl-1 col-lg-2 d-none d-lg-block">{book.publishers.join(', ')}</td>
      <td className="col-xl-1 d-none d-xl-block text-nowrap">{moment(book.publicationDate, 'YYYY-MM-DD').format(DATE_FORMAT)}</td>
      <ActionCell className="col-lg-2 col-sm-3 col-4">
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
      </ActionCell>
    </tr>
  );
};