import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Subheading, Row, Paragraph, Button } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import { FLAGS } from '../../store/selectors'
import { translate } from '../../utils/localization'
import { RootStackParamList } from '../../../types'

const PopupContent = ({ close }: { close: () => void }) => (
  <>
    <Row gutter={10}>
      <Subheading>{translate('screens.BasicsTutorial.finishTitle', { defaultValue: 'Well done!' })}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="flex-start" gutter={10}>
      <Paragraph size="xsmall" weight="normal" textAlign="left">
        {translate('screens.BasicsTutorial.finishDescription', {
          defaultValue:
            'Now you are ready to go by yourself. Do a daily routine of learning, practice and integrate in real life.\n Start changing your life now!!',
        })}
      </Paragraph>
    </Row>
    <Row>
      <Button onPress={close} round>
        {translate('commons.messages.close')}
      </Button>
    </Row>
  </>
)

const useTutorialFinished = (navigation: StackNavigationProp<RootStackParamList>) => {
  const dispatch = useDispatch()
  const { basicTutorialFinished } = useSelector(FLAGS)

  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      if (basicTutorialFinished) {
        navigation.navigate('BasicModal', {
          content: PopupContent,
        })
        dispatch({ type: 'flags/setShowBasicTutorialFinished', payload: false })
      }
    })

    return () => {
      unsubsFocus()
    }
  }, [navigation, dispatch, basicTutorialFinished])
}

export default useTutorialFinished
