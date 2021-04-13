import { useEffect, useState } from 'react';
import firestore from './firestore';
import {auth} from '../Auth';

export default firestore;

export const useFirestoreListener = (collection, id = null) => {
  const [snapshotData, setSnapshotData] = useState();
  useEffect(() => {
    if (id === null) return;
    
    let unsubscribe = Function;
    try {
      unsubscribe = firestore()
        .collection(collection)
        .doc(id)
        .onSnapshot(userSnapshot => {
          setSnapshotData(userSnapshot?.data() ?? null);
        });
    } catch(e) {
      alert(e);
    }
    
    return () => unsubscribe;
  }, [id]);

  return snapshotData;
};

export const updateBasicTutorialCompleted = () => firestore()
  .collection('users')
  .doc(auth().currentUser.uid)
  .update({
    'flags.show_basics_tutorial': false
  })
