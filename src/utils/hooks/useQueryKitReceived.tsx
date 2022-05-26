import { Button, Paragraph, Row, Subheading } from '@mindcoxr/rob'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootStackParamList } from '../../../types'
import { HAS_VIEWER, IS_PREMIUM, ONBOARDING_COMPLETE } from '../../store/selectors'
import { translate } from '../localization'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { activateKit } from '../../services/Firestore'

const NotRecivedContent = () => (
  <>
    <Row gutter={10}>
      <Subheading>{translate('screens.KitReceived.notReceivedTitle')}</Subheading>
    </Row>
    <Row grow justifyContentOnGrow="center" gutter={10}>
      <Paragraph size="xsmall" weight="normal" textAlign="center">
        {translate('screens.KitReceived.notReceivedSubTitle')}
      </Paragraph>
    </Row>
  </>
)
const MakePopupContent = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const PopupContent = () => {
    const [notReceived, setNotReceived] = useState(false)
    const popupHeightRef = useRef(0)
    return (
      <View
        onLayout={e => {
          if (popupHeightRef.current === 0) {
            popupHeightRef.current = e.nativeEvent.layout.height
          }
        }}
        style={{
          height: popupHeightRef.current === 0 ? undefined : popupHeightRef.current,
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        {notReceived ? (
          <NotRecivedContent />
        ) : (
          <>
            <Row gutter={10}>
              <Subheading>{translate('screens.KitReceived.title')}</Subheading>
            </Row>
            <Row grow justifyContentOnGrow="flex-start" gutter={10}>
              <Paragraph size="xsmall" weight="normal" textAlign="left">
                {translate('screens.KitReceived.subTitle')}{' '}
              </Paragraph>
            </Row>
            <Row gutter={10} grow justifyContentOnGrow="flex-end">
              <Button
                role="primary"
                onPress={() => {
                  activateKit()
                  navigation.navigate('KitWelcome')
                }}
              >
                {translate('screens.KitReceived.confirm')}
              </Button>
              <Button
                role="secondary"
                onPress={() => {
                  setNotReceived(true)
                }}
              >
                {translate('screens.KitReceived.cancel')}
              </Button>
            </Row>
          </>
        )}
      </View>
    )
  }
  return PopupContent
}
const useQueryKitReceived = (navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>) => {
  const isPremium = useSelector(IS_PREMIUM)
  const kitActivated = useSelector(HAS_VIEWER)
  const [lastQuery, setLastQuery] = useState<string | undefined>(undefined)
  const onboardingComplete = useSelector(ONBOARDING_COMPLETE)
  useEffect(() => {
    if (lastQuery === undefined || onboardingComplete === false) return
    let showQuery = true
    if (lastQuery !== '') {
      const actualDate = moment()
      const lastQueryDate = moment(lastQuery, 'YYYY-MM-DD')
      if (actualDate.isSame(lastQueryDate, 'date')) {
        showQuery = false
      }
    }
    if (!kitActivated && showQuery) {
      AsyncStorage.setItem('@lastQuery', moment().format('YYYY-MM-DD'))
      if (isPremium) {
        navigation.navigate('BasicModal', {
          content: MakePopupContent(navigation),
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastQuery])
  useEffect(() => {
    const getFromStorage = async () => {
      const data = await AsyncStorage.getItem('@lastQuery')
      if (data === null) {
        setLastQuery('')
      } else {
        setLastQuery(data)
      }
    }
    getFromStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useQueryKitReceived
