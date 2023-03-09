import React, { useEffect } from 'react'
import { Linking, Platform } from 'react-native'
import { Button, Paragraph, Row, Subheading } from '@mindcoxr/rob'
import { RootStackParamList } from '../../../types'
import { translate } from '../localization'
import { useDispatch, useSelector } from 'react-redux'
import { SHOW_NEED_UPDATE_APP } from '../../store/selectors'
import { StackNavigationProp } from '@react-navigation/stack'

const openStore = () => {
  if (Platform.OS === 'ios') {
    const link = 'itms-apps://apps.apple.com/us/app/mindcotine/id1506021271'
    Linking.canOpenURL(link)
      .then(supported => {
        supported && Linking.openURL(link)
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    const linkPlayStore = 'https://play.google.com/store/apps/details?id=com.habitfly.mindcotine&hl=es_419'
    Linking.canOpenURL(linkPlayStore)
      .then(supported => {
        supported && Linking.openURL(linkPlayStore)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const PopupContent = ({ close }: { close: () => Promise<void> }) => {
  return (
    <>
      <Row gutter={10}>
        <Subheading>{translate('screens.UpdateScreen.title')}</Subheading>
      </Row>
      <Row grow justifyContentOnGrow="flex-start" gutter={10}>
        <Paragraph size="medium" weight="normal" textAlign="left">
          {translate('screens.UpdateScreen.description')}
        </Paragraph>
      </Row>
      <Row gutter={10} grow justifyContentOnGrow="flex-end">
        <Button
          role="primary"
          compact
          onPress={async () => {
            await close()
            openStore()
          }}
        >
          {translate('screens.UpdateScreen.confirm')}
        </Button>
        <Button
          role="secondary"
          compact
          outline
          onPress={async () => {
            await close()
          }}
        >
          {translate('screens.UpdateScreen.later')}
        </Button>
      </Row>
    </>
  )
}

const useAppVersion = (navigation: StackNavigationProp<RootStackParamList>) => {
  const showNeedUpdateApp = useSelector(SHOW_NEED_UPDATE_APP)
  const dispatch = useDispatch()

  useEffect(() => {
    if (showNeedUpdateApp) {
      dispatch({ type: 'user/setShowNeedUpdate', payload: true })
      setTimeout(() => {
        navigation.navigate('BasicModal', {
          content: PopupContent,
        })
      }, 100)
    }
  }, [showNeedUpdateApp, navigation])
}

export default useAppVersion
