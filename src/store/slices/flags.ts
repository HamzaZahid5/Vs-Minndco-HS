import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PathsType } from '../../../types';

export type FlagsState = { isLoading: number; currentPath: PathsType };

const initialState: FlagsState = {
  isLoading: 0,
  currentPath: null,
};

const flagger = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading += action.payload;
    },
    setCurrentPath: (state, action: PayloadAction<PathsType>) => {
      state.currentPath = action.payload;
    },
    resetCurrentPath: state => {
      state.currentPath = null;
    },
  },
});

export default flagger;
