/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';

export default function useDynamicLinks(): FirebaseDynamicLinksTypes.DynamicLink | null | undefined {
  const [link, setLink] = useState<FirebaseDynamicLinksTypes.DynamicLink | null | undefined>();
  useEffect(() => {
    // TEST OK ON IOS 14. ALWAYS ENTERS HERE EITHER FROM BACKGROUND AND QUIT STATES.
    const unsubscribeDynamicLinks = dynamicLinks().onLink(setLink);

    // ANDROID
    dynamicLinks()
      .getInitialLink()
      .then(dl => {
        if (dl) setLink(dl);
        else setLink(null);
      });
    return () => {
      unsubscribeDynamicLinks();
    };
  }, []);
  return link;
}
