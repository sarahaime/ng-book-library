import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBookService } from '../../../core/models/book.service.interface';
import { GenresEnum } from '../../../core/models/genres.enum';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit{

  bookForm!: FormGroup;
  genres = Object.values(GenresEnum);
  
  constructor(
    private route: ActivatedRoute,
    private bookService: IBookService,
    private notification: NotificationService,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.bookForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      year: new FormControl(null, Validators.required),
      description: new FormControl(''),
      genre: new FormControl('', Validators.required),
    });

    const book = this.route.snapshot.data['book'];

    this.bookForm.patchValue(book);
  }

  onSubmit() {
    if (this.bookForm.invalid){
      this.bookForm.markAllAsTouched();
      return;
    }
    const book = this.bookForm.value;
    const obs = book.id
      ? this.bookService.updateBook(book)
      : this.bookService.addBook(book);
    obs.subscribe({
          next: () => {
        this.notification.show('Saved!');
        this.router.navigate(['/library']);
    },
    error: () => this.notification.show('Save failed', 'error')
    });
  }
}
