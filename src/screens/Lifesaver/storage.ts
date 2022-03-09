import { chatOptionType } from './ChatItem'
import { options } from './../../../_src/screens/StressTrigger/index'
export type urgeType = 'low' | 'manageable' | 'instense'
export type placeType = 'home' | 'work' | 'party' | 'street' | 'other_place'
export type companyType = 'alone' | 'someone'

export type stateType = {
  showWelcome: boolean
  user: string
  userUrge?: urgeType
  userPlace?: placeType
  userCompany?: companyType
  isThinking: boolean
  chatHistory: messageType[]
}
export type reducerActionType = {
  type: string
  payload: unknown
}
export type messageType = {
  user: string
  id: string
  text: string
  options: chatOptionType[]
}

export const initialState: stateType = {
  showWelcome: false,
  user: '',
  // userUrge: undefined,
  // userPlace: false,
  // userCompany: false,
  isThinking: false,
  chatHistory: [],
}

export const reducer = (state: stateType, action: reducerActionType): stateType => {
  switch (action.type) {
    case 'SHOW_WELCOME':
      return { ...state, showWelcome: true }
    case 'SET_USER_URGE':
      return { ...state, userUrge: action.payload as urgeType }
    case 'SET_USER_PLACE':
      return { ...state, userPlace: action.payload as placeType }
    case 'SET_USER_COMPANY':
      return { ...state, userCompany: action.payload as companyType }
    case 'SET_THINKING':
      return { ...state, isThinking: action.payload as boolean }
    case 'PUSH_MESSAGE':
      const messageBody = action.payload as messageType
      // overwrites user field with current user from state
      if (messageBody.user !== 'coach') {
        messageBody.user = state.user
      }
      return {
        ...state,
        chatHistory: [{ ...messageBody }, ...state.chatHistory],
      }
    case 'SET_USER_NAME':
      return { ...state, user: action.payload as string }
    case 'RESET_STATE':
      return initialState
    case 'CANCEL':
      return state
    default:
      throw new Error()
  }
}
