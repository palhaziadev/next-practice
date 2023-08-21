export default interface IRepository<T> {
  getAll(): Promise<Array<T>>;
  // getOne(id: string): Promise<T>;
  // search(data: object): Promise<T>;
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
