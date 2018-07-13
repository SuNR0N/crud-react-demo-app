import { Actions as AuthorActions } from './AuthorActions';
import { Actions as BookActions } from './BookActions';
import { Actions as CategoryActions } from './CategoryActions';
import { Actions as PublisherActions } from './PublisherActions';

export type RootAction =
  AuthorActions |
  BookActions |
  CategoryActions |
  PublisherActions;