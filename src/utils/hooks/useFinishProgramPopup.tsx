import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Subheading, Row, Paragraph, Button } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { SHOW_FINISH_PROGRAM } from '../../store/selectors'
import { translate } from '../localization'
import { RootStackParamList } from '../../../types'
import { userWasCongratulatedOnQuitDay } from '../../services/Firestore'
import useNextActivity from './useNextActivity'

const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const PopupContent = ({ close }: { close: () => Promise<void> }) => {
    const dispatch = useDispatch()
    return (
      <>
        <Row gutter={10}>
          <Subheading>{translate('screens.congratsEndProgramPopUp.title')}</Subheading>
        </Row>
        <Row grow justifyContentOnGrow="flex-start" gutter={10}>
          <Paragraph size="medium" weight="normal" textAlign="left">
            {translate('screens.congratsEndProgramPopUp.message')}
          </Paragraph>
        </Row>
        <Row gutter={10} grow justifyContentOnGrow="flex-end">
          <Button
            role="primary"
            compact
            onPress={async () => {
              dispatch({ type: 'user/finishProgramPopup', payload: false })
              await close()
              navigation.navigate('Messages')
            }}
          >
            {translate('screens.congratsEndProgramPopUp.confirmButtonLabel')}
          </Button>
        </Row>
      </>
    )
  }
  return PopupContent
}

const useFinishProgramPopup = (navigation: StackNavigationProp<RootStackParamList>) => {
  const dispatch = useDispatch()
  const { isLastActivity } = useNextActivity()
  const showFinishProgramPopup = useSelector(SHOW_FINISH_PROGRAM)

  useEffect(() => {
    if (isLastActivity && showFinishProgramPopup) {
      dispatch({ type: 'user/finishProgramPopup', payload: false })
      setTimeout(() => {
        navigation.navigate('BasicModal', {
          content: MakePopupContent(navigation),
        })
      }, 100)
    }
  }, [navigation, dispatch, isLastActivity, showFinishProgramPopup])
}

export default useFinishProgramPopup
