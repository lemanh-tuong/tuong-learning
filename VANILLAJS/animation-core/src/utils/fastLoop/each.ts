export function each<T extends any>(array: T[], callback: (value: T, index: number, array: T[]) => void) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}
