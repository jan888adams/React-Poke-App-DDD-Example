export interface SearchRepository<T> {
  search(term: string): Promise<T[]>;
}
