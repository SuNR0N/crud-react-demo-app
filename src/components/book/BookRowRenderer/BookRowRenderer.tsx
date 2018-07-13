import * as React from 'react';
import { Button } from 'reactstrap';

import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import { Icon } from '../../common/Icon';

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
          <Button
            outline={true}
            color="primary"
          >
            <Icon symbol="eye-regular"/>
          </Button>
        }
        {book._links.update &&
          <Button
            outline={true}
            color="secondary"
          >
            <Icon symbol="edit-regular"/>
          </Button>
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