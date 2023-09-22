export function findIndex<T extends any>(array: T[], callback: (value: T, index: number, array: T[]) => boolean): number {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}
