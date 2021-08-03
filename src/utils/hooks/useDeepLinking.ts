/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import useDynamicLinks from './useDynamicLinks';

export default function useDeepLinking(initialValue: string | undefined = undefined): string | null | undefined {
  const dynamicLink = useDynamicLinks();
  const [dynamicLinkDL, setDynamicLinkDL] = useState<string | null>();
  const [deepLink, setDeepLink] = useState<string | null | undefined>(initialValue);

  useEffect(() => {
    if (dynamicLink?.url === 'https://www.mindcotine.com/coach') {
      setDynamicLinkDL('mindcotine_mobile.Support');
    } else if (dynamicLink?.url === 'https://www.mindcotine.com/test') {
      setDynamicLinkDL('Support');
    } else if (dynamicLink?.url === 'https://www.mindcotine.com/activation') {
      setDynamicLinkDL('mindcotine_mobile.KitActivation');
    } else if (dynamicLink?.url.includes('https://www.mindcotine.com/')) {
      // convert this https://www.mindcotine.com/mindcotine_mobile.KitActivation
      // into => mindcotine_mobile.KitActivation
      setDynamicLinkDL(dynamicLink.url.replace('https://www.mindcotine.com/', ''));
    } else if (dynamicLink !== undefined) {
      // dynamic link resolved with null
      setDynamicLinkDL(null);
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
