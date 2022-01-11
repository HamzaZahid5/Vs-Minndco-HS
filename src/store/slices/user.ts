import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
//@ts-ignore not implemented
import obfuscate from '../../utils/emailObfuscator';
//@ts-ignore not implemented
import firestore from '../../services/Firestore';
// import { FirebaseTimestamp } from '../../../types';

export type UserStatistics = {
  last_completed_activity_at?: firestore.Timestamp;
  activity_days_in_a_row: number;
  average_stress?: number;
};
export type UserState = {
  data: {
    crisp_session_id?: string;
    display_name: string;
    flags: {
      show_basics_tutorial?: boolean;
      has_coach_messages?: boolean;
      show_welcome_message_on_chat?: boolean;
      onboarding_complete?: boolean;
    };
    gender: string;
    group?: string;
    kit_id: string;
    language: string;
    progress: Array<string>;
    statistics: UserStatistics;
    treatment_module: number;
    treatment_level: number;
  };
  auth: any;
};

const initialState: UserState = {
  auth: {},
  data: {
    display_name: '',
    flags: {},
    gender: '',
    kit_id: '',
    language: '',
    progress: [],
    statistics: {
      activity_days_in_a_row: 0,
    },
    treatment_module: 1,
    treatment_level: 1,
  },
};
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
      };
    },
    setUser: (state, action) => {
      const oldOnBoardingFlag = state.data.flags.onboarding_complete;
      state.data = action.payload;
      if (oldOnBoardingFlag) {
        state.data.flags.onboarding_complete = oldOnBoardingFlag; //Use local onBoardingComplete flag, zoho is very slow and webhook is called after setState
      }
    },
    setLastActivityAt: (state, action) => {
      const newStatistics = { ...state.data.statistics };
      newStatistics.last_completed_activity_at = action.payload.date;
      const newProgress = [...state.data.progress, action.payload.key];
      return {
        ...state,
        data: {
          ...state.data,
          statistics: newStatistics,
          progress: newProgress,
        },
      };
    },
    onBoardingComplete: state => {
      state.data.flags.onboarding_complete = true;
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
      };
    },
  },
});

export default user;
