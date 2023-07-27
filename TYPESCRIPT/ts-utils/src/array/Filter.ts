export type Filter<Arr extends unknown[], FilterBy> = Arr extends [infer FirstElement, ...infer Rest] ? (FirstElement extends FilterBy ? [FirstElement, ...Filter<Rest, FilterBy>] : Filter<Rest, FilterBy>) : Arr;

type Case1 = Filter<[1, 2, string, boolean], number>; // [1, 2]

type InputField = {
	type: "input";
	value: string;
	defaultValue: string;
	label: string;
};

type NumberField = {
	type: "number";
	value: number;
	defaultValue: number;
	label: string;
	max: number;
	min: number;
};

type SelectField = {
	type: "select";
	options: Array<{ label: string; value: any; disabled: boolean }>;
	value: any;
	defaultValue: any;
};

type Case2 = Filter<[InputField, NumberField, SelectField], InputField | NumberField>; // [InputField, NumberField]
