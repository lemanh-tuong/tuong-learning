import { BuiltIn } from "./data_type";

/** Like Required but recursive */
export type DeepRequired<T> = T extends BuiltIn
	? NonNullable<T>
	: T extends Map<infer K, infer V>
	? Map<DeepRequired<K>, DeepRequired<V>>
	: T extends ReadonlyMap<infer K, infer V>
	? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
	: T extends WeakMap<infer K, infer V>
	? WeakMap<DeepRequired<K>, DeepRequired<V>>
	: T extends Set<infer U>
	? Set<DeepRequired<U>>
	: T extends ReadonlySet<infer U>
	? ReadonlySet<DeepRequired<U>>
	: T extends WeakSet<infer U>
	? WeakSet<DeepRequired<U>>
	: T extends Promise<infer U>
	? Promise<DeepRequired<U>>
	: T extends {}
	? { [K in keyof T]-?: DeepRequired<T[K]> }
	: NonNullable<T>;

type Case2 = DeepRequired<[[4, [5, [6, 7]]], 1?, 2?, 3?, [8, [9, 10, 11?]?]?]>; // Result:  [[4, [5, [6, 7]]], 1, 2, 3, [8, [9, 10, 11]]]

type Case1 = DeepRequired<{
	key1?: {
		key2?: {
			key3?: {
				abc?: boolean;
			};
		};
		key4: null;
	};
}>;
// Result :{
//     key1: {
//       key2: {
//           key3: {
//               abc: boolean;
//           };
//       };
//       key4: never;
//   };
// }
