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
  money_saved: number
  money_by_unit?: number
  cigarettes_baseline?: number
  // average_stress?: number
}
export type UserState = {
  data: {
    created_at?: FirebaseFirestoreTypes.Timestamp
    crisp_session_id?: string
    display_name: string
    flags: {
      show_basics_tutorial?: boolean
      has_coach_messages?: boolean
      show_welcome_message_on_chat?: boolean
      onboarding_complete?: boolean
      kit_confirmed?: boolean
      hasViewer?: boolean
    }
    gender: string
    group?: string
    kit_id: string
    isPremium: boolean
    language: string
    progress: Array<string>
    statistics: UserStatistics
    treatment_module: number
    treatment_level: number
    quit_day: string
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
    quit_day: '',
    statistics: {
      activity_days_in_a_row: 0,
      smokes_by_day: {},
      money_saved: 0,
      money_by_unit: 0,
      cigarettes_baseline: 0,
    },
    kit_id: '',
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
          email: action.payload.email ? obfuscate(action.payload.email) : '',
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
          created_at: action.payload.created_at,
          crisp_session_id: action.payload.crisp_session_id,
          display_name: action.payload.display_name,
          flags: {
            show_basics_tutorial: action.payload.flag_show_basics_tutorial,
            has_coach_messages: action.payload.flag_has_coach_messages,
            show_welcome_message_on_chat: action.payload.flag_show_welcome_message_on_chat,
            onboarding_complete: action.payload.on_boarding_completed,
            kit_confirmed: action.payload.flag_kit_confirmed,
            hasViewer: action.payload.flag_hasViewer,
          },
          gender: action.payload.gender,
          group: action.payload.group,
          isPremium: action.payload.isPremium,
          language: action.payload.language,
          progress: action.payload.progress,
          quit_day: action.payload.quit_day,
          statistics: {
            last_completed_activity_at: action.payload.statistics.last_completed_activity_at,
            activity_days_in_a_row: 0,
            smokes_by_day: action.payload.statistics.smokes_by_day,
            money_saved: action.payload.statistics.money_saved,
            money_by_unit: action.payload.statistics.money_by_unit,
            cigarettes_baseline: action.payload.statistics.cigarettes_baseline,
          },
          treatment_module: action.payload.treatment_module,
          treatment_level: action.payload.treatment_level,
          kit_id: action.payload.kit_id,
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
    logout: (state, action) => {
      return {
        ...state,
        auth: {
          uid: undefined,
          email: undefined,
        },
      }
    },
  },
})

export default user
