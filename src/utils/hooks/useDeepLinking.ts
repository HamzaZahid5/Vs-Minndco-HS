/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import useDynamicLinks from './useDynamicLinks'
import usePushNotifications from './usePushNotifications'
import { parseDeepLink } from '../helpers'

export default function useDeepLinking(initialValue: string | undefined = undefined): string | null | undefined {
  const dynamicLink = useDynamicLinks()
  const remoteMessage = usePushNotifications()
  const [remoteMessageDL, setRemoteMessageDL] = useState<string | null>()
  const [dynamicLinkDL, setDynamicLinkDL] = useState<string | null>()
  const [deepLink, setDeepLink] = useState<string | null | undefined>(initialValue)

  useEffect(() => {
    const remoteDeepLink = remoteMessage?.data?.deepLinking
    if (remoteDeepLink) {
      // remote message resolved with route
      setRemoteMessageDL(remoteDeepLink)
    } else if (remoteMessage !== undefined) {
      // remote message resolved with no deep link
      setRemoteMessageDL(null)
    }
    // otherwise keep deepLink as unresolved
  }, [remoteMessage])

  useEffect(() => {
    const { isNextGen, command } = parseDeepLink(dynamicLink?.url || '')
    if (isNextGen) {
      // sets nav/[screen name] or
      // sets auth/[JWT] or
      // sets signin/[enrollment id]
      setDynamicLinkDL(command)
    } else {
      // old way to manage DL preserved for legacy, versions < 5
      // wildcard to handle navigation from dynamic link.
      if (dynamicLink?.url.includes('https://www.mindcotine.com/nav/')) {
        // converts something like https://relief.the-mind.company/nav/KitActivation
        // into => KitActivation
        const screen = dynamicLink.url.replace('https://www.mindcotine.com/nav/', '')
        setDynamicLinkDL(`nav/${screen}`)
      } else if (dynamicLink?.url.includes('https://www.mindcotine.com/auth/')) {
        // detects token auth attempt, saves auth/{token}
        const authKey = dynamicLink.url.replace('https://www.mindcotine.com/', '')
        setDynamicLinkDL(`auth/${authKey}`)
      } else {
        // add custom dlink resolution here.

        if (dynamicLink !== undefined) {
          // dynamic link resolved with null
          setDynamicLinkDL(null)
        }
      }
    }
    // otherwise keep dynamic link as unresolved
  }, [dynamicLink])

  useEffect(() => {
    // once both have resolved
    if (dynamicLinkDL !== undefined && remoteMessageDL !== undefined) {
      // save the valid one or falsy if any is a truthy value.
      setDeepLink(dynamicLinkDL || remoteMessageDL)
    }
  }, [dynamicLinkDL, remoteMessageDL])

  return deepLink
}
