import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  data: {
    flags?: {
      show_basics_tutorial: boolean,
    },
  },
  auth: any,
};


const initialState: UserState = {
  data: {},
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
        auth: action.payload,
      }
    },
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default user;
