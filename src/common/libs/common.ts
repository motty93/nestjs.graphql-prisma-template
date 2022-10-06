export function range(n: number): number[] {
  return [...Array(n).keys()]
}

export function chunk<T>(array: Array<T>, size: number): Array<Array<T>> {
  return array.reduce(
    (newArray: Array<Array<T>>, _: T, i: number) =>
      i % size ? newArray : [...newArray, array.slice(i, i + size)],
    [] as Array<Array<T>>,
  )
}

export function uniq<T>(array: Array<T>): Array<T> {
  return [...new Set(array)]
}
