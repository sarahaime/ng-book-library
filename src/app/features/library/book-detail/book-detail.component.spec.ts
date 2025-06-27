import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BookDetailComponent } from './book-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBookService } from '../../../core/models/book.service.interface';
import { NotificationService } from '../../../core/services/notification.service';
import { of, throwError } from 'rxjs';
import { GenresEnum } from '../../../core/models/genres.enum';

const mockBook = {
  id: 1,
  title: 'Sarahaime bio',
  author: 'Sarahaime Rodriguez',
  year: 2025,
  genre: GenresEnum.BIOGRAPHY,
  description: 'Life and work of the author'
};

class MockActivatedRoute {
  snapshot = { data: { book: mockBook } };
}
class MockBookService {
  addBook = jasmine.createSpy('addBook').and.returnValue(of(mockBook));
  updateBook = jasmine.createSpy('updateBook').and.returnValue(of(mockBook));
}
class MockNotificationService {
  show = jasmine.createSpy('show');
}
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let bookService: MockBookService;
  let notification: MockNotificationService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BookDetailComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: IBookService, useClass: MockBookService },
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(IBookService) as any;
    notification = TestBed.inject(NotificationService) as any;
    router = TestBed.inject(Router) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with book data', () => {
    expect(component.bookForm.value.title).toBe(mockBook.title);
    expect(component.bookForm.value.author).toBe(mockBook.author);
  });

  it('should mark form as touched and not submit if invalid', () => {
    component.bookForm.get('title')?.setValue('');
    component.onSubmit();
    expect(component.bookForm.touched).toBeTrue();
    expect(bookService.addBook).not.toHaveBeenCalled();
    expect(bookService.updateBook).not.toHaveBeenCalled();
  });

  it('should call updateBook and show notification for edit', fakeAsync(() => {
    component.bookForm.patchValue({ id: 1, title: 'New title', author: 'Albim', year: 1889, genre: GenresEnum.CLASSIC});
    component.onSubmit();
    tick();
    expect(bookService.updateBook).toHaveBeenCalled();
    expect(notification.show).toHaveBeenCalledWith('Saved!');
    expect(router.navigate).toHaveBeenCalledWith(['/library']);
  }));

  it('should call addBook and show notification for add', fakeAsync(() => {
    component.bookForm.patchValue({ id: null, title: 'New book', author: 'Sara', year: 1998, genre: GenresEnum.FANTASY});
    component.onSubmit();
    tick();
    expect(bookService.addBook).toHaveBeenCalled();
    expect(notification.show).toHaveBeenCalledWith('Saved!');
    expect(router.navigate).toHaveBeenCalledWith(['/library']);
  }));

  it('should show error notification on save error', fakeAsync(() => {
    bookService.updateBook.and.returnValue(throwError(() => new Error('fail')));
    component.bookForm.patchValue({ id: 1, title: 'Edit', author: 'Sara', year: 1900, genre: GenresEnum.MYSTERY });
    component.onSubmit();
    tick();
    expect(notification.show).toHaveBeenCalledWith('Save failed', 'error');
  }));
}); 