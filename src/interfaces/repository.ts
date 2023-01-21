interface Repository<T, N> {
  getAll: () => Promise<T[]>;
  getSingle: (filter: any) => Promise<T | null>;
  addNew: (data: N) => Promise<T>;
  editOne: (id: string, data: N) => Promise<T | null | undefined>;
  deleteOne: (id: string) => Promise<Boolean>;
}

export default Repository;