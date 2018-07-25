import {
  CREATE_AUTHOR_FORM,
  CREATE_BOOK_FORM,
  CREATE_CATEGORY_FORM,
  CREATE_PUBLISHER_FORM,
  EDIT_AUTHOR_FORM,
  EDIT_BOOK_FORM,
  EDIT_CATEGORY_FORM,
  EDIT_PUBLISHER_FORM,
} from './forms';

describe('forms', () => {
  describe('CREATE_AUTHOR_FORM', () => {
    it('should be "createAuthorForm"', () => {
      expect(CREATE_AUTHOR_FORM).toBe('createAuthorForm');
    });
  });

  describe('CREATE_BOOK_FORM', () => {
    it('should be "createBookForm"', () => {
      expect(CREATE_BOOK_FORM).toBe('createBookForm');
    });
  });

  describe('CREATE_CATEGORY_FORM', () => {
    it('should be "createCategoryForm"', () => {
      expect(CREATE_CATEGORY_FORM).toBe('createCategoryForm');
    });
  });

  describe('CREATE_PUBLISHER_FORM', () => {
    it('should be "createPublisherForm"', () => {
      expect(CREATE_PUBLISHER_FORM).toBe('createPublisherForm');
    });
  });

  describe('EDIT_AUTHOR_FORM', () => {
    it('should be "editAuthorForm"', () => {
      expect(EDIT_AUTHOR_FORM).toBe('editAuthorForm');
    });
  });

  describe('EDIT_BOOK_FORM', () => {
    it('should be "editBookForm"', () => {
      expect(EDIT_BOOK_FORM).toBe('editBookForm');
    });
  });

  describe('EDIT_CATEGORY_FORM', () => {
    it('should be "editCategoryForm"', () => {
      expect(EDIT_CATEGORY_FORM).toBe('editCategoryForm');
    });
  });

  describe('EDIT_PUBLISHER_FORM', () => {
    it('should be "editPublisherForm"', () => {
      expect(EDIT_PUBLISHER_FORM).toBe('editPublisherForm');
    });
  });
});
