import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import moment from 'moment'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import crashlytics from '../Crashlytics'
import firestore from './firestore'
import { auth } from '../Auth'
import { languagesType, ProgramActivityType } from '../../../types'
import functions from '../Functions'

export default firestore

export const useFirestoreListener = (collection: string, id: string) => {
  const [snapshotData, setSnapshotData] = useState<Record<string, unknown> | null>()

  useEffect(() => {
    let unsubscribe
    if (id !== undefined) {
      if (id === null || id === '') {
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
          crashlytics().recordError()
        }
      }
    }

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return snapshotData
}

export const updateProfile = (updateObject: Record<string, unknown>) => {
  return firestore().collection('users').doc(auth()?.currentUser?.uid).update(updateObject)
}

export const updateUserProfile = ({ display_name }: { display_name: string }) =>
  updateProfile({
    // add more props as we need to update them from Profile screen
    display_name,
  })

export const updateUserLanguage = (lang: languagesType) =>
  updateProfile({
    language: lang,
  })

export const updateDevideInfo = ({
  app_version,
  language,
  tz,
  tz_offset,
  platform,
}: {
  app_version: string
  language: string
  tz: string
  tz_offset: number
  platform: string
}) =>
  updateProfile({
    app_version,
    language,
    tz,
    tz_offset,
    platform,
  })

export const updatePhoneNumber = ({ phone, isValidPhone }: { phone: string; isValidPhone: boolean }) => {
  updateProfile({
    phone,
    isValidPhone,
  })
}

export const setGender = (gender: 'f' | 'm') =>
  updateProfile({
    gender,
  })

export const getKitById = (code: string) => firestore().collection('kits').doc(code).get()

export const activateKit = () =>
  updateProfile({
    flag_hasViewer: true,
  })

export const burnCode = async (code: string) => {
  await functions().httpsCallable('burnCode')(code)
}

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

export const userWasCongratulatedOnQuitDay = (newModule: number, newLevelOnModule: number) => {
  const { uid } = auth().currentUser
  return firestore().collection('users').doc(uid).update({
    congratulated_on_quit_date: true,
    state: 'ABSTINENCE',
    treatment_module: newModule,
    treatment_level: newLevelOnModule,
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

export const updateDeviceInfo = async ({ token }: { token: string }) => {
  try {
    updateProfile({
      pn_tokens: firestore.FieldValue.arrayUnion(token),
    })
  } catch (error) {
    console.log(error)
  }
}

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

export const updateNoPendingCoachMessage = () =>
  updateProfile({
    'flags.has_coach_messages': false,
  })

export const updateShowBasicTutorialCompleted = (show: boolean) =>
  updateProfile({
    flag_show_basics_tutorial: show,
  })

export const updateShowLifeSaverHelper = (show: boolean) =>
  updateProfile({
    'flags.show_life_saver_helper': show,
  })

export const updateShowChatHelper = (show: boolean) =>
  updateProfile({
    'flags.show_chat_helper': show,
  })

export const updateShowProgramHelper = (show: boolean) =>
  updateProfile({
    'flags.show_program_helper': show,
  })

export const updateShowJournalHelper = (show: boolean) =>
  updateProfile({
    'flags.show_journal_helper': show,
  })

export const updateCrispSessionId = (sessionId: string) =>
  updateProfile({
    crisp_session_id: sessionId,
  })

export const updateWelcomeMessageSeen = () =>
  updateProfile({
    'flags.show_welcome_message_on_chat': false,
  })
export const updateRelapseWarningPopup = (show: boolean) =>
  updateProfile({
    showRelapseWarning: show,
  })

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
