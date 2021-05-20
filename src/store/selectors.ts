import { RootState } from './reducer';

export const PROGRESS = (store:RootState) => store?.user?.data?.progress;
export const KIT_ACTIVATED = (store:RootState) => store?.user?.data?.kit_id !== '';
export const TREATMENT_MODULE_AND_LEVEL = (store:RootState) => (
  [store?.user?.data.treatment_module, store?.user?.data.treatment_module]
);