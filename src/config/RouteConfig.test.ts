import { RouteConfig } from './RouteConfig';

describe('RouteConfig', () => {
  describe('authors', () => {
    it('should be "/authors"', () => {
      expect(RouteConfig.authors).toBe('/authors');
    });
  });

  describe('books', () => {
    it('should be "/books"', () => {
      expect(RouteConfig.books).toBe('/books');
    });
  });

  describe('categories', () => {
    it('should be "/categories"', () => {
      expect(RouteConfig.categories).toBe('/categories');
    });
  });

  describe('createAuthor', () => {
    it('should be "/authors/create"', () => {
      expect(RouteConfig.createAuthor).toBe('/authors/create');
    });
  });

  describe('createBook', () => {
    it('should be "/books/create"', () => {
      expect(RouteConfig.createBook).toBe('/books/create');
    });
  });

  describe('createCategory', () => {
    it('should be "/categories/create"', () => {
      expect(RouteConfig.createCategory).toBe('/categories/create');
    });
  });

  describe('createPublisher', () => {
    it('should be "/publishers/create"', () => {
      expect(RouteConfig.createPublisher).toBe('/publishers/create');
    });
  });

  describe('editAuthor', () => {
    it('should be "/authors/:id/edit"', () => {
      expect(RouteConfig.editAuthor).toBe('/authors/:id/edit');
    });
  });

  describe('editBook', () => {
    it('should be "/books/:id/edit"', () => {
      expect(RouteConfig.editBook).toBe('/books/:id/edit');
    });
  });

  describe('editCategory', () => {
    it('should be "/categories/:id/edit"', () => {
      expect(RouteConfig.editCategory).toBe('/categories/:id/edit');
    });
  });

  describe('editPublisher', () => {
    it('should be "/publishers/:id/edit"', () => {
      expect(RouteConfig.editPublisher).toBe('/publishers/:id/edit');
    });
  });

  describe('publishers', () => {
    it('should be "/publishers"', () => {
      expect(RouteConfig.publishers).toBe('/publishers');
    });
  });

  describe('root', () => {
    it('should be "/"', () => {
      expect(RouteConfig.root).toBe('/');
    });
  });

  describe('viewAuthor', () => {
    it('should be "/authors/:id"', () => {
      expect(RouteConfig.viewAuthor).toBe('/authors/:id');
    });
  });

  describe('viewBook', () => {
    it('should be "/books/:id"', () => {
      expect(RouteConfig.viewBook).toBe('/books/:id');
    });
  });

  describe('viewCategory', () => {
    it('should be "/categories/:id"', () => {
      expect(RouteConfig.viewCategory).toBe('/categories/:id');
    });
  });

  describe('viewPublisher', () => {
    it('should be "/publishers/:id"', () => {
      expect(RouteConfig.viewPublisher).toBe('/publishers/:id');
    });
  });
});
