export type PaginationResponseType<T> = {
  per_page: number;
  current_page: number;
  total_pages: number;
  total_items: number;
  items: T[];
};

export type PaginationParamsType = {
  per_page?: number;
  page?: number;
};
export const initValue: PaginationReducerType<any> = {
  items: [],
  isLoading: false,
  error: null,
  current_page: 0,
  per_page: 0,
  total_items: 0,
  total_pages: 0,
};
export type DataResponseType<T> = {
  data: T;
};
export type DateFilterParamsType = {
  start_date?: string | Date | null;
  end_date?: string | Date | null;
};
export type ReducerType = {
  isLoading: boolean;
  error: null;
};
export type PaginationReducerType<T> = PaginationResponseType<T> & ReducerType;
export type PaginationReducerTypeWithItemAction<T> = PaginationResponseType<
  T & { isLoading: boolean }
> &
  ReducerType;
