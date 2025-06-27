import { Injectable } from '@angular/core';
import { IBookService } from '../models/book.service.interface';
import { IBook } from '../models/book.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PagedResults } from '../models/pagedResults.interface';

@Injectable()
export class HttpBookService extends IBookService {
  private api = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { super(); }

  getBooks(page: number, pageSize: number): Observable<PagedResults<IBook>> {
    const params = new HttpParams()
      .set('_page', page)
      .set('_limit', pageSize);

    return this.http.get<IBook[]>(this.api, { params, observe: 'response' }).pipe(
      map(response => {
        const total = Number(response.headers.get('X-Total-Count')) || 0;
        return {
          items: response.body || [],
          total,
          page,
          pageSize
        };
      })
    );
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