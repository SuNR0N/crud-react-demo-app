import * as React from 'react';
import {
  Table,
} from 'reactstrap';

import {
  IBookDTO,
  IPageableCollectionDTO,
} from '../../../../interfaces';
import { BookRowRenderer } from '../../../book/BookRowRenderer';

export interface IDispatchProps {
  loadBooks: () => any;
}

export interface IStateProps {
  booksCollection: IPageableCollectionDTO<IBookDTO>; 
}

export interface IProps extends IDispatchProps, IStateProps {}

export class ListBooksPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.loadBooks();
  }

  public render() {
    const {
      props: {
        booksCollection,
      },
      bookRowRenderer,
    } = this;

    return (
      <div>
        <Table
          striped={true}
          responsive={true}
        >
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Publication Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {booksCollection.content.map(bookRowRenderer)}
          </tbody>
        </Table>
      </div>
    );
  }

  private bookRowRenderer = (book: IBookDTO) => (
    <BookRowRenderer 
      book={book}
      key={book.id}
    />
  )
}