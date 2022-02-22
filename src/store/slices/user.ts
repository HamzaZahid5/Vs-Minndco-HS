import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
//@ts-ignore not implemented
import obfuscate from '../../utils/emailObfuscator'
import { SmokeRecordsState } from './smokeRecord'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
// import { FirebaseTimestamp } from '../../../types';

export type UserStatistics = {
  last_completed_activity_at?: FirebaseFirestoreTypes.Timestamp
  activity_days_in_a_row: number
  smokes_by_day: SmokeRecordsState
  // average_stress?: number
}
export type UserState = {
  data: {
    crisp_session_id?: string
    display_name: string
    flags: {
      show_basics_tutorial?: boolean
      has_coach_messages?: boolean
      show_welcome_message_on_chat?: boolean
      onboarding_complete?: boolean
      kit_confirmed?: boolean
    }
    gender: string
    group?: string
    // kit_id: string
    isPremium: boolean
    language: string
    progress: Array<string>
    statistics: UserStatistics
    treatment_module: number
    treatment_level: number
  }
  auth: any
}

const initialState: UserState = {
  auth: {},
  data: {
    display_name: '',
    flags: {},
    gender: '',
    isPremium: false,
    language: '',
    progress: [],
    statistics: {
      activity_days_in_a_row: 0,
      smokes_by_day: {},
    },
    treatment_module: 1,
    treatment_level: 1,
  },
}
// const setFlag = createAction('flags/set')

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state,
        auth: {
          uid: action.payload.uid,
          email: obfuscate(action.payload.email),
        },
      }
    },
    setUser: (state, action) => {
      const oldOnBoardingFlag = state.data.flags.onboarding_complete
      // Firebase to Redux
      return {
        ...state,
        data: {
          ...state.data,
          crisp_session_id: action.payload.crisp_session_id,
          display_name: action.payload.display_name,
          flags: {
            show_basics_tutorial: action.payload.flag_show_basics_tutorial,
            has_coach_messages: action.payload.flag_has_coach_messages,
            show_welcome_message_on_chat: action.payload.flag_show_welcome_message_on_chat,
            onboarding_complete: action.payload.on_boarding_completed,
            kit_confirmed: action.payload.flag_kit_confirmed,
          },
          gender: action.payload.gender,
          group: action.payload.group,
          isPremium: action.payload.isPremium,
          language: action.payload.language,
          progress: action.payload.progress,
          statistics: {
            last_completed_activity_at: action.payload.statistics.last_completed_activity_at,
            activity_days_in_a_row: 0,
            smokes_by_day: action.payload.statistics.smokes_by_day,
          },
          treatment_module: action.payload.treatment_module,
          treatment_level: action.payload.treatment_level,
        },
      }
      // if (oldOnBoardingFlag) {
      //   state.data.flags.onboarding_complete = oldOnBoardingFlag //Use local onBoardingComplete flag, zoho is very slow and webhook is called after setState
      // }
    },
    setLastActivityAt: (state, action) => {
      const newStatistics = { ...state.data.statistics }
      newStatistics.last_completed_activity_at = action.payload.date
      const newProgress = [...state.data.progress, action.payload.key]
      return {
        ...state,
        data: {
          ...state.data,
          statistics: newStatistics,
          progress: newProgress,
        },
      }
    },
    onBoardingComplete: state => {
      state.data.flags.onboarding_complete = true
    },
    tutorialDone: state => {
      return {
        ...state,
        data: {
          ...state.data,
          flags: {
            ...state.data.flags,
            show_basics_tutorial: false,
          },
        },
      }
    },
  },
})

export default user
