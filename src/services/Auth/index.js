import { useState, useEffect } from 'react';
import { useSelector, useStore, useDispatch } from 'react-redux';
// @ts-ignore
import authentication from './auth';

export const auth = authentication;

export const useAuth = () => {
  const [userToken, setUserToken] = useState();

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