import { IsAny } from "./IsAny";

export type IsUnknown<T> = IsAny<T> extends true
	? false
	: unknown extends T
	? true
	: false;
