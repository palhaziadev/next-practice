export default interface RepositoryInterface<T> {
  getAll(): Promise<Array<T>>;
  // getOne(id: string): Promise<T>;
  // search(data: object): Promise<T>;
  create(data: T): void;
  // update(id: string, data: T): Promise<T>;
  update(id: string, data: T): Promise<void>;
  // delete(data: T): Promise<T>;
}
