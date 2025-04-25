export type Pagination<T> = {
  count: number;
  next: unknown;
  prev: unknown;
  results: T[];
};
