import { RootState } from './reducer';

export const PROGRESS = (store: RootState) => store?.user?.data?.progress;
export const KIT_ACTIVATED = (store: RootState) => store?.user?.data?.kit_id !== '';
export const TREATMENT_MODULE_AND_LEVEL = (store: RootState) => [
  store?.user?.data.treatment_module,
  store?.user?.data.treatment_level,
];
export const LAST_ACTIVITY_AT = (store: RootState) => {
  const fireBaseDate = store?.user?.data?.statistics?.last_completed_activity_at;
  return fireBaseDate ? fireBaseDate.toDate() : undefined;
};
export const ACTIVITY_DAYS_IN_A_ROW = (store: RootState) => store?.user?.data?.statistics?.activity_days_in_a_row;
export const CURRENT_PATH = (store: RootState) => store?.flags.currentPath;
export const SHOW_BASIC_TUTORIAL = (store: RootState) => store?.user?.data?.flags?.show_basics_tutorial;
export const ONBOARDING_COMPLETE = (store: RootState) => store?.user?.data?.flags?.onboarding_complete;
export const AVERAGE_STRESS = (store: RootState) => store?.user?.data?.statistics?.average_stress;
export const USER_PROFILE = (store: RootState) => {
  const { language, gender } = store?.user?.data;
  return { language, gender };
};
export const USER_SUPPORT_PROFILE = (store: RootState) => {
  const {
    crisp_session_id,
    display_name,
    flags: { has_coach_messages, show_welcome_message_on_chat },
    group,
    kit_id,
  } = store?.user?.data;
  const { uid, email } = store?.user?.auth;
  return {
    crisp_session_id,
    has_coach_messages,
    show_welcome_message_on_chat,
    display_name,
    group,
    kit_id,
    uid,
    email,
  };
};

export const FLAGS = (store: RootState) => store?.flags;
export const AUTH_INFO = (store: RootState) => store?.user?.auth;
export const CURRENT_STRESS_INPUT = (store: RootState) => store?.currentStressInput;
export const TUTORIALS_STATE = (store: RootState) => store?.tutorials;
