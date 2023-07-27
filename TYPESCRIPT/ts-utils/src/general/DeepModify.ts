import { AnyRecord, NonUndefinable } from "./data_type";

export type DeepModify<T> = T extends AnyRecord
	? {
			[K in keyof T]?: undefined extends {
				[K2 in keyof T]: K2;
			}[K]
				? NonUndefinable<T[K]> extends object
					? true | DeepModify<NonUndefinable<T[K]>>
					: true
				: T[K] extends object
				? true | DeepModify<T[K]>
				: true;
	  }
	: never;
