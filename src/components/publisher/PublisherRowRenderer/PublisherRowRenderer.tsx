import * as React from 'react';
import { Button } from 'reactstrap';

import { RouteConfig } from '../../../config/RouteConfig';
import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import { Icon } from '../../common/Icon';
import { RoutedIconButton } from '../../common/RoutedIconButton';

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
          <RoutedIconButton
            color="outline-primary"
            symbol="eye-regular"
            route={RouteConfig.viewPublisher.replace(':id', String(publisher.id))}
          />
        }
        {publisher._links.update &&
          <RoutedIconButton
            color="outline-secondary"
            symbol="edit-regular"
            route={RouteConfig.editPublisher.replace(':id', String(publisher.id))}
          />
        }
        {publisher._links.delete &&
          <Button color="outline-danger">
            <Icon symbol="trash-alt-regular"/>
          </Button>
        }
      </td>
    </tr>
  );
};