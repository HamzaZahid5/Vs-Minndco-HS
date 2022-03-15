import { useEffect, useState } from 'react'
import crashlytics from '../Crashlytics'
import firestore from './firestore'
import { auth } from '../Auth'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { languagesType, ProgramActivityType } from '../../../types'
import { PlatformOSType } from 'react-native'
import { SmokeRecordsState } from '../../store/slices/smokeRecord'
import moment from 'moment'

export default firestore

// export const useFirestoreJournalListener = () => {
//   const [snapshot, setSnapshot] = useState()
//   useEffect(() => {
//     let unsubscribe = Function
//     try {
//       unsubscribe = firestore()
//         .collection('users')
//         .doc(auth().currentUser.uid)
//         .collection('journal')
//         .orderBy('date', 'desc')
//         .limit(10)
//         .onSnapshot(sn => {
//           setSnapshot(sn)
//         })
//     } catch (e) {
//       crashlytics().recordError(e)
//     }
//     return () => unsubscribe
//   }, [])
//   return snapshot
// }

export const useFirestoreListener = (collection: string, id: string) => {
  const [snapshotData, setSnapshotData] = useState<Record<string, unknown> | null>()
  useEffect(() => {
    let unsubscribe

    if (id !== undefined) {
      if (id === null) {
        setSnapshotData(null)
      } else {
        try {
          unsubscribe = firestore()
            .collection(collection)
            .doc(id)
            .onSnapshot((userSnapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
              setSnapshotData(userSnapshot?.data() ?? null)
            })
        } catch (e) {
          crashlytics().recordError(e)
        }
      }
    }

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return snapshotData
}

export const updateProfile = (updateObject: Record<string, unknown>) =>
  firestore().collection('users').doc(auth().currentUser.uid).update(updateObject)

export const updateUserLanguage = (lang: languagesType) =>
  updateProfile({
    language: lang,
  })

export const updateUserHardware = ({
  language,
  tz,
  tz_offset,
  platform,
}: {
  language: languagesType
  tz: string
  tz_offset: number
  platform: PlatformOSType
}) =>
  updateProfile({
    language,
    tz,
    tz_offset,
    platform,
  })

export const updateBasicTutorialCompleted = () =>
  updateProfile({
    'flags.show_basics_tutorial': false,
  })

export const getKitById = (code: string) => firestore().collection('kits').doc(code).get()

export const activateKit = () =>
  updateProfile({
    flag_hasViewer: true,
  })

export const burnCode = (code: string) =>
  firestore().collection('kits').doc(code).update({
    burnt_at: firestore.FieldValue.serverTimestamp(),
    used_by: auth().currentUser.uid,
  })

export const saveQuitDay = (date: moment.Moment) => {
  const { uid } = auth().currentUser
  return firestore()
    .collection('users')
    .doc(uid)
    .update({
      quit_day: date.format('YYYY-MM-DD'),
      congratulated_on_quit_date: false,
      'statistics.last_quit_date_change_at': moment.utc().toDate(),
    })
}

export const revertQuitDay = (newDate: moment.Moment, newModule: number, newLevel: number) => {
  const { uid } = auth().currentUser
  return firestore()
    .collection('users')
    .doc(uid)
    .update({
      quit_day: newDate.format('YYYY-MM-DD'),
      congratulated_on_quit_date: false,
      treatment_module: newModule,
      treatment_level: newLevel,
      state: 'RELAPSE',
    })
}

export const saveActivityDone = ({
  treatment_module,
  treatment_level,
  activityKey,
  streak,
}: {
  treatment_module: number
  treatment_level: number
  activityKey: string
  streak: number
}) =>
  updateProfile({
    treatment_module,
    treatment_level,

    progress: firestore.FieldValue.arrayUnion(activityKey),

    'statistics.last_completed_activity_at': firestore.FieldValue.serverTimestamp(),
    'statistics.last_completed_activity': activityKey,
    'statistics.activity_days_in_a_row': streak,
  })

export const resetUserStreak = () =>
  updateProfile({
    'statistics.activity_days_in_a_row': 0,
  })

export const updateDeviceInfo = ({ token }: { token: string }) =>
  updateProfile({
    pushToken: firestore.FieldValue.arrayUnion(token),
  })

export const getFirestoreTimestamp = (date = new Date()) => firestore.Timestamp.fromDate(date)

export const createVrSession = async (uid: string) => {
  const sessionRef = await firestore().collection('vr_sessions').add({
    uid,
    state: 'AWAITING',
    created_at: firestore.FieldValue.serverTimestamp(),

    updated_at: firestore.FieldValue.serverTimestamp(),
  })
  return sessionRef.id
}

export const getVrSession = async (sessionId: string) => {
  const docRef = await firestore().collection('vr_sessions').doc(sessionId).get()
  return { state: docRef.data()?.state, progress: docRef.data()?.progress }
}

export const updateActivityCounter = async (activityType: ProgramActivityType) => {
  let oldCounter = 0
  const docRef = await firestore().collection('users').doc(auth().currentUser.uid).get()
  const userData = docRef.data()
  if (userData?.statistics.activityCounter) {
    oldCounter = userData.statistics.activityCounter[activityType] ?? 0
  }
  const updateObject = {
    [`statistics.activityCounter.${activityType}`]: oldCounter + 1,
  }

  await updateProfile(updateObject)
}

export const getLogStressSurveyData = async (limit = 10) =>
  firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .collection('logs')
    .where('subtype', '==', 'stressrate')
    .orderBy('created_at', 'desc')
    .limit(limit)
    .get()
