import * as React from 'react';
import { Button } from 'reactstrap';

import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import { Icon } from '../../common/Icon';

export interface IProps {
  publisher: IPublisherDTO;
}

export const PublisherRowRenderer: React.SFC<IProps> = (props) => {
  const { publisher } = props;

  return (
    <tr>
      <td>{publisher.id}</td>
      <td>{publisher.name}</td>
      <td>
        {publisher._links.self &&
          <Button
            outline={true}
            color="primary"
          >
            <Icon symbol="eye-regular"/>
          </Button>
        }
        {publisher._links.update &&
          <Button
            outline={true}
            color="secondary"
          >
            <Icon symbol="edit-regular"/>
          </Button>
        }
        {publisher._links.delete &&
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