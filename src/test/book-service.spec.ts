import { beforeEach, describe, expect, it} from 'vitest';

import type { Book } from '../books/book';
import { BookService } from '../books/book-service-export';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it('should add a book correctly', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(true);
  });

  // Test : L'ajout d'un livre sans titre ne doit pas fonctionner
it('test, adding a book without a title shouldn’t work', ()=>{
  const book: Book ={
    id: 11,
    title: '',
    author: 'Author',
    availableCopies: 3,
    totalCopies: 3,
  };
  const result = service.addBook(book);
  expect(result).toBe(false);

});
  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner
  it('Adding a book with totalCopies at 0 shouldn\'t work', () => {
    const book: Book = {
      id: 12,
      title: 'test 3',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 0,
    }
    const result = service.addBook(book);
    expect(result).toBe(false);
  });
  it('Adding a book with totalCopies at  negative shouldn\'t work', () => {
    const book: Book = {
      id: 12,
      title: 'test 3',
      author: 'Author',
      availableCopies: 0,
      totalCopies: -1,
    }
    const result = service.addBook(book);
    expect(result).toBe(false);
  });

  // Test : Emprunter un livre doit décrémenter availableCopies
  it('Borrowing a book should decrement availableCopies', () => {
    const book: Book  ={
      id: 13,
      title: 'To Kill a code',
      author: 'terre-obscure',
      availableCopies: 3,
      totalCopies: 3,
    };
    service.addBook(book);
    const result = service.borrowBook( 13);
    expect(result).toBe(true);
    expect(book.availableCopies).toBe(2)
  });
  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0
  it('Do not borrow a book when availableCopies is equal to 0', () => {
    const book: Book  ={
      id: 14,
      title: 'To Kill a code',
      author: 'terre-obscure',
      availableCopies: 0,
      totalCopies: 3,
    };
    service.addBook(book);
    const result = service.borrowBook( 14);
     expect(result).toBe(false);
    expect(book.availableCopies ).toBe(0)
  });
  // Test : Ne pas emprunter un livre qui n'existe pas
  it('Don\'t borrow a book that doesn\'t exist', () => {

    const result = service.borrowBook(14);
    expect(result).toBe(false);
  });
  // Test : Retourner un livre doit incrémenter availableCopies
  it('Returning a book should increase availableCopies', () => {
    const book: Book  ={
      id: 14,
      title: 'To Kill a code',
      author: 'terre-obscure',
      availableCopies: 3,
      totalCopies: 4,
    };
    service.addBook(book);
    service.returnBook( 14);

    expect(book.availableCopies).toBe(4)
  });
  // Test : Ne pas retourner un livre qui n'existe pas
  it('don\'t return a book that doesn\'t exist', () => {
    const result = service.returnBook(14);
    expect(result).toBe(false);
  });
  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  it('Do not return a book when all copies have already been returned', () => {
    const book: Book  ={
      id: 15,
      title: 'To have a code',
      author: 'terre-obscure',
      availableCopies: 4,
      totalCopies: 4,
    };
    service.addBook(book);
    const result = service.returnBook( 15);

    expect(result ).toBe(false)
    expect(book.availableCopies).toBe(4);
  });
  // Ajoute des tests de ton choix pour les autres méthodes
  it('delete a book', () => {
    const book: Book  ={
      id: 16,
      title: 'The egg',
      author: 'terre-obscure',
      availableCopies: 4,
      totalCopies: 4,
    };
    service.addBook(book);
    service.deleteBook(16);
    const books = service.getBooks();
    expect(books.find(book => book.id === 16)).toBeUndefined()
  });

  it('shouldn\'t delete a book that doesn\'t exist ', () => {
    const result = service.deleteBook(999);
    expect(result).toBe(false);
  });
});
