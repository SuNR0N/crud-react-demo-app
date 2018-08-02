import React, { SFC } from 'react';
import {
  Pagination as PaginationComponent,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import {
  IHATEOASLink,
  IPageableCollectionDTO,
} from '../../../interfaces';
import { Icon } from '../Icon';

export interface IProps {
  disabled?: boolean;
  onPaginate: (link: IHATEOASLink) => void;
  pageableCollection: IPageableCollectionDTO<any>;
  pageSize?: number;
}

export const Pagination: SFC<IProps> = (props) => {
  const {
    disabled = false,
    onPaginate,
    pageableCollection,
    pageSize = 10,
  } = props;

  const firstItemOfCurrentPage: number = (pageableCollection.currentPage - 1) * pageSize + 1;
  const lastItemOfCurrentPage: number = firstItemOfCurrentPage + pageableCollection.content.length - 1;
  const onNavigate = (link?: IHATEOASLink) => () => onPaginate(link!);
  let className = 'pagination';
  if (disabled) {
    className = `${className} pagination--disabled`;
  }

  return (
    <div className={className}>
      <PaginationComponent>
        <PaginationItem disabled={!(pageableCollection._links && pageableCollection._links.first) || disabled}>
          <PaginationLink onClick={onNavigate(pageableCollection._links && pageableCollection._links.first!)}>
            <Icon symbol="angle-double-left-solid"/>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!(pageableCollection._links && pageableCollection._links.previous) || disabled}>
          <PaginationLink onClick={onNavigate(pageableCollection._links && pageableCollection._links.previous!)}>
            <Icon symbol="angle-left-solid"/>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={true}>
          <PaginationLink>Page {pageableCollection.currentPage} of {pageableCollection.totalPages}</PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!(pageableCollection._links && pageableCollection._links.next) || disabled}>
          <PaginationLink onClick={onNavigate(pageableCollection._links && pageableCollection._links.next!)}>
            <Icon symbol="angle-right-solid"/>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!(pageableCollection._links && pageableCollection._links.last) || disabled}>
          <PaginationLink onClick={onNavigate(pageableCollection._links && pageableCollection._links.last!)}>
            <Icon symbol="angle-double-right-solid"/>
          </PaginationLink>
        </PaginationItem>
      </PaginationComponent>
      <span className="pagination__info">
        {firstItemOfCurrentPage}-{lastItemOfCurrentPage} of {pageableCollection.totalItems} items
      </span>
    </div>
  );
};

