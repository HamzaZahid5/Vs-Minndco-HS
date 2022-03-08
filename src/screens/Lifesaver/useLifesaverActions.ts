import React, { useReducer, useEffect, useState } from 'react'
import { translate } from '../../utils/localization'
import { reducerActionType } from './storage'
import { LIFESAVER_URGE, LIFESAVER_PLACES, LIFESAVER_COMPANY } from './constants'
import { getLocale } from './../../utils/localization'

type APIType = {
  sayWelcome: () => void
  handleUserAnswer: (eventType: string, optionLabel: string, optionId: string) => void
  userMessage: (message: string) => void
  askForPlace: () => void
  askForCompany: () => void
  tellFindingActivity: () => void
  tellToPerformActivity: () => void
}

const getWelcomeMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: 'coach',
    text: translate('screens.lifesaver.coachMsgHello', { defaultValue: 'Hola tarola' }),
  },
})

const getCancelMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: 'bd7acbea-c1b1-46c2-aed5-34563456d',
    user: 'coach',
    text: translate('screens.lifesaver.cancelMessage', { defaultValue: 'No me acuerdo que iba aca' }),
  },
})

const getUrgeQuestionMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    user: 'coach',
    text: translate('screens.lifesaver.coachMsgUrgeQuestion'),
    options: [
      {
        action: 'SET_USER_URGE',
        id: LIFESAVER_URGE.LOW,
        label: translate('screens.lifesaver.optionsUrgeLow'),
      },
      {
        action: 'SET_USER_URGE',
        id: LIFESAVER_URGE.MANAGEABLE,
        label: translate('screens.lifesaver.optionsUrgeManageable'),
      },
      {
        action: 'SET_USER_URGE',
        id: LIFESAVER_URGE.INTENSE,
        label: translate('screens.lifesaver.optionsUrgeIntense'),
      },
    ],
  },
})

const getPlaceQuestionMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac63afc-c605-43d3-a4f3-fbd91aa97f63',
    user: 'coach',
    text: translate('screens.lifesaver.coachMsgPlaceQuestion'),
    options: [
      {
        action: 'SET_USER_PLACE',
        id: LIFESAVER_PLACES.HOME,
        label: translate('screens.lifesaver.optionsPlaceHome'),
      },
      {
        action: 'SET_USER_PLACE',
        id: LIFESAVER_PLACES.WORK,
        label: translate('screens.lifesaver.optionsPlaceWork'),
      },
      {
        action: 'SET_USER_PLACE',
        id: LIFESAVER_PLACES.STREET,
        label: translate('screens.lifesaver.optionsPlaceWalking'),
      },
      {
        action: 'SET_USER_PLACE',
        id: LIFESAVER_PLACES.OTHER,
        label: translate('screens.lifesaver.optionsPlaceOther'),
      },
    ],
  },
})
const getUserMessage = (message: string) => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: message,
    user: 'user',
    text: message,
  },
})
const getCompanyQuestionMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac69afc-c605-49d9-a4f9-fbd91aa97f63',
    user: 'coach',
    text: translate('screens.lifesaver.coachMsgCompanyQuestion'),
    options: [
      {
        action: 'SET_USER_COMPANY',
        id: LIFESAVER_COMPANY.ALONE,
        label: translate('screens.lifesaver.optionsCompanyAlone'),
      },
      {
        action: 'SET_USER_COMPANY',
        id: LIFESAVER_COMPANY.SOMEONE,
        label: translate('screens.lifesaver.optionsCompanySomeone'),
      },
    ],
  },
})
const getFindingActivityMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac65afc-c605-45d5-a4f5-fbd51aa57f63',
    user: 'coach',
    text: translate('screens.lifesaver.coachMsgFindingActivity'),
  },
})
const getActivityOptions = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac60afc-c600-40d0-a4f0-fbd01aa07f63',
    user: 'coach',
    text: 'Do you want to do an activity to improve your feelings?',
    options: [
      {
        action: 'GO_TO_ACTIVITY',
        id: 'yes',
        label: 'Yes',
      },
      {
        action: 'CANCEL',
        id: 'no',
        label: 'No',
      },
    ],
  },
})

const useLifesaverActions = (dispatch: React.Dispatch<reducerActionType>) => {
  // const [dispatcher, setDispatcher] = useState<React.Dispatch<reducerActionType>>()
  // useEffect(() => {
  //   setDispatcher(dispatch)
  // }, [dispatch])
  const API: APIType = {
    sayWelcome: () => {
      dispatch(getWelcomeMessage())
      setTimeout(() => {
        dispatch(getUrgeQuestionMessage())
      }, 2000)
    },
    userMessage: message => dispatch(getUserMessage(message)),
    handleUserAnswer: (eventType, optionLabel, optionId) => {
      dispatch({ type: eventType, payload: optionId })
      if (eventType === 'SET_USER_URGE') {
        API.userMessage(`${translate('screens.lifesaver.userAnswerUrge')} ${optionLabel.toLowerCase()}`)
        setTimeout(() => {
          API.askForPlace()
        }, 1000)
      }
      if (eventType === 'SET_USER_PLACE') {
        const connector = (locale => {
          if (locale === 'es') {
            switch (optionLabel) {
              case translate('screens.lifesaver.optionsPlaceWork'):
                return 'en el'
              case translate('screens.lifesaver.optionsPlaceHome'):
              case translate('screens.lifesaver.optionsPlaceOther'):
                return 'en'
              case 'Restaurant':
              case 'Car':
                return 'en un'
              default:
                return ''
            }
          } else {
            switch (optionLabel) {
              case 'Work':
              case 'Home':
                return 'at'
              case 'Restaurant':
                return 'in a'
              case 'Car':
                return 'on a'
              case 'Other place':
                return 'in'
              default:
                return ''
            }
          }
        })(getLocale())
        API.userMessage(
          `${translate('screens.lifesaver.userAnswerPlaceIAM')} ${connector} ${optionLabel.toLowerCase()}`,
        )
        setTimeout(() => {
          API.askForCompany()
        }, 1000)
      }
      if (eventType === 'SET_USER_COMPANY') {
        API.userMessage(`${translate('screens.lifesaver.userAnswerCompanyIAM')} ${optionLabel.toLowerCase()}`)
        setTimeout(() => {
          API.tellToPerformActivity()
        }, 1000)
      }
      if (eventType === 'CANCEL') {
        dispatch(getCancelMessage())
        setTimeout(() => {
          dispatch({ type: 'RESET_STATE', payload: null })
        }, 3000)
        setTimeout(() => {
          API.sayWelcome()
        }, 5000)
      }
    },
    askForPlace: () => dispatch(getPlaceQuestionMessage()),
    askForCompany: () => dispatch(getCompanyQuestionMessage()),
    tellFindingActivity: () => {
      dispatch(getFindingActivityMessage())
      dispatch({ type: 'SET_THINKING', payload: true })
    },
    tellToPerformActivity: () => {
      dispatch({ type: 'SET_THINKING', payload: false })
      dispatch(getActivityOptions())
    },
  }
  return API
}

export default useLifesaverActions
