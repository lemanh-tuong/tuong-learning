type PickKeysByValue<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];
type PickProperties<T, P> = Pick<T, PickKeysByValue<T, P>>;
export type GetKeyWithTypes<T, P> = Exclude<keyof PickProperties<T, P>, undefined>;

type Case1 = GetKeyWithTypes<
	{
		a: number;
		b?: string;
		c: string | undefined;
		d: string;
	},
	number
>;
// "a"
type Case2 = GetKeyWithTypes<
	{
		a: number;
		b?: string;
		c: string | undefined;
		d: string;
	},
	string | undefined
>;
// "b" | "c" | "d"
