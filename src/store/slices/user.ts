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
  money_spent: number
  money_by_unit?: number
  cigarettes_baseline?: number
  // average_stress?: number
}
export type UserState = {
  data: {
    app_version?: string
    created_at?: FirebaseFirestoreTypes.Timestamp
    crisp_session_id?: string
    congratulated_on_quit_date?: boolean
    display_name: string
    on_boarding_completed: boolean
    flag_show_basics_tutorial: boolean
    flag_use_vr_fallback: boolean
    flags: {
      show_basics_tutorial?: boolean
      has_coach_messages?: boolean
      show_welcome_message_on_chat?: boolean
      onboarding_complete?: boolean
      kit_confirmed?: boolean
      hasViewer?: boolean
      show_life_saver_helper?: boolean
      show_chat_helper?: boolean
      show_program_helper?: boolean
      show_journal_helper?: boolean
      show_is_valid_phone?: boolean
    }
    showRelapseWarning?: boolean
    missingJournalWarningShown?: boolean
    changeQuitDayIfSmoked?: boolean
    showFinishProgramPopup?: boolean
    showNeedUpdateApp?: boolean
    gender: string
    group?: string
    kit_id: string
    isPremium: boolean
    language: string
    progress: Array<string>
    phone: string
    isValidPhone: boolean
    statistics: UserStatistics
    treatment_module: number
    treatment_level: number
    quit_day: string
    state: string
    view_all_content: boolean
  }
  auth: any
}

const initialState: UserState = {
  auth: {},
  data: {
    app_version: '',
    display_name: '',
    on_boarding_completed: false,
    congratulated_on_quit_date: false,
    flag_show_basics_tutorial: true,
    flag_use_vr_fallback: true,
    flags: {
      show_life_saver_helper: true,
      show_chat_helper: true,
      show_program_helper: true,
      show_journal_helper: true,
      show_is_valid_phone: false,
    },
    showRelapseWarning: true,
    missingJournalWarningShown: false,
    changeQuitDayIfSmoked: false,
    showFinishProgramPopup: false,
    showNeedUpdateApp: false,
    gender: '',
    isPremium: false,
    language: '',
    progress: [],
    phone: '',
    isValidPhone: false,
    quit_day: '',
    statistics: {
      activity_days_in_a_row: 0,
      smokes_by_day: {},
      money_saved: 0,
      money_spent: 0,
      money_by_unit: 0,
      cigarettes_baseline: 0,
    },
    kit_id: '',
    treatment_module: 1,
    treatment_level: 1,
    state: 'RELAPSE',
    view_all_content: false,
  },
}

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
    setShowNeedUpdate: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          showNeedUpdateApp: action.payload,
        },
      }
    },
    setQuitDay: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          quit_day: action.payload,
        },
      }
    },
    setIsValidPhone: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          flags: {
            ...state.data.flags,
            show_is_valid_phone: action.payload,
          },
        },
      }
    },
    setShowIsValidPhone: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          isValidPhone: action.payload,
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
          app_version: action.payload.app_version,
          created_at: action.payload.created_at,
          crisp_session_id: action.payload.crisp_session_id,
          congratulated_on_quit_date: action.payload.congratulated_on_quit_date ?? false,
          display_name: action.payload.display_name,
          flag_show_basics_tutorial: action.payload.flag_show_basics_tutorial,
          on_boarding_completed: action.payload.on_boarding_completed ?? false,
          flags: {
            show_basics_tutorial: action.payload.flag_show_basics_tutorial,
            has_coach_messages: action.payload.flag_has_coach_messages,
            show_welcome_message_on_chat: action.payload.flag_show_welcome_message_on_chat,
            onboarding_complete: action.payload.on_boarding_completed,
            kit_confirmed: action.payload.flag_kit_confirmed,
            hasViewer: action.payload.flag_hasViewer,
            showChatHelper:
              action.payload.flags && typeof action.payload.flags.show_chat_helper === 'boolean'
                ? action.payload.flags.show_chat_helper
                : true,
            showLifeSaverHelper:
              action.payload.flags && typeof action.payload.flags.show_life_saver_helper === 'boolean'
                ? action.payload.flags.show_life_saver_helper
                : true,
            showJournalHelper:
              action.payload.flags && typeof action.payload.flags.show_journal_helper === 'boolean'
                ? action.payload.flags.show_journal_helper
                : true,
            showProgramHelper:
              action.payload.flags && typeof action.payload.flags.show_program_helper === 'boolean'
                ? action.payload.flags.show_program_helper
                : true,
            show_is_valid_phone: false,
          },
          showRelapseWarning: action.payload.showRelapseWarning ?? true,
          gender: action.payload.gender,
          group: action.payload.group,
          isPremium: action.payload.isPremium,
          language: action.payload.language,
          progress: action.payload.progress,
          phone: action.payload.phone,
          isValidPhone: action.payload.isValidPhone,
          quit_day: action.payload.quit_day,
          statistics: {
            last_completed_activity_at:
              action.payload.statistics && action.payload.statistics.last_completed_activity_at,
            activity_days_in_a_row: 0,
            smokes_by_day: action.payload.statistics && action.payload.statistics.smokes_by_day,
            money_saved: action.payload.statistics && action.payload.statistics.money_saved,
            money_spent: action.payload.statistics && action.payload.statistics.money_spent,
            money_by_unit: action.payload.statistics && action.payload.statistics.money_by_unit,
            cigarettes_baseline: action.payload.statistics && action.payload.statistics.cigarettes_baseline,
          },
          treatment_module: action.payload.treatment_module,
          treatment_level: action.payload.treatment_level,
          kit_id: action.payload.kit_id,
          view_all_content: action.payload.view_all_content,
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
    setOnBoardingComplete: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          on_boarding_completed: action.payload,
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
    setShowRelapseWarinigPopup: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          showRelapseWarning: action.payload,
        },
      }
    },
    setMissingJournalWarningShown: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          missingJournalWarningShown: action.payload,
        },
      }
    },
    setCongratulatedOnQuitDay: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          congratulated_on_quit_date: action.payload,
        },
      }
    },
    setShowFinishProgramPopup: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          showFinishProgramPopup: action.payload,
        },
      }
    },
    setShowChangeQuitDayIfSmoked: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          changeQuitDayIfSmoked: action.payload,
        },
      }
    },
    setState: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          state: action.payload,
        },
      }
    },
    setModuleAndLavel: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          treatment_module: action.payload.module,
          treatment_level: action.payload.level,
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
