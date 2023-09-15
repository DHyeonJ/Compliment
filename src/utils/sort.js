export function sortData(list, key) {
  return list?.sort((a, b) => b[key] - a[key])
}
