import { TestBed } from '@angular/core/testing';
import { InMemoryBookService } from './in-memory-book.service';
import { GenresEnum } from '../models/genres.enum';
import { IBook } from '../models/book.interface';
import { LoggerService } from './logger.service';

class MockLoggerService {
  error = jasmine.createSpy('error');
  info = jasmine.createSpy('info');
}

describe('InMemoryBookService', () => {
  let service: InMemoryBookService;
  let logger: MockLoggerService;

  beforeEach(() => {
    logger = new MockLoggerService();
    TestBed.configureTestingModule({
      providers: [
        InMemoryBookService,
        { provide: LoggerService, useValue: logger }
      ]
    });
    service = TestBed.inject(InMemoryBookService);
  });

  it('should return paged books', (done) => {
    service.getBooks(1, 6).subscribe(result => {
      expect(result.items.length).toBe(6);
      expect(result.total).toBe(10);
      expect(logger.info).toHaveBeenCalledWith('Fetched books page 1 (size 6)');
      done();
    });
  });

  it('should get a book by id', (done) => {
    service.getBook(1).subscribe(book => {
      expect(book.id).toBe(1);
      expect(logger.info).toHaveBeenCalledWith('Fetched book with id 1');
      done();
    });
  });


  it('should add a new book', (done) => {
    const newBook: IBook = { id: 0, title: 'New', author: 'A', year: 2022, genre: GenresEnum.FICTION };
    service.addBook(newBook).subscribe(book => {
      expect(book.id).toBeGreaterThan(0);
      expect(book.title).toBe(newBook.title);
      expect(logger.info).toHaveBeenCalledWith(jasmine.stringMatching('Added book with id'));
      done();
    });
  });

  it('should update existing book', (done) => {
    service.getBook(1).subscribe(origBook => {
      const updated = { ...origBook, title: 'New title' };
      service.updateBook(updated).subscribe(book => {
        expect(book.title).toBe(updated.title);
        expect(logger.info).toHaveBeenCalledWith('Updated book with id 1');
        done();
      });
    });
  });

  it('should error when updating non-existent book', (done) => {
    const fakeBook: IBook = { id: 999, title: 'Non exits', author: 'Sara', year: 2021, genre: GenresEnum.FICTION };
    service.updateBook(fakeBook).subscribe({
      next: () => {},
      error: (err) => {
        expect(logger.error).toHaveBeenCalledWith('Book with id 999 not found for update');
        expect(err.message).toBe('Not found');
        done();
      }
    });
  });

  it('should delete a book', (done) => {
    service.deleteBook(1).subscribe(result => {
      expect(result).toBeTrue();
      expect(logger.info).toHaveBeenCalledWith('Deleted book with id 1');
      done();
    });
  });

  it('should error when deleting non-existent book', (done) => {
    const nonExistingId = 346;
    service.deleteBook(nonExistingId).subscribe({
      next: () => {},
      error: (err) => {
        expect(logger.error).toHaveBeenCalledWith(`Book with id ${nonExistingId} not found for deletion`);
        expect(err.message).toBe('Not found');
        done();
      }
    });
  });
}); 