import { BuiltIn } from "./data_type";
import { IsTuple } from "./is_something";

export type DeepUndefinable<T> = T extends BuiltIn
	? T | undefined
	: T extends Map<infer K, infer V>
	? Map<DeepUndefinable<K>, DeepUndefinable<V>>
	: T extends ReadonlyMap<infer K, infer V>
	? ReadonlyMap<DeepUndefinable<K>, DeepUndefinable<V>>
	: T extends WeakMap<infer K, infer V>
	? WeakMap<DeepUndefinable<K>, DeepUndefinable<V>>
	: T extends Set<infer U>
	? Set<DeepUndefinable<U>>
	: T extends ReadonlySet<infer U>
	? ReadonlySet<DeepUndefinable<U>>
	: T extends WeakSet<infer U>
	? WeakSet<DeepUndefinable<U>>
	: T extends Array<infer U>
	? T extends IsTuple<T>
		? { [K in keyof T]: DeepUndefinable<T[K]> | undefined }
		: Array<DeepUndefinable<U>>
	: T extends Promise<infer U>
	? Promise<DeepUndefinable<U>>
	: T extends {}
	? { [K in keyof T]: DeepUndefinable<T[K]> }
	: T | undefined;
