import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PathsType } from '../../../types'

export type FlagsState = {
  isLoading: number
  currentPath: PathsType
  showJournalCTAHelper: boolean
  showChatCTAHelper: boolean
  showProgramCTAHelper: boolean
  showLifeSaverCTAHelper: boolean
  showJournalHelper: boolean
  showChatHelper: boolean
  showProgramHelper: boolean
  showLifeSaverHelper: boolean
}

const initialState: FlagsState = {
  isLoading: 0,
  currentPath: null,
  showJournalCTAHelper: false,
  showChatCTAHelper: false,
  showProgramCTAHelper: false,
  showLifeSaverCTAHelper: true,
  showJournalHelper: true,
  showChatHelper: true,
  showProgramHelper: true,
  showLifeSaverHelper: true,
}

const flagger = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading += action.payload
    },
    setCurrentPath: (state, action: PayloadAction<PathsType>) => {
      state.currentPath = action.payload
    },
    resetCurrentPath: state => {
      state.currentPath = null
    },
    // CTA Helpers are glowing circles over bottom tab icons
    // When we change one, we hide the others.
    showJournalCTAHelper: (state, action) => {
      state.showJournalCTAHelper = action.payload
      state.showChatCTAHelper = false
      state.showProgramCTAHelper = false
      state.showLifeSaverCTAHelper = false
    },
    // When we change one, we hide the others.
    showChatCTAHelper: (state, action) => {
      state.showChatCTAHelper = action.payload
      state.showJournalCTAHelper = false
      state.showProgramCTAHelper = false
      state.showLifeSaverCTAHelper = false
    },
    // When we change one, we hide the others.
    showProgramCTAHelper: (state, action) => {
      state.showProgramCTAHelper = action.payload
      state.showChatCTAHelper = false
      state.showJournalCTAHelper = false
      state.showLifeSaverCTAHelper = false
    },
    showLifeSaverCTAHelper: (state, action) => {
      state.showLifeSaverCTAHelper = action.payload
      state.showChatCTAHelper = false
      state.showProgramCTAHelper = false
      state.showJournalCTAHelper = false
    },
    // Helpers are the slides into the home carousel
    // We change helper status and it proper CTA helper
    showJournalHelper: (state, action) => {
      state.showJournalHelper = action.payload
      state.showJournalCTAHelper = action.payload
    },
    // We change helper status and it proper CTA helper
    showChatHelper: (state, action) => {
      state.showChatHelper = action.payload
      state.showChatCTAHelper = action.payload
    },
    // We change helper status and it proper CTA helper
    showProgramHelper: (state, action) => {
      state.showProgramHelper = action.payload
      state.showProgramCTAHelper = action.payload
    },
    showLifeSaverHelper: (state, action) => {
      state.showLifeSaverHelper = action.payload
      state.showLifeSaverCTAHelper = action.payload
    },
  },
})

export default flagger
