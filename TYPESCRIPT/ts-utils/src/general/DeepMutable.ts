// import { BuiltIn } from "./BuiltIn";

// export type DeepWritable<T> = T extends BuiltIn
//   ? T
//   : T extends Map<infer K, infer V>
//   ? Map<DeepWritable<K>, DeepWritable<V>>
//   : T extends ReadonlyMap<infer K, infer V>
//   ? Map<DeepWritable<K>, DeepWritable<V>>
//   : T extends WeakMap<infer K, infer V>
//   ? WeakMap<DeepWritable<K>, DeepWritable<V>>
//   : T extends Set<infer U>
//   ? Set<DeepWritable<U>>
//   : T extends ReadonlySet<infer U>
//   ? Set<DeepWritable<U>>
//   : T extends WeakSet<infer U>
//   ? WeakSet<DeepWritable<U>>
//   : T extends Promise<infer U>
//   ? Promise<DeepWritable<U>>
//   : T extends {}
//   ? { -readonly [K in keyof T]: DeepWritable<T[K]> }
//   : T;

export type DeepMutable<T> = {
	-readonly [P in keyof T]: DeepMutable<T[P]>;
};
