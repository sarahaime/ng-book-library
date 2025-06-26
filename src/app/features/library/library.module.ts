import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LibraryRoutingModule } from './library-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCardComponent } from './book-list/book-card/book-card.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { BookEmptyResutlsComponent } from './book-list/book-empty-resutls/book-empty-resutls.component';
import { BookCardLoadingComponent } from './book-list/book-card-loading/book-card-loading.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookCardComponent,
    BookEmptyResutlsComponent,
    BookCardLoadingComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationComponent
  ]
})
export class LibraryModule { }
