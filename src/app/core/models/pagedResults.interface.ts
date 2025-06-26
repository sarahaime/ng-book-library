export class PagedResults<T> {
    items: T[] = [];
    total: number = 0;   
    page: number = 1;   
    pageSize: number = 9;
  }