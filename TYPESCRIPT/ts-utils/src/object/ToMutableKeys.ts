type Writable<T> = { -readonly [P in keyof T]: T[P] };
export type ToMutableKeys<T, K extends keyof T> = Omit<T, K> & Writable<Pick<T, K>>;
