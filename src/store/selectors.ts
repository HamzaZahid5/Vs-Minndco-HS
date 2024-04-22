import { RootState } from './reducer'
import { SmokeRecordsState } from './slices/smokeRecord'

export const PROGRESS = (store: RootState) => store?.user?.data?.progress
export const IS_PREMIUM = (store: RootState) => store?.user?.data?.isPremium
export const KIT_ACTIVATED = (store: RootState) => Boolean(store?.user?.data?.kit_id)
export const KIT_CONFIRMED = (store: RootState) => store?.user?.data?.flags?.kit_confirmed === true
export const HAS_VIEWER = (store: RootState) => Boolean(store?.user?.data?.flags?.hasViewer)
export const QUIT_DAY = (store: RootState) => store?.user?.data?.quit_day
export const TREATMENT_MODULE_AND_LEVEL = (store: RootState) => [
  store?.user?.data.treatment_module,
  store?.user?.data.treatment_level,
]
export const LAST_ACTIVITY_AT = (store: RootState) => {
  const fireBaseDate = store?.user?.data?.statistics?.last_completed_activity_at
  return fireBaseDate ? fireBaseDate.toDate() : undefined
}
export const ACTIVITY_DAYS_IN_A_ROW = (store: RootState) => store?.user?.data?.statistics?.activity_days_in_a_row
export const CURRENT_PATH = (store: RootState) => store?.flags.currentPath
export const SHOW_BASIC_TUTORIAL = (store: RootState) => store?.user?.data?.flag_show_basics_tutorial
export const ONBOARDING_CURRENT_INPUT = (store: RootState) => store?.currentOnboarding
export const ONBOARDING_COMPLETE = (store: RootState) => store?.user?.data?.on_boarding_completed
// export const AVERAGE_STRESS = (store: RootState) => store?.user?.data?.statistics?.average_stress
export const USER_PROFILE = (store: RootState) => {
  const { language, gender, created_at } = store?.user?.data
  return { language, gender, created_at }
}
export const USER_SUPPORT_PROFILE = (store: RootState) => {
  const {
    crisp_session_id,
    display_name,
    flags: { has_coach_messages, show_welcome_message_on_chat },
    group,
    phone,
    isValidPhone,
    kit_id,
    view_all_content,
  } = store?.user?.data
  const { uid, email } = store?.user?.auth
  return {
    crisp_session_id,
    has_coach_messages,
    show_welcome_message_on_chat,
    display_name,
    group,
    phone,
    isValidPhone,
    kit_id,
    uid,
    email,
    view_all_content,
  }
}
export const LANGUEGE = (store: RootState) => store?.user?.data?.language
export const MISSING_JOURNAL_WARNING_SHOWN = (store: RootState) => store?.user?.data?.missingJournalWarningShown
export const CONGRATULATED_ON_QUIT_DATE = (store: RootState) => store?.user?.data?.congratulated_on_quit_date
export const SHOW_FINISH_PROGRAM = (store: RootState) => store?.user?.data?.showFinishProgramPopup
export const SHOW_RELAPSE_WARNING = (store: RootState) => store?.user?.data?.showRelapseWarning
export const CHANGE_QUIT_DAY_IF_SMOKED = (store: RootState) => store?.user?.data?.changeQuitDayIfSmoked
export const FLAGS = (store: RootState) => store?.flags
// export const USER_FLAGS = (store: RootState) => store?.user?.data?.flags
export const AUTH_INFO = (store: RootState) => store?.user?.auth
export const CURRENT_STRESS_INPUT = (store: RootState) => store?.currentStressInput
export const TUTORIALS_STATE = (store: RootState) => store?.tutorials
export const SMOKE_RECORD = (store: RootState) => store?.user?.data?.statistics?.smokes_by_day as SmokeRecordsState
export const MONEY_SAVED = (store: RootState) => {
  const savings = store?.user?.data?.statistics?.money_saved || 0
  return Math.round(Number(savings) * 10) / 10
}
export const MONEY_SPENT = (store: RootState) => {
  const savings = store?.user?.data?.statistics?.money_spent || 0
  return Math.round(Number(savings) * 10) / 10
}
export const PRICE_BY_UNIT = (store: RootState) => store?.user?.data?.statistics?.money_by_unit || 0
export const SMOKE_BASLINE = (store: RootState) => store?.user?.data?.statistics?.cigarettes_baseline || 0
export const STATE = (store: RootState) => store?.user.data.state || 'RELAPSE'
export const APP_VERSION = (store: RootState) => store?.user.data.app_version
export const SHOW_NEED_UPDATE_APP = (store: RootState) => store?.user.data.showNeedUpdateApp
export const IS_VALID_PHONE = (store: RootState) => store?.user?.data?.isValidPhone
export const SHOW_IS_VALID_PHONE = (store: RootState) => store?.user?.data?.flags?.show_is_valid_phone

// SMOKES LOCAL
export const SMOKES_LOCAL = (store: RootState) => store?.smokeRecord
