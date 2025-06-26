import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookResolver } from './book.resolver';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add', component: BookDetailComponent },
  { path: 'edit/:id', component: BookDetailComponent, resolve: { book: BookResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }

