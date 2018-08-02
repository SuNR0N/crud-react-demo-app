import React, { SFC } from 'react';

import { RouteConfig } from '../../../config/RouteConfig';
import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import {
  ActionCell,
  IconButton,
  RoutedButton,
} from '../../common';

export interface IProps {
  publisher: IPublisherDTO;
  onDelete?: (publisher: IPublisherDTO) => void;
}

export const PublisherRowRenderer: SFC<IProps> = (props) => {
  const {
    onDelete,
    publisher,
  } = props;

  return (
    <tr className="d-flex align-items-center">
      <td className="col-1">{publisher.id}</td>
      <td className="col-lg-9 col-md-8 col-sm-7 col-6">{publisher.name}</td>
      <ActionCell className="col-lg-2 col-md-3 col-sm-4 col-5">
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
      </ActionCell>
    </tr>
  );
};