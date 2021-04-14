import { useEffect, useState } from 'react';
import firestore from './firestore';
import {auth} from '../Auth';

export default firestore;

export const useFirestoreListener = (collection, id) => {
  const [snapshotData, setSnapshotData] = useState();
  useEffect(() => {
    let unsubscribe = Function;
    if (id !== undefined) {
      if (id === null) {
        setSnapshotData(null);
      } else {

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

      }

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
  });

export const getKitById = code => firestore()
    .collection('kits')
    .doc(code)
    .get();

export const burnCode = code => firestore()
  .collection('kits')
  .doc(code)
  .update({
    burnt_at: firestore.FieldValue.serverTimestamp(),
    used_by: auth().currentUser.uid,
  });

export const saveStressRecord = (level, activity) => firestore()
  .collection('users')
  .doc(auth().currentUser.uid)
  .update({
    'statistics.stressJournal':  firestore.FieldValue.arrayUnion({
      date: new Date(),
      level,
      activity,
    }),
  })