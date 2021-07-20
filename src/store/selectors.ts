import { RootState } from './reducer';

export const PROGRESS = (store: RootState) => store?.user?.data?.progress;
export const KIT_ACTIVATED = (store: RootState) => store?.user?.data?.kit_id !== '';
export const TREATMENT_MODULE_AND_LEVEL = (store: RootState) => [
  store?.user?.data.treatment_module,
  store?.user?.data.treatment_module,
];
export const LAST_ACTIVITY_AT = (store: RootState) => {
  const fireBaseDate = store?.user?.data?.statistics?.last_completed_activity_at;
  return fireBaseDate ? fireBaseDate.toDate() : undefined;
};
export const ACTIVITY_DAYS_IN_A_ROW = (store: RootState) => store?.user?.data?.statistics?.activity_days_in_a_row;
export const USER_PROFILE = (store: RootState) => {
  const { language, gender } = store?.user?.data;
  return { language, gender };
};
