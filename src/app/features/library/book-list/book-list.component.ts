import { Component, inject } from '@angular/core';
import { IBook } from '../../../core/models/book.interface';
import { IBookService } from '../../../core/models/book.service.interface';
import { PagedResults } from '../../../core/models/pagedResults.interface';
import { NotificationService } from '../../../core/services/notification.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent {

  pagedBooks = new PagedResults<IBook>();
  currentPage: number = 1;
  pageSize: number = 6;
  isLoading: boolean = false;
  bookToDelete: IBook | undefined;
  deleteModal: any;
  searchTerm: string = '';
  bookService = inject(IBookService);
  notificationService = inject(NotificationService);

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading = true;
    this.bookService.getBooks(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: books =>{
        this.pagedBooks = books;
        this.isLoading = false;
      } ,
      error: err => {
        this.notificationService.show('Failed to load books', 'error')
        this.isLoading = false;
      }
    });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.loadBooks();
  }

  onPageChanged(nextPage: number) {
    this.currentPage = nextPage;
    this.loadBooks();
  }

  openDeleteDialog(book: IBook) {
    const modalElement = document.getElementById('deleteModal');
    this.deleteModal = new bootstrap.Modal(modalElement);
    this.deleteModal.show();
    
    this.bookToDelete = book;
  }

  deleteBook(id: number | undefined) {
    if(!id)
      return;

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks();
        this.notificationService.show('Book deleted');
      },
      error: () => this.notificationService.show('Delete failed', 'error')
    });
  }
}