import { createSlice } from '@reduxjs/toolkit';

export type FlagsState = { isLoading: number };

const initialState: FlagsState = {
  isLoading: 0,
};

const flagger = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading += action.payload;
    },
  },
});

export default flagger;
