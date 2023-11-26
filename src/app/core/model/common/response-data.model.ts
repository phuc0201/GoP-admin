export interface IPagedResults<T> {
  content: T[];
  totalElements: number;
  offset: number;
  currentPage: number;
  pageSize: number;
}
export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
