export interface INewBookDTO {
  authors?: number[];
  categories?: number[];
  isbn10?: string;
  isbn13: string;
  publicationDate?: string;
  publishers?: number[];
  title: string;
}