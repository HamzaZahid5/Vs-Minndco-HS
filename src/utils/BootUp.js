import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// selector
const getUserIdfromAuth = state => state.user?.auth?.uid;

export default ({ onReady }) => {
  const uid = useSelector(getUserIdfromAuth);
  useEffect(() => {
    if (uid) {
      console.log('READY TO LOAD USER');
      onReady();
    }
  }, [uid]);
  return null;
}