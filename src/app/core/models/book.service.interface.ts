import { Observable } from 'rxjs';
import { IBook } from './book.interface';
import { PagedResults } from './pagedResults.interface';

export abstract class IBookService {
  abstract getBook(id: number): Observable<IBook>;
  abstract getBooks(page: number, pageSize: number): Observable<PagedResults<IBook>>;
  abstract addBook(book: IBook): Observable<IBook>;
  abstract updateBook(book: IBook): Observable<IBook>;
  abstract deleteBook(id: number): Observable<boolean>;
}