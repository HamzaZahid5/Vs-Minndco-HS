import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'

export type TutorialsState = {
  welcome_tutorial_current_step: number
}

const initialState: TutorialsState = {
  welcome_tutorial_current_step: 0,
}

const teacher = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
    setWelcomeTutorialStep: (state, action) => {
      state.welcome_tutorial_current_step = action.payload
    },
    finishWelcomeTutorialStep: state => {
      state.welcome_tutorial_current_step = 0
    },
  },
})

export default teacher
