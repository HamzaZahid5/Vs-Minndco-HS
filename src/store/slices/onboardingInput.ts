import { createSlice } from '@reduxjs/toolkit'
import functions from '../../services/Functions'

export type OnboardingInputState = {
  how_much_smoke: number | undefined
  how_much_pay: number | undefined
  what_sentence: number | undefined
}

const initialState: OnboardingInputState = {
  how_much_smoke: undefined,
  how_much_pay: undefined,
  what_sentence: undefined,
}

const flagger = createSlice({
  name: 'currentOnboarding',
  initialState,
  reducers: {
    setHowMuchSmoke: (state, action) => {
      state.how_much_smoke = action.payload
    },
    setHowMuchPay: (state, action) => {
      state.how_much_pay = action.payload
    },
    setWhatSentence: (state, action) => {
      state.what_sentence = action.payload
    },
    finishOnboarding: state => {
      functions().httpsCallable('saveOnboarding')({
        answers: {
          how_much_pay: {
            value: state.how_much_pay,
          },
          how_much_smoke: {
            value: state.how_much_smoke,
          },
          what_sentence: {
            value: state.what_sentence,
          },
        },
      })
    },
  },
})

export default flagger
