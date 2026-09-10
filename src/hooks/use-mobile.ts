import { useSyncExternalStore } from 'react'

const MOBILE_UA =
  /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i

// The user agent never changes for the life of the document, so there is
// nothing to subscribe to.
const subscribe = () => () => {}

const getSnapshot = () => MOBILE_UA.test(navigator.userAgent)

// `navigator` does not exist while rendering on the server; the client
// snapshot takes over on hydration.
const getServerSnapshot = () => false

export const useMobile = () => {
  const isMobile = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  return { isMobile }
}
