import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'

export type StressInputState = {
  stressLevel: number,
  triggerActivity: string,
  activitiesDone: Array<string>,
};

const initialState: StressInputState = {
  stressLevel: 0,
  triggerActivity: '',
  activitiesDone: [],
};
// const setFlag = createAction('flags/set')

const flagger = createSlice({
  name: 'currentStress',
  initialState,
  reducers: {
    setStressLevel: (state, action) => {
      state.stressLevel = action.payload;
    },
    setTriggerActivity: (state, action) => {
      state.triggerActivity = action.payload;
    },
    addActivityDone: (state, action) => {
      state.activitiesDone.push(action.payload);
    },
    resetActivitiesDone: (state) => {
      state.activitiesDone = [];
    }
  },
});

export default flagger;
