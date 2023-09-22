export function map<T extends any, U extends any>(array: T[], callback: (value: T, index: number, array: T[]) => U): U[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}
