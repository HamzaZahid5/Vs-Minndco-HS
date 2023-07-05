import { createSlice } from '@reduxjs/toolkit'

export type SmokeRecordsState = { [key: string]: number }

const initialState: SmokeRecordsState = {}

const flagger = createSlice({
  name: 'smoke_record',
  initialState,
  reducers: {
    setSmokesByDay: (state, action) => {
      return action.payload.smokes_by_day
    },
  },
})

export default flagger
