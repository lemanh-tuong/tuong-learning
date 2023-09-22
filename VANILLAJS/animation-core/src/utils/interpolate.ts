import { Easing } from './easings';

export interface InterpolateOptions {
  inputRange: number[];
  outputRange: number[];
  value: number;
  easing?: Easing;
  reverseEasing?: boolean;
}

export function interpolate({ inputRange, outputRange, value, easing = (value: number) => value, reverseEasing = false }: InterpolateOptions) {
  const sortedRanges = inputRange.map((_, i) => ({ input: inputRange[i], output: outputRange[i] })).sort((a, b) => a.input - b.input);
  const sortedInputRange = sortedRanges.map(({ input }) => input);
  const sortedOutputRange = sortedRanges.map(({ output }) => output);

  if (value <= sortedInputRange[0]) {
    return sortedOutputRange[0];
  }

  if (value >= sortedInputRange[sortedInputRange.length - 1]) {
    return sortedOutputRange[sortedOutputRange.length - 1];
  }

  let i = 0;
  for (const inputValue of sortedInputRange) {
    if (inputValue < value) {
      i++;
    }
  }

  const j = i - 1;

  let ratio = (value - sortedInputRange[j]) / (sortedInputRange[i] - sortedInputRange[j]);
  if (typeof easing === 'function') {
    if (reverseEasing) {
      ratio = 1 - easing(1 - ratio);
    } else {
      ratio = easing(ratio);
    }
  }
  return sortedOutputRange[j] * (1 - ratio) + sortedOutputRange[i] * ratio;
}
