/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import crashlytics from '../../services/Crashlytics';
import { lockAsync, OrientationLock, unlockAsync } from 'expo-screen-orientation';

const useOrientationLocker = (orientationLock: OrientationLock) => {
  const [orientationLocked, setOrientationLocked] = useState<boolean>(false);

  useEffect(() => {
    lockAsync(orientationLock)
      .then(() => setOrientationLocked(true))
      .catch(error => crashlytics().recordError(error));

    return () => {
      unlockAsync().then(() => setOrientationLocked(false));
    };
  }, [orientationLock]);

  return orientationLocked;
};

export default useOrientationLocker;
