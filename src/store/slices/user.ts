import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
//@ts-ignore not implemented
import obfuscate from '../../utils/emailObfuscator';
//@ts-ignore not implemented
import firestore from '../../services/Firestore';
// import { FirebaseTimestamp } from '../../../types';

export type UserStatistics = {
  last_completed_activity_at?: firestore.Timestamp;
  activity_days_in_a_row: number;
};
export type UserState = {
  data: {
    flags?: {
      show_basics_tutorial: boolean;
    };
    progress: Array<string>;
    kit_id: string;
    treatment_module: number;
    treatment_level: number;
    statistics: UserStatistics;
    language: string;
    gender: string;
  };
  auth: any;
};

const initialState: UserState = {
  data: {
    progress: [],
    kit_id: '',
    treatment_module: 1,
    treatment_level: 1,
    statistics: {
      activity_days_in_a_row: 0,
    },
    language: '',
    gender: '',
  },
  auth: {},
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
      state.data = action.payload;
    },
    setLastActivityAt: (state, action) => {
      const newStatistics = { ...state.data.statistics };
      newStatistics.last_completed_activity_at = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          statistics: newStatistics,
        },
      };
    },
  },
});

export default user;
