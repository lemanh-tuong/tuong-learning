export type ToRequiredKeys<T, RK extends keyof T> = Omit<T, RK> & Required<Pick<T, RK>>;
