/**
 * Deterministic shuffle for Convex queries (no Math.random in handlers).
 * Same seed + same input order produces the same output order.
 */
export function seededShuffle<T>(items: ReadonlyArray<T>, seed: number): Array<T> {
  const arr = [...items];
  let s = seed >>> 0;
  const next = () => {
    s = Math.imul(s, 1664525) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}
