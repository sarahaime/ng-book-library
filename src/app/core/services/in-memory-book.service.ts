import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IBookService } from '../models/book.service.interface';
import { IBook } from '../models/book.interface';
import { GenresEnum } from '../models/genres.enum';
import { LoggerService } from './logger.service';
import { PagedResults } from '../models/pagedResults.interface';

@Injectable()
export class InMemoryBookService extends IBookService {

  logger = inject(LoggerService);
  
  private books: IBook[] = [
    { id: 1, title: 'The Godfather', author: 'Mario Puzo', year: 1969, genre: GenresEnum.CRIME, description: 'A saga of family, power, and betrayal in the world of organized crime.' },
    { id: 2, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', year: 1997, genre: GenresEnum.FANTASY, description: 'A young wizard discovers his destiny and attends a school of magic.' },
    { id: 3, title: 'The Hunger Games', author: 'Suzanne Collins', year: 2008, genre: GenresEnum.SCIENCE_FICTION, description: 'In a dystopian future, teens must fight to the death for survival and resistance.' },
    { id: 4, title: 'A Song of Ice and Fire: A Game of Thrones', author: 'George R.R. Martin', year: 1996, genre: GenresEnum.FANTASY, description: 'Noble families vie for control of the Iron Throne in a brutal medieval world.' },
    { id: 5, title: 'The Midnight Library', author: 'Matt Haig', year: 2020, genre: GenresEnum.FICTION, description: 'A woman explores alternate lives in a magical library between life and death.' },
    { id: 6, title: 'It Ends with Us', author: 'Colleen Hoover', year: 2016, genre: GenresEnum.ROMANCE, description: 'A powerful romance about love, resilience, and difficult choices.' },
    { id: 7, title: 'Project Hail Mary', author: 'Andy Weir', year: 2021, genre: GenresEnum.SCIENCE_FICTION, description: 'A lone astronaut must save humanity in a thrilling space adventure.' },
    { id: 8, title: 'The Silent Patient', author: 'Alex Michaelides', year: 2019, genre: GenresEnum.THRILLER, description: 'A psychotherapist unravels the mystery behind a woman who refuses to speak after a shocking crime.' },
    { id: 9, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988, genre: GenresEnum.ADVENTURE, description: 'A shepherd\'s mystical journey in search of his destiny.' },
    { id: 10, title: 'Where the Crawdads Sing', author: 'Delia Owens', year: 2018, genre: GenresEnum.MYSTERY, description: 'A coming-of-age story blended with mystery in the marshes of North Carolina.' }
  ];

  getBooks(page: number, pageSize: number, searchTerm?: string): Observable<PagedResults<IBook>> {
      let filteredBooks = this.books;
      
      if (searchTerm && typeof searchTerm === 'string' && searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        filteredBooks = this.books.filter(book => 
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.genre.toLowerCase().includes(term)
        );
      }
      
      const skip = (page - 1) * pageSize;
      const endIndex = skip + pageSize;
      const booksPage = filteredBooks.slice(skip, endIndex);
      this.logger.info(`Fetched books page ${page} (size ${pageSize})${searchTerm ? ` with search term: ${searchTerm}` : ''}`);
      return of({
        items: booksPage,
        total: filteredBooks.length,
        page: page,
        pageSize: pageSize
      });
  }

  getBook(id: number): Observable<IBook> {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      this.logger.error(`Book with id ${id} not found`);
      return throwError(() => new Error('Not found'));
    }
    this.logger.info(`Fetched book with id ${id}`);
    return of({ ...book });
  }

  addBook(book: IBook): Observable<IBook> {
    const id = Math.max(...this.books.map(b => b.id), 0) + 1;
    const newBook = { ...book, id };
    this.books.push(newBook);
    this.logger.info(`Added book with id ${id}`);
    return of(newBook);
  }

  updateBook(book: IBook): Observable<IBook> {
    const index = this.books.findIndex(b => b.id === book.id);
    if (index === -1) {
      this.logger.error(`Book with id ${book.id} not found for update`);
      return throwError(() => new Error('Not found'));
    }
    this.books[index] = { ...book };
    this.logger.info(`Updated book with id ${book.id}`);
    return of({ ...book });
  }

  deleteBook(id: number): Observable<boolean> {
    const exists = this.books.some(b => b.id === id);
    if (!exists) {
      this.logger.error(`Book with id ${id} not found for deletion`);
      return throwError(() => new Error('Not found'));
    }
    this.books = this.books.filter(b => b.id !== id);
    this.logger.info(`Deleted book with id ${id}`);
    return of(true);
  }
}