import type { Book } from './book';

export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      availableCopies: 5,
      totalCopies: 5,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      availableCopies: 3,
      totalCopies: 3,
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      availableCopies: 0,
      totalCopies: 2,
    },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): boolean {
    if (book.title.trim() === '') {
      return false;
    }
    if(book.availableCopies <= 0){
      return false;
    }
      this.books.push(book);
      return true;

  }

  borrowBook(id: number): boolean {
    const book = this.books.find((book) => book.id === id);

    if (book) {
      book.availableCopies--;
      return true;
    }
    return false;
  }

  returnBook(id: number): boolean {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      return false;
    }
    if (book.availableCopies >= book.totalCopies){
      return false;
    }
    book.availableCopies++;
    return true;
  }

  deleteBook(id: number): boolean {
    const bookExists = this.books.some((book) => book.id === id);
    if (!bookExists) {
      return false;
    }
    this.books = this.books.filter((book) => book.id !== id);
    return true;

  }

  updateBook(updatedBook: Book): boolean {
    if (updatedBook) {
      const index = this.books.findIndex((book) => book.id === updatedBook.id);
      this.books[index] = updatedBook;
      return true;
    }
    return false;
  }
}
export const bookServiceExport = new BookService();

