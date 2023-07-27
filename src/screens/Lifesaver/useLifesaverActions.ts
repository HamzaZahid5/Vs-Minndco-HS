import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { translate } from '../../utils/localization'
import { RootStackParamList } from '../../../types'
import { StackNavigationProp } from '@react-navigation/stack'
import { reducerActionType } from './storage'
import { LIFESAVER_URGE, LIFESAVER_PLACES, LIFESAVER_COMPANY } from './constants'
import { getLocale } from './../../utils/localization'

type APIType = {
  sayWelcome: () => void
  handleUserAnswer: (eventType: string, optionLabel: string, optionId: string) => void
  userMessage: (message: string) => void
  askForPlace: () => void
  // askForCompany: () => void
  // tellToPerformActivity: () => void
}

const getWelcomeMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: 'coach',
    text: translate('screens.Lifesaver.coachMsgHello', { defaultValue: 'Hola tarola' }),
  },
})

const getCancelMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: 'bd7acbea-c1b1-46c2-aed5-34563456d',
    user: 'coach',
    text: translate('screens.Lifesaver.cancelMessage', { defaultValue: 'No me acuerdo que iba aca' }),
  },
})

const getUrgeQuestionMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    user: 'coach',
    text: translate('screens.Lifesaver.coachMsgUrgeQuestion'),
    options: [
      {
        action: 'SET_USER_URGE',
        id: LIFESAVER_URGE.LOW,
        label: translate('screens.Lifesaver.optionsUrgeLow'),
      },
      {
        action: 'SET_USER_URGE',
        id: LIFESAVER_URGE.MANAGEABLE,
        label: translate('screens.Lifesaver.optionsUrgeManageable'),
      },
      {
        action: 'SET_USER_URGE',
        id: LIFESAVER_URGE.INTENSE,
        label: translate('screens.Lifesaver.optionsUrgeIntense'),
      },
    ],
  },
})

const getPlaceQuestionMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac63afc-c605-43d3-a4f3-fbd91aa97f63',
    user: 'coach',
    text: translate('screens.Lifesaver.coachMsgPlaceQuestion'),
    options: [
      {
        action: 'GO_TO_ACTIVITY',
        id: LIFESAVER_PLACES.HOME,
        label: translate('screens.Lifesaver.optionsPlaceHome'),
      },
      {
        action: 'GO_TO_ACTIVITY',
        id: LIFESAVER_PLACES.WORK,
        label: translate('screens.Lifesaver.optionsPlaceWork'),
      },
      {
        action: 'GO_TO_ACTIVITY',
        id: LIFESAVER_PLACES.STREET,
        label: translate('screens.Lifesaver.optionsPlaceWalking'),
      },
      {
        action: 'GO_TO_ACTIVITY',
        id: LIFESAVER_PLACES.OTHER,
        label: translate('screens.Lifesaver.optionsPlaceOther'),
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
// const getCompanyQuestionMessage = () => ({
//   type: 'PUSH_MESSAGE',
//   payload: {
//     id: '3ac69afc-c605-49d9-a4f9-fbd91aa97f63',
//     user: 'coach',
//     text: translate('screens.Lifesaver.coachMsgCompanyQuestion'),
//     options: [
//       {
//         action: 'SET_USER_COMPANY',
//         id: LIFESAVER_COMPANY.ALONE,
//         label: translate('screens.Lifesaver.optionsCompanyAlone'),
//       },
//       {
//         action: 'SET_USER_COMPANY',
//         id: LIFESAVER_COMPANY.SOMEONE,
//         label: translate('screens.Lifesaver.optionsCompanySomeone'),
//       },
//     ],
//   },
// })
const getFindingActivityMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac65afc-c605-45d5-a4f5-fbd51aa57f63',
    user: 'coach',
    text: translate('screens.Lifesaver.coachMsgFindingActivity'),
  },
})
const getRejectionMessage = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac65afc-c605-45d5-a4f5-fbd51aa57f65',
    user: 'coach',
    text: translate('screens.Lifesaver.coachMsgRejectActivity', {
      defaultValue:
        "Ok, next time maybe. Remember you can come here any time you want to record a stress episode. I'm here to help!",
    }),
  },
})
const getActivityOptions = () => ({
  type: 'PUSH_MESSAGE',
  payload: {
    id: '3ac60afc-c600-40d0-a4f0-fbd01aa07f63',
    user: 'coach',
    text: translate('screens.Lifesaver.coachMsgOfferActivity'),
    options: [
      {
        action: 'GO_TO_ACTIVITY',
        id: 'yes',
        label: translate('commons.general.yes'),
      },
      {
        action: 'CANCEL',
        id: 'no',
        label: translate('commons.general.no'),
      },
    ],
  },
})

const useLifesaverActions = (dispatch: React.Dispatch<reducerActionType>) => {
  // ================================
  // Safe mechanism to clear timeouts when user leves the screen and no pending messages shows on background.
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const tId = useRef<NodeJS.Timeout>()
  useEffect(() => {
    const unsubsBlur = navigation.addListener('blur', () => {
      if (tId.current) {
        clearTimeout(tId.current)
      }
    })
    return () => {
      unsubsBlur()
    }
  }, [navigation])
  // ================================

  const API: APIType = {
    sayWelcome: () => {
      dispatch(getWelcomeMessage())
      tId.current = setTimeout(() => {
        dispatch(getUrgeQuestionMessage())
      }, 2000)
    },
    userMessage: message => dispatch(getUserMessage(message)),
    handleUserAnswer: (eventType, optionLabel, optionId) => {
      dispatch({ type: eventType, payload: optionId })
      if (eventType === 'SET_USER_URGE') {
        API.userMessage(`${translate('screens.Lifesaver.userAnswerUrge')} ${optionLabel.toLowerCase()}`)
        tId.current = setTimeout(() => {
          API.askForPlace()
        }, 1000)
      }
      if (eventType === 'SET_USER_PLACE') {
        const connector = (locale => {
          if (locale === 'es') {
            switch (optionLabel) {
              case translate('screens.Lifesaver.optionsPlaceWork'):
                return 'en el'
              case translate('screens.Lifesaver.optionsPlaceHome'):
              case translate('screens.Lifesaver.optionsPlaceOther'):
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
          `${translate('screens.Lifesaver.userAnswerPlaceIAM')} ${connector} ${optionLabel.toLowerCase()}`,
        )
        // tId.current = setTimeout(() => {
        //   dispatch(getActivityOptions())
        // }, 1000)
      }
      // if (eventType === 'SET_USER_COMPANY') {
      //   API.userMessage(`${translate('screens.Lifesaver.userAnswerCompanyIAM')} ${optionLabel.toLowerCase()}`)
      //   tId.current = setTimeout(() => {
      //     API.tellToPerformActivity()
      //   }, 1000)
      // }
      // if (eventType === 'CANCEL') {
      //   API.userMessage(translate('commons.general.no', { defaultValue: 'No' }))
      //   tId.current = setTimeout(() => {
      //     dispatch(getRejectionMessage())
      //   }, 1000)
      // }
    },
    askForPlace: () => dispatch(getPlaceQuestionMessage()),
    // askForCompany: () => dispatch(getCompanyQuestionMessage()),
    // tellToPerformActivity: () => {
    //   dispatch({ type: 'SET_THINKING', payload: false })
    //   dispatch(getActivityOptions())
    // },
  }
  return API
}

export default useLifesaverActions
