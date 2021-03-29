import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '../services/Firestore';

// selector
const getUserIdfromAuth = state => state.user?.auth?.uid;

export default ({ onReady }) => {
  const userId = useSelector(getUserIdfromAuth);
  const actionSetUser = useDispatch();
  const loadUser = async uid => {
    // const { uid } = auth().currentUser;
    const data = (await firestore()
      .collection('users')
      .doc(uid)
      .get()).data();
    actionSetUser({ type: 'user/setUser', payload: data });
    onReady();
  }
  useEffect(() => {
    if (userId) {
      loadUser(userId);
    }
  }, [userId]);
  return null;
}