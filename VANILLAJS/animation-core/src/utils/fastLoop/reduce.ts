export function reduce<T extends any, R extends any>(
  array: T[],
  callback: (previousValue: R, currentValue: T, currentIndex: number, array: T[]) => R,
  initialValue: R,
): R {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}
