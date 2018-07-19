import * as React from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import {
  IconButton,
  RoutedButton,
} from '../../common';

export interface IProps {
  publisher: IPublisherDTO;
  onDelete?: (publisher: IPublisherDTO) => void;
}

export const PublisherRowRenderer: React.SFC<IProps> = (props) => {
  const {
    onDelete,
    publisher,
  } = props;

  return (
    <tr className="d-flex align-items-center">
      <td className="col-1">{publisher.id}</td>
      <td className="col-9">{publisher.name}</td>
      <td className="col-2 d-flex justify-content-around">
        {publisher._links.self &&
          <RoutedButton
            className="btn-sm"
            color="outline-primary"
            symbol="eye-regular"
            route={RouteConfig.viewPublisher.replace(':id', String(publisher.id))}
          />
        }
        {publisher._links.update &&
          <RoutedButton
            className="btn-sm"
            color="outline-secondary"
            symbol="edit-regular"
            route={RouteConfig.editPublisher.replace(':id', String(publisher.id))}
          />
        }
        {publisher._links.delete &&
          <IconButton
            className="btn-sm"
            color="outline-danger"
            onClick={onDelete ? () => onDelete(publisher) : undefined}
            symbol="trash-alt-regular"
          />
        }
      </td>
    </tr>
  );
};