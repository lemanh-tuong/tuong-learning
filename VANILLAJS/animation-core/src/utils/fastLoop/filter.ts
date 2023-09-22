export function filter<T extends any>(array: T[], callback: (value: T, index: number, array: T[]) => boolean): T[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
