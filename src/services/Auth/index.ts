/**
 * File for web version:
 *  avoid import @react-native-firebase/auth since is not compatible with web.
 *  exports the useAuth webhook that behaives similar to Firebase Auth but of course
 *  is fake and should not be used on production.
 */
import { useState, useEffect } from 'react';
// import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const useAuth = () => {
  const [userToken, setUserToken] = useState<any | null>(null);

  useEffect(() => {
    // @ts-ignore
    window.mocked_onAuthStateChanged = () => {
      setUserToken(true);
      return () => {}
    };

    return () => {
      // @ts-ignore
      delete window.mocked_onAuthStateChanged;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userToken;
}