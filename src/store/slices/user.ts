import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
//@ts-ignore
import obfuscate from '../../utils/emailObfuscator';

export type UserState = {
  data: {
    flags?: {
      show_basics_tutorial: boolean,
    },
    progress: Array<string>,
    kit_id: string,
  },
  auth: any,
};


const initialState: UserState = {
  data: {
    progress: [],
    kit_id: '',
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
      }
    },
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default user;
