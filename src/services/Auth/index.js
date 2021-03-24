import { useState, useEffect } from 'react';
// @ts-ignore
import authentication from './auth';

export const auth = authentication;

export const useAuth = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const unsubscribe = authentication().onAuthStateChanged(async authCredentials => {
      setUserToken(authCredentials);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userToken;
}