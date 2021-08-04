/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import useDynamicLinks from './useDynamicLinks';

export default function useDeepLinking(initialValue: string | undefined = undefined): string | null | undefined {
  const dynamicLink = useDynamicLinks();
  const [dynamicLinkDL, setDynamicLinkDL] = useState<string | null>();
  const [deepLink, setDeepLink] = useState<string | null | undefined>(initialValue);

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
    if (dynamicLinkDL !== undefined) {
      // save the valid one or falsy if any is a truthy value.
      setDeepLink(dynamicLinkDL);
    }
  }, [dynamicLinkDL]);

  return deepLink;
}
