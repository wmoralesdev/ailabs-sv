import {
  useDebugValue,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'

type Subscribe = (onStoreChange: () => void) => () => void

type Inst<Selection> = {
  hasValue: boolean
  value: Selection | null
}

// React 19 already exposes useSyncExternalStore, so we only need the selector
// memoization behavior from the shim package in an ESM-safe form for Vite.
export function useSyncExternalStoreWithSelector<Snapshot, Selection>(
  subscribe: Subscribe,
  getSnapshot: () => Snapshot,
  getServerSnapshot: (() => Snapshot) | undefined,
  selector: (snapshot: Snapshot) => Selection,
  isEqual?: (a: Selection, b: Selection) => boolean,
): Selection {
  const instRef = useRef<Inst<Selection> | null>(null)

  if (instRef.current === null) {
    instRef.current = { hasValue: false, value: null }
  }

  const inst = instRef.current

  const [getSelectionSnapshot, getServerSelectionSnapshot] = useMemo(() => {
    let hasMemo = false
    let memoizedSnapshot!: Snapshot
    let memoizedSelection!: Selection

    const memoizedSelector = (nextSnapshot: Snapshot) => {
      if (!hasMemo) {
        hasMemo = true
        memoizedSnapshot = nextSnapshot
        const nextSelection = selector(nextSnapshot)

        if (isEqual !== undefined && inst.hasValue) {
          const currentSelection = inst.value as Selection
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
