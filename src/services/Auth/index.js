import { useState, useEffect } from 'react';
// @ts-ignore
import auth from './auth';

export default auth;

export const useAuth = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async authCredentials => {
      setUserToken(authCredentials);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return userToken;
}