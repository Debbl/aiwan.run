---
title: 使用 useSyncExternalStore 实现 useIsOnline
date: 2025-06-16T12:25:09.320Z
duration: 3min
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

每次 `subscribe` 的 `onStoreChange` 函数执行的时候都会执行一遍 `getSnapshot` 获取一遍最新的值，触发渲染

`getSnapshot` 每次返回一个不可变的值

`getServerSnapshot` 在服务端渲染初始化的值

官方文档 [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)


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
