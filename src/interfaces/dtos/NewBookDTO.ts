import { IBookUpdateDTO } from './BookUpdateDTO';

export interface INewBookDTO extends IBookUpdateDTO {
  isbn13: string;
  title: string;
}
