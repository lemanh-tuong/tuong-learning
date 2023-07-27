import { DeepMutable } from "../general/DeepMutable";

type IsFullyWritable<T extends object> = IsEqualConsideringWritability<{ [Q in keyof T]: T[Q] }, DeepMutable<{ [Q in keyof T]: T[Q] }>>;
type IsEqualConsideringWritability<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

export type GetReadonly<T extends object> = {
	[P in keyof T]-?: IsFullyWritable<Pick<T, P>> extends true ? never : P;
}[keyof T];

type Case1 = GetReadonly<{
	readonly a: number;
	b: string;
}>; // a

type Case2 = GetReadonly<{
	readonly a: number;
	readonly b?: string;
}>; //  "a" | "b"
