import {
  useDebugValue,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'

type Subscribe = (onStoreChange: () => void) => () => void

type Inst<TSelection> = {
  hasValue: boolean
  value: TSelection | null
}

// React 19 already exposes useSyncExternalStore, so we only need the selector
// memoization behavior from the shim package in an ESM-safe form for Vite.
export function useSyncExternalStoreWithSelector<TSnapshot, TSelection>(
  subscribe: Subscribe,
  getSnapshot: () => TSnapshot,
  getServerSnapshot: (() => TSnapshot) | undefined,
  selector: (snapshot: TSnapshot) => TSelection,
  isEqual?: (a: TSelection, b: TSelection) => boolean,
): TSelection {
  const instRef = useRef<Inst<TSelection> | null>(null)

  if (instRef.current === null) {
    instRef.current = { hasValue: false, value: null }
  }

  const inst = instRef.current

  const [getSelectionSnapshot, getServerSelectionSnapshot] = useMemo(() => {
    let hasMemo = false
    let memoizedSnapshot!: TSnapshot
    let memoizedSelection!: TSelection

    const memoizedSelector = (nextSnapshot: TSnapshot) => {
      if (!hasMemo) {
        hasMemo = true
        memoizedSnapshot = nextSnapshot
        const nextSelection = selector(nextSnapshot)

        if (isEqual !== undefined && inst.hasValue) {
          const currentSelection = inst.value as TSelection
          if (isEqual(currentSelection, nextSelection)) {
            memoizedSelection = currentSelection
            return currentSelection
          }
        }

        memoizedSelection = nextSelection
        return nextSelection
      }

      const currentSelection = memoizedSelection

      if (Object.is(memoizedSnapshot, nextSnapshot)) {
        return currentSelection
      }

      const nextSelection = selector(nextSnapshot)

      if (isEqual !== undefined && isEqual(currentSelection, nextSelection)) {
        memoizedSnapshot = nextSnapshot
        return currentSelection
      }

      memoizedSnapshot = nextSnapshot
      memoizedSelection = nextSelection
      return nextSelection
    }

    const getSnapshotWithSelector = () => memoizedSelector(getSnapshot())
    const getServerSnapshotWithSelector = getServerSnapshot
      ? () => memoizedSelector(getServerSnapshot())
      : undefined

    return [getSnapshotWithSelector, getServerSnapshotWithSelector] as const
  }, [getSnapshot, getServerSnapshot, inst, isEqual, selector])

  const value = useSyncExternalStore(
    subscribe,
    getSelectionSnapshot,
    getServerSelectionSnapshot,
  )

  useEffect(() => {
    inst.hasValue = true
    inst.value = value
  }, [inst, value])

  useDebugValue(value)

  return value
}
