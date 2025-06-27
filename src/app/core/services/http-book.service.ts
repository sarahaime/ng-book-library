import { Injectable } from '@angular/core';
import { IBookService } from '../models/book.service.interface';
import { IBook } from '../models/book.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResults } from '../models/pagedResults.interface';

@Injectable()
export class HttpBookService extends IBookService {
  private api = 'https://api/books';

  constructor(private http: HttpClient) { super(); }

  getBooks(): Observable<PagedResults<IBook>> {
    return this.http.get<PagedResults<IBook>>(this.api);
  }
  getBook(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.api}/${id}`);
  }
  addBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.api, book);
  }
  updateBook(book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.api}/${book.id}`, book);
  }
  deleteBook(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.api}/${id}`);
  }
}