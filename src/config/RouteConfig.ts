interface IRouteConfig {
  authors: string;
  books: string;
  categories: string;
  createAuthor: string;
  createBook: string;
  createCategory: string;
  createPublisher: string;
  editAuthor: string;
  editBook: string;
  editCategory: string;
  editPublisher: string;
  publishers: string;
  root: string;
  viewAuthor: string;
  viewBook: string;
  viewCategory: string;
  viewPublisher: string;
}

export const RouteConfig: IRouteConfig = {
  authors: '/authors',
  books: '/books',
  categories: '/categories',
  createAuthor: '/authors/create',
  createBook: '/books/create',
  createCategory: '/categories/create',
  createPublisher: '/publishers/create',
  editAuthor: '/authors/:id/edit',
  editBook: '/books/:id/edit',
  editCategory: '/categories/:id/edit',
  editPublisher: '/publishers/:id/edit',
  publishers: '/publishers',
  root: '/',
  viewAuthor: '/authors/:id',
  viewBook: '/books/:id',
  viewCategory: '/categories/:id',
  viewPublisher: '/publishers/:id',
};