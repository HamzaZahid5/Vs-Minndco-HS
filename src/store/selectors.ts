import { RootState } from './reducer';

export const PROGRESS = (store:RootState) => store?.user?.data?.progress;
export const KIT_ACTIVATED = (store:RootState) => store?.user?.data?.kit_id !== '';