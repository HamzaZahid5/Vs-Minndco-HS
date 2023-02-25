import React, { useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Subheading, Row, Paragraph, Button } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { CONGRATULATED_ON_QUIT_DATE, QUIT_DAY, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors'
import { translate } from '../localization'
import { RootStackParamList } from '../../../types'
import { userWasCongratulatedOnQuitDay } from '../../services/Firestore'

const PopupContent = ({ close }: { close: () => void }) => {
  const dispatch = useDispatch()
  return (
    <>
      <Row gutter={10}>
        <Subheading>{translate('screens.congratsOnQDPopUp.title')}</Subheading>
      </Row>
      <Row grow justifyContentOnGrow="flex-start" gutter={10}>
        <Paragraph size="medium" weight="normal" textAlign="left">
          {translate('screens.congratsOnQDPopUp.message')}
        </Paragraph>
      </Row>
      <Row gutter={10} grow justifyContentOnGrow="flex-end">
        <Button
          role="primary"
          compact
          onPress={() => {
            dispatch({ type: 'user/setCongratulatedOnQuitDay', payload: true })
            close()
          }}
        >
          {translate('screens.congratsOnQDPopUp.confirmButtonLabel')}
        </Button>
      </Row>
    </>
  )
}

const useCongratsQuitDayPopup = (navigation: StackNavigationProp<RootStackParamList>) => {
  const dispatch = useDispatch()
  const actualQuitDay = useSelector(QUIT_DAY)
  const [treatment_module, treatment_level] = useSelector(TREATMENT_MODULE_AND_LEVEL)
  const congratulatedOnQuitDate = useSelector(CONGRATULATED_ON_QUIT_DATE)
  let congrats = moment().diff(moment(actualQuitDay)) > 0 && !congratulatedOnQuitDate && treatment_module === 3

  useEffect(() => {
    if (congrats) {
      dispatch({ type: 'user/setCongratulatedOnQuitDay', payload: true })
      userWasCongratulatedOnQuitDay()
      navigation.navigate('BasicModal', {
        content: PopupContent,
      })
    }
  }, [navigation, dispatch, actualQuitDay, congratulatedOnQuitDate, treatment_module])
}

export default useCongratsQuitDayPopup
