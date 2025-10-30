export interface SearchRepository<T> {
  search(value: string): Promise<T[]>;
}
