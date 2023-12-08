export class Paginate<T> {
  constructor(
    public currentPage = 1,
    public totalPage = 1,
    public totalElements = 0,
    public limit = 10,
    public data: T[] = [],
  ) { }
}
