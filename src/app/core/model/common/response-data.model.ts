export interface IPagedResults<T> {
  content: T[];
  totalElements: number;
  currentPage: number;
  totalPage: number;
}
export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
