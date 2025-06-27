# NgBookLibrary

A simple, modular Angular application for managing a personal book collection. It allows users to view, add, edit, and delete books. The project demonstrates best practices in Angular architecture, dependency injection, and user experience.

---

## Features
- **Book List Overview**: View all books in a paginated, card-based grid.
- **Loading & Empty States**: Loading skeletons and empty state illustrations in the list overview.
- **Add/Edit Book**: Add new books or edit existing ones with a form (title, author, year, genre, description).
- **Delete Book**: Remove books with confirmation modal.
- **Notifications**: Success and error notifications for user actions.
- **About Page**: Simple about section.

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd ng-book-library
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm start
   ```
   Navigate to [http://localhost:4200](http://localhost:4200) in your browser.

4. **Run unit tests**
   ```bash
   npm test
   ```

---

## Project Architecture

- **src/app/**
  - **core/**: Core services, models, and dependency injection (e.g., book service abstraction, logger, error interceptor).
  - **features/**: Feature modules (e.g., library, about).
    - **library/**: Book list, detail, card, and related UI components.
    - **about/**: About page module and component.
  - **shared/**: Reusable UI components (footer, notification, pagination).
  - **app.module.ts**: Main application module, imports core, shared, and feature modules.
  - **app-routing.module.ts**: Top-level routing, lazy-loads feature modules.
  
- **Service Abstraction**: The app uses an `IBookService` interface, with an in-memory implementation by default. Easily swap to an HTTP backend by changing the provider in `core.module.ts`.
- **UI/UX**: Responsive, Bootstrap-based design with SCSS styling.
- **Error Handling**: Global HTTP error interceptor and notification system.

---

## Technologies Used
- [Angular 18+](https://angular.io/)
- [Bootstrap 5](https://getbootstrap.com/)
- [RxJS](https://rxjs.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Karma & Jasmine](https://karma-runner.github.io/) (unit testing)

---


## Assignment Requirements Coverage

- **Lazy-loaded LibraryModule** at `/library`
- **CoreModule** for singleton services
- **IBook** and **IBookService** interfaces
- **InMemoryBookService** and **HttpBookService** implementations (swap via DI)
- **BookListComponent** (with pagination, loading, empty states)
- **BookDetailComponent** (add/edit with Reactive Forms)
- **Route resolver** for book detail
- **Delete with confirmation modal**
- **NotificationService** for success/error toasts
- **Global HTTP error interceptor** and **LoggerService**
- **Unit tests** for at least one service and one component (see `/src/app/features/library/book-detail/book-detail.component.spec.ts`, `src/app/shared/pagination/pagination.component.spec.ts`, and `/src/app/core/services/in-memory-book.service.spec.ts`)

## Swapping Book Service Implementations

To switch between the in-memory and HTTP book service, edit the provider in `src/app/core/core.module.ts`:

```ts
{ provide: IBookService, useClass: InMemoryBookService }
// or
{ provide: IBookService, useClass: HttpBookService }
```

## Testing

Run all unit tests with:

```bash
npm test
```

Example tests are provided for BookDetailsComponent, PaginationComponent and InMemoryBookService.

## Best Practices

- SOLID principles, Angular best practices, and clear code structure are followed throughout the project.

## Author
This app was made with 🧡 by Sarahaime Rodriguez.
