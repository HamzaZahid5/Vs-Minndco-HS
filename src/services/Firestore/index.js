import { useEffect, useState } from 'react';
import firestore from './firestore';
import { auth } from '../Auth';

export default firestore;

export const useFirestoreJournalListener = () => {
  const [snapshot, setSnapshot] = useState();
  useEffect(() => {
    let unsubscribe = Function;
    try {
      unsubscribe = firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('journal')
        .orderBy('date', 'desc')
        .limit(10)
        .onSnapshot(sn => {
          setSnapshot(sn);
        });
    } catch (e) {
      alert(e);
    }
    return () => unsubscribe;
  }, []);
  return snapshot;
};

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
        } catch (e) {
          alert(e);
        }
      }
    }

    return () => unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return snapshotData;
};

export const updateProfile = updateObject =>
  firestore().collection('users').doc(auth().currentUser.uid).update(updateObject);

export const updateBasicTutorialCompleted = () =>
  updateProfile({
    'flags.show_basics_tutorial': false,
  });

export const getKitById = code => firestore().collection('kits').doc(code).get();

export const burnCode = code =>
  firestore().collection('kits').doc(code).update({
    burnt_at: firestore.FieldValue.serverTimestamp(),
    used_by: auth().currentUser.uid,
  });

// export const saveStressRecord = (level, activity) =>
//   firestore()
//     .collection('users')
//     .doc(auth().currentUser.uid)
//     .update({
//       'statistics.stressJournal': firestore.FieldValue.arrayUnion({
//         date: new Date(),
//         level,
//         activity,
//       }),
//     });

export const saveActivityDone = ({ treatment_module, treatment_level, activityKey, streak }) =>
  firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .update({
      treatment_module,
      treatment_level,
      progress: firestore.FieldValue.arrayUnion(activityKey),
      'statistics.last_completed_activity_at': firestore.FieldValue.serverTimestamp(),
      'statistics.last_completed_activity': activityKey,
      'statistics.activity_days_in_a_row': streak,
    });

export const resetUserStreak = () =>
  updateProfile({
    'statistics.activity_days_in_a_row': 0,
  });

export const updateDeviceInfo = ({ token }) =>
  updateProfile({
    pn_tokens: firestore.FieldValue.arrayUnion(token),
  });

export const getFirestoreTimestamp = (date = new Date()) => firestore.Timestamp.fromDate(date);
