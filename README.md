# NgBookLibrary
Ng Book Library is a simple Front End application for managing a book collection. It allows users to view, add, edit, and delete books. It is designed to demonstrate clean architecture, best practices, and modern development patterns in Angular.

## Demo Video

https://www.loom.com/share/601dd5228a3744b99aae5ff3b5dd2844?sid=45938eae-b761-4548-b237-400c930d2414

---

## Features
- **Book List Overview**: View all books in a paginated, card-based grid.
- **Loading & Empty States**: Loading skeletons and empty state illustrations in the list overview.
- **Search Bar**: Search books by title, author or genre.
- **Add/Edit Book**: Add new books or edit existing ones with a form (title, author, year, genre, description).
- **Delete Book**: Remove books with confirmation modal.
- **Notifications**: Success and error notifications for user actions.
- **About Page**: Simple about section.

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarahaime/ng-book-library.git
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

## Swapping Book Service Implementations

You can switch between the in-memory and HTTP book service using an environment variable:

1. Open `src/environments/environment.ts`.
2. Set the `useHttpBookService` variable:
   ```ts
   export const environment = {
     // ...
     useHttpBookService: true // Use HttpBookService
   };
   ```
   or
   ```ts
   export const environment = {
     // ...
     useHttpBookService: false // Use InMemoryBookService
   };
   ```
   Note: to use useHttpBookService you have to run [json-server](https://www.npmjs.com/package/json-server) locally by `npm run json-server`

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

---
## Technologies Used
- [Angular 18+](https://angular.io/)
- [Bootstrap 5](https://getbootstrap.com/)
- [RxJS](https://rxjs.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Karma & Jasmine](https://karma-runner.github.io/) (unit testing)
- [Json-server](https://www.npmjs.com/package/json-server)
---
## Author
This app was made by Sarahaime Rodriguez.
