import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '../../../../core/models/book.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input() book!: IBook;
  @Output() delete = new EventEmitter<IBook>();
  router = inject(Router)


  
  editBook() {
    this.router.navigate(['/library/edit', this.book.id]);
  }

  deleteBook() {
    this.delete.emit(this.book); 
  }



}
