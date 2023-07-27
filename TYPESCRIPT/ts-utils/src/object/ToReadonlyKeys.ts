export type ToReadonlyKeys<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;
