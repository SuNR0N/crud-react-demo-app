import * as reduxForm from 'redux-form';

import { 
  AuthorActions,
  BookActions,
  CategoryActions,
  PublisherActions,
} from '../../../../actions';
import { EDIT_BOOK_FORM } from '../../../../constants/forms';
import {
  IAuthorDTO,
  IBookDTO,
  IBookUpdateDTO,
  ICategoryDTO,
  IHATEOASLink,
  IPublisherDTO,
} from '../../../../interfaces';
import { IRootState } from '../../../../reducers';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './EditBookPageConnected';

describe('EditBookPageConnected', () => {
  describe('mapDispatchToProps', () => {
    it('should map the loadAuthors function', () => {
      const loadAuthorsSpy = jest.spyOn(AuthorActions, 'loadAuthors');
      const { loadAuthors } = mapDispatchToProps(jest.fn());
      loadAuthors();

      expect(loadAuthorsSpy).toHaveBeenCalled();
    });

    it('should map the loadBook function', () => {
      const loadBookSpy = jest.spyOn(BookActions, 'loadBook');
      const { loadBook } = mapDispatchToProps(jest.fn());
      const idMock = 1;
      loadBook(idMock);

      expect(loadBookSpy).toHaveBeenCalledWith(idMock);
    });

    it('should map the loadCategories function', () => {
      const loadCategoriesSpy = jest.spyOn(CategoryActions, 'loadCategories');
      const { loadCategories } = mapDispatchToProps(jest.fn());
      loadCategories();

      expect(loadCategoriesSpy).toHaveBeenCalled();
    });

    it('should map the loadPublishers function', () => {
      const loadPublishersSpy = jest.spyOn(PublisherActions, 'loadPublishers');
      const { loadPublishers } = mapDispatchToProps(jest.fn());
      loadPublishers();

      expect(loadPublishersSpy).toHaveBeenCalled();
    });

    it('should map the saveBook function', () => {
      const updateBookSpy = jest.spyOn(BookActions, 'updateBook');
      const { saveBook } = mapDispatchToProps(jest.fn());
      const bookMock = {} as IBookUpdateDTO;
      const idMock = 1;
      const linkMock = {} as IHATEOASLink;
      saveBook(bookMock, idMock, linkMock);

      expect(updateBookSpy).toHaveBeenCalledWith(bookMock, idMock, linkMock);
    });

    it('should map the submitForm function', async () => {
      const submitSpy = jest.spyOn(reduxForm, 'submit');
      const { submitForm } = mapDispatchToProps(jest.fn());
      submitForm();

      expect(submitSpy).toHaveBeenCalledWith(EDIT_BOOK_FORM);
    });
  });

  describe('mapStateToProps', () => {
    const authorsMock: IAuthorDTO[] = [
      {
        fullName: 'John Doe',
        id: 1,
      } as IAuthorDTO,
      {
        fullName: 'Jane Doe',
        id: 2,
      } as IAuthorDTO,
    ];
    const categoriesMock: ICategoryDTO[] = [
      {
        id: 3,
        name: 'Foo',
      } as ICategoryDTO,
      {
        id: 7,
        name: 'Bar',
      } as ICategoryDTO,
    ];
    const publishersMock: IPublisherDTO[] = [
      {
        id: 5,
        name: 'FooBar',
      } as IPublisherDTO,
    ];
    const bookMock: Partial<IBookDTO> = {
      authors: [
        'Jane Doe',
        'John Doe',
      ],
      categories: [
        'Foo',
        'Bar',
      ],
      id: 1,
      isbn10: '1234567890',
      isbn13: '1234567890123',
      publicationDate: '2001-02-03',
      publishers: [
        'FooBar',
      ],
      title: 'Foo',
    };
    const state = {
      author: {
        authors: authorsMock,
      },
      book: {
        currentBook: bookMock,
      },
      category: {
        categories: categoriesMock,
      },
      publisher: {
        publishers: publishersMock,
      },
    } as IRootState;

    it('should map authors', () => {
      const { authors } = mapStateToProps(state);

      expect(authors).toBe(authorsMock);
    });

    it('should map categories', () => {
      const { categories } = mapStateToProps(state);

      expect(categories).toBe(categoriesMock);
    });

    it('should map currentBook', () => {
      const { currentBook } = mapStateToProps(state);

      expect(currentBook).toBe(bookMock);
    });

    it('should map initialFormData', () => {
      const { initialFormData } = mapStateToProps(state);

      expect(initialFormData).toEqual({
        authors: [
          1,
          2,
        ],
        categories: [
          3,
          7,
        ],
        id: bookMock.id,
        isbn10: bookMock.isbn10,
        isbn13: bookMock.isbn13,
        publicationDate: bookMock.publicationDate,
        publishers: [
          5,
        ],
        title: bookMock.title,
      });
    });

    it('should map isFormValid', async () => {
      jest.resetModules();
      jest.doMock('redux-form', () => ({
        isValid: (name: string) => jest.fn(() => name === EDIT_BOOK_FORM ? true : false),
        reduxForm: () => jest.fn(),
      }));
      const { mapStateToProps: mapStateToPropsDynamic } = (await import('./EditBookPageConnected'));
      const { isFormValid } = mapStateToPropsDynamic(state);

      expect(isFormValid).toBe(true);
    });

    it('should map publishers', () => {
      const { publishers } = mapStateToProps(state);

      expect(publishers).toBe(publishersMock);
    });
  });
});
