---
title: Use useSyncExternalStore to implement useIsOnline
description: Learn how to use the React useSyncExternalStore hook to implement network status monitoring, creating a reliable online status detection component
date: 2025-06-16T12:25:09.320Z
duration: 3min
keywords:
  - useSyncExternalStore
  - react
  - react useSyncExternalStore
---

```ts title="use-is-online.ts"
import { useSyncExternalStore } from 'react'

function getSnapshot() {
  return navigator.onLine
}

function getServerSnapshot() {
  return true
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('online', onStoreChange)
  window.addEventListener('offline', onStoreChange)

  return () => {
    window.removeEventListener('online', onStoreChange)
    window.removeEventListener('offline', onStoreChange)
  }
}

export function useIsOnline() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
```

Each time the `subscribe` `onStoreChange` function is executed, it will execute `getSnapshot` to get the latest value, triggering rendering

`getSnapshot` returns an immutable value each time

`getServerSnapshot` is the value initialized in server-side rendering

Official documentation [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)


<Sandpack template="react">

```js title="App.js"
'use client'
import { useIsOnline } from './use-is-online'

export default function Page() {
  const isOnline = useIsOnline()

  return (
    <div>
      <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
    </div>
  )
}
```

```js title="use-is-online.js"
import { useSyncExternalStore } from 'react'

function getSnapshot() {
  return navigator.onLine
}

function getServerSnapshot() {
  return true
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('online', onStoreChange)
  window.addEventListener('offline', onStoreChange)

  return () => {
    window.removeEventListener('online', onStoreChange)
    window.removeEventListener('offline', onStoreChange)
  }
}

export function useIsOnline() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
```

</Sandpack>
