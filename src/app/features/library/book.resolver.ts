import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBookService } from '../../core/models/book.service.interface';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<any> {
  constructor(private bookService: IBookService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = +route.paramMap.get('id')!;
    return this.bookService.getBook(id).pipe(
      catchError(() => of(null))
    );
  }
}