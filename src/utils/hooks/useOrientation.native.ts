/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import crashlytics from '../../services/Crashlytics';

import {
  Orientation as expoOrientation,
  getOrientationAsync,
  addOrientationChangeListener,
} from 'expo-screen-orientation';

export type Orientation = 'PORTRAIT' | 'LANDSCAPE';

const castOrientationToString = (orientation: expoOrientation): Orientation => {
  switch (orientation) {
    case expoOrientation.PORTRAIT_DOWN:
    case expoOrientation.PORTRAIT_UP:
    case expoOrientation.UNKNOWN:
      return 'PORTRAIT';
    case expoOrientation.LANDSCAPE_LEFT:
    case expoOrientation.LANDSCAPE_RIGHT:
      return 'LANDSCAPE';
  }
};

const useOrientation = () => {
  const [currentOrientation, setOrientation] = useState<Orientation>();
  useEffect(() => {
    getOrientationAsync()
      .then((orientation: expoOrientation) => {
        setOrientation(castOrientationToString(orientation));
      })
      .catch(error => {
        crashlytics().recordError(error);
      });

    const unsubscribe = addOrientationChangeListener(changeOrientationEvent => {
      setOrientation(castOrientationToString(changeOrientationEvent.orientationInfo.orientation));
    });

    return () => {
      unsubscribe.remove();
    };
  }, []);

  return currentOrientation;
};

export default useOrientation;
