import * as React from 'react';
import { Button } from 'reactstrap';

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { Icon } from '../../common/Icon';

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
          <Button
            outline={true}
            color="primary"
          >
            <Icon symbol="eye-regular"/>
          </Button>
        }
        {author._links.update &&
          <Button
            outline={true}
            color="secondary"
          >
            <Icon symbol="edit-regular"/>
          </Button>
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