import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PathsType } from '../../../types'

export type FlagsState = {
  isLoading: number
  currentPath: PathsType
  // local flag for detection on Home screen focus
  basicTutorialFinished: boolean
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
  basicTutorialFinished: false,
  // used for the handling of call to action states of the tutorial
  // CallToAction
  showJournalCTAHelper: false,
  showChatCTAHelper: false,
  showProgramCTAHelper: false,
  showLifeSaverCTAHelper: false,
  // used for the handling of states of the tutorial
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
      return {
        ...state,
        isLoading: state.isLoading + action.payload,
      }
    },
    setFlags: (state, action) => {
      return {
        ...state,
        basicTutorialFinished: action.payload.flag_show_basics_tutorial,
        showChatHelper:
          action.payload.flags && typeof action.payload.flags.show_chat_helper === 'boolean'
            ? action.payload.flags.show_chat_helper
            : true,
        showLifeSaverHelper:
          action.payload.flags && typeof action.payload.flags.show_life_saver_helper === 'boolean'
            ? action.payload.flags.show_life_saver_helper
            : true,
        showJournalHelper:
          action.payload.flags && typeof action.payload.flags.show_journal_helper === 'boolean'
            ? action.payload.flags.show_journal_helper
            : true,
        showProgramHelper:
          action.payload.flags && typeof action.payload.flags.show_program_helper === 'boolean'
            ? action.payload.flags.show_program_helper
            : true,
        showChatCTAHelper:
          action.payload.flags && typeof action.payload.flags.show_chat_helper === 'boolean'
            ? action.payload.flags.show_chat_helper
            : false,
        showLifeSaverCTAHelper:
          action.payload.flags && typeof action.payload.flags.show_life_saver_helper === 'boolean'
            ? action.payload.flags.show_life_saver_helper
            : false,
        showJournalCTAHelper:
          action.payload.flags && typeof action.payload.flags.show_journal_helper === 'boolean'
            ? action.payload.flags.show_journal_helper
            : false,
        showProgramCTAHelper:
          action.payload.flags && typeof action.payload.flags.show_program_helper === 'boolean'
            ? action.payload.flags.show_program_helper
            : false,
      }
    },
    setShowBasicTutorialFinished: (state, action) => {
      return {
        ...state,
        basicTutorialFinished: action.payload,
      }
    },
    setCurrentPath: (state, action: PayloadAction<PathsType>) => {
      return {
        ...state,
        currentPath: action.payload,
      }
    },
    resetCurrentPath: state => {
      return {
        ...state,
        currentPath: null,
      }
    },
    // CTA Helpers are glowing circles over bottom tab icons
    // When we change one, we hide the others.
    showChatCTAHelper: (state, action) => {
      return {
        ...state,
        // Update cta's
        showChatCTAHelper: action.payload,
        showJournalCTAHelper: false,
        showProgramCTAHelper: false,
        showLifeSaverCTAHelper: false,
      }
    },
    // When we change one, we hide the others.
    showLifeSaverCTAHelper: (state, action) => {
      return {
        ...state,
        // Update cta's
        showLifeSaverCTAHelper: action.payload,
        showChatCTAHelper: false,
        showProgramCTAHelper: false,
        showJournalCTAHelper: false,
      }
    },
    // When we change one, we hide the others.
    showJournalCTAHelper: (state, action) => {
      return {
        ...state,
        // Update cta's
        showJournalCTAHelper: action.payload,
        showChatCTAHelper: false,
        showProgramCTAHelper: false,
        showLifeSaverCTAHelper: false,
      }
    },
    // When we change one, we hide the others.
    showProgramCTAHelper: (state, action) => {
      return {
        ...state,
        // Update cta's
        showProgramCTAHelper: action.payload,
        showChatCTAHelper: false,
        showJournalCTAHelper: false,
        showLifeSaverCTAHelper: false,
      }
    },

    // Helpers are the slides into the home carousel
    // We change helper status and it proper CTA helper
    showJournalHelper: (state, action) => {
      return {
        ...state,
        showJournalHelper: action.payload,
        showJournalCTAHelper: action.payload,
      }
    },
    // We change helper status and it proper CTA helper
    showChatHelper: (state, action) => {
      return {
        ...state,
        showChatHelper: action.payload,
        showChatCTAHelper: action.payload,
      }
    },
    // We change helper status and it proper CTA helper
    showProgramHelper: (state, action) => {
      return {
        ...state,
        showProgramHelper: action.payload,
        showProgramCTAHelper: action.payload,
      }
    },
    // We change helper status and it proper CTA helper
    showLifeSaverHelper: (state, action) => {
      return {
        ...state,
        showLifeSaverHelper: action.payload,
        showLifeSaverCTAHelper: action.payload,
      }
    },
    hideAllCTAHelper: state => {
      return {
        ...state,
        showChatCTAHelper: false,
        showProgramCTAHelper: false,
        showLifeSaverCTAHelper: false,
        showJournalCTAHelper: false,
      }
    },
  },
})

export default flagger
