/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import useDynamicLinks from './useDynamicLinks';
import usePushNotifications from './usePushNotifications';

export default function useDeepLinking(initialValue: string | undefined = undefined): string | null | undefined {
  const dynamicLink = useDynamicLinks();
  const remoteMessage = usePushNotifications();
  const [remoteMessageDL, setRemoteMessageDL] = useState<string | null>();
  const [dynamicLinkDL, setDynamicLinkDL] = useState<string | null>();
  const [deepLink, setDeepLink] = useState<string | null | undefined>(initialValue);

  useEffect(() => {
    const remoteDeepLink = remoteMessage?.data?.deepLinking;
    if (remoteDeepLink) {
      // remote message resolved with route
      setRemoteMessageDL(remoteDeepLink);
    } else if (remoteMessage !== undefined) {
      // remote message resolved with no deep link
      setRemoteMessageDL(null);
    }
    // otherwise keep deepLink as unresolved
  }, [remoteMessage]);

  useEffect(() => {
    // wildcard to handle navigation from dynamic link.
    if (dynamicLink?.url.includes('https://relief.the-mind.company/nav/')) {
      // converts something like https://relief.the-mind.company/nav/KitActivation
      // into => KitActivation
      const screen = dynamicLink.url.replace('https://relief.the-mind.company/nav/', '');
      setDynamicLinkDL(screen);
    } else {
      // add custom dlink resolution here.

      if (dynamicLink !== undefined) {
        // dynamic link resolved with null
        setDynamicLinkDL(null);
      }
    }
    // otherwise keep dynamic link as unresolved
  }, [dynamicLink]);

  useEffect(() => {
    // once both have resolved
    if (dynamicLinkDL !== undefined && remoteMessageDL !== undefined) {
      // save the valid one or falsy if any is a truthy value.
      setDeepLink(dynamicLinkDL || remoteMessageDL);
    }
  }, [dynamicLinkDL, remoteMessageDL]);

  return deepLink;
}
