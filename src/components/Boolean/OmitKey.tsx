export default function omit(
  object: { [key: string]: unknown } | undefined,
  key: string,
): { [key: string]: unknown } {
  if (!object) return {}; // Return an empty object if `object` is undefined

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
}

// export default function omit(object, key) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { [key]: deletedKey, ...otherKeys } = object;
//   return otherKeys;
// }
