import React, { useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { Subheading, Row, Paragraph, Button } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { CONGRATULATED_ON_QUIT_DATE, PROGRESS, QUIT_DAY, TREATMENT_MODULE_AND_LEVEL } from '../../store/selectors'
import { translate } from '../localization'
import { RootStackParamList } from '../../../types'
import { userWasCongratulatedOnQuitDay } from '../../services/Firestore'
import { calculateProgressForQuitDayCongratulated } from '../helpers'

const PopupContent = ({ close }: { close: () => Promise<void> }) => {
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
          onPress={async () => {
            dispatch({ type: 'user/setCongratulatedOnQuitDay', payload: true })
            await close()
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
  const progress = useSelector(PROGRESS)
  const congrats =
    moment().format('YYYY-MM-DD') >= moment(actualQuitDay).format('YYYY-MM-DD') &&
    moment().diff(moment(actualQuitDay).format('YYYY-MM-DD')) &&
    !congratulatedOnQuitDate

  useEffect(() => {
    if (congrats && progress) {
      const [highestModule, highestLevelOnModule] = calculateProgressForQuitDayCongratulated(progress)
      dispatch({ type: 'user/setCongratulatedOnQuitDay', payload: true })
      userWasCongratulatedOnQuitDay(highestModule, highestLevelOnModule)
      setTimeout(() => {
        navigation.navigate('BasicModal', {
          content: PopupContent,
        })
      }, 100)
    }
  }, [navigation, dispatch, actualQuitDay, congratulatedOnQuitDate, treatment_module, congrats])
}

export default useCongratsQuitDayPopup
