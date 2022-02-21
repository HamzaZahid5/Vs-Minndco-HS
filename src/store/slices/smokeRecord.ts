import { createSlice } from '@reduxjs/toolkit'

export type SmokeRecordsState = { [key: string]: number }

const initialState: SmokeRecordsState = {}

const flagger = createSlice({
  name: 'smoke_record',
  initialState,
  reducers: {},
})

export default flagger
