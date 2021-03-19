import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'

export type FlagsState = { isLoading: number };

const initialState: FlagsState = {
  isLoading: 0,
};
// const setFlag = createAction('setFlag')

const flagger = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    setIsLoading: (state, action) => state.isLoading += action.payload,
  },
});

export default flagger;
