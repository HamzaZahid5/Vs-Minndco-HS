/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { lockAsync, OrientationLock, unlockAsync } from 'expo-screen-orientation';

const useOrientationLocker = (orientationLock: OrientationLock) => {
  const [orientationLocked, setOrientationLocked] = useState<boolean>(false);

  useEffect(() => {
    lockAsync(orientationLock)
      .then(() => setOrientationLocked(true))
      .catch(error => console.error('Error locking orientation: ', error));

    return () => {
      unlockAsync().then(() => setOrientationLocked(false));
    };
  }, [orientationLock]);

  return orientationLocked;
};

export default useOrientationLocker;
