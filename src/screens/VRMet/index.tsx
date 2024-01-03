import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { useTheme } from 'react-native-paper'
import { useKeepAwake } from 'expo-keep-awake'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import { getLocale, translate } from '../../utils/localization'
import env from '../../../env'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getRealHeight, getRealWidth } from '../../utils/helpers'
import { deviceInch } from 'react-native-utils-scale'
import RotateInstriction from './RotateInstructions'
import { Subheading } from '@mindcoxr/rob'
const BASE_URL = `${env.webVrURL}`

const getMessageEventsHandler =
  (webViewRef: MutableRefObject<WebView | null>, onCancel: () => void, onComplete: () => void, resourceId: string) =>
  (event: WebViewMessageEvent) => {
    // @TODO we need to trigger this event from player
    if (event.nativeEvent.data === 'Video:ready') {
      // AnalyticEvent('video_start', { video_type: 'vr', video_id: resourceId })
    }
    if (event.nativeEvent.data === 'Video:ended') {
      onComplete()
    }
    if (event.nativeEvent.data === 'Video:canceled') {
      onCancel()
    }
  }

const VRPlayer = ({ route, navigation }: DefaultScreenRouteType<'VRMet'> & DefaultScreenPropType<'VRMet'>) => {
  const { assetUrl, onComplete = Function, onCancel = Function, useUrl = false } = route.params || {}
  const theme = useTheme()
  useKeepAwake()
  const webViewRef = useRef<WebView | null>(null)
  const dimensions = useWindowDimensions()
  const [isRotated, setIsRotated] = useState(false)
  const withInCM = getRealWidth(deviceInch, dimensions.width, dimensions.height)
  const heightInCM = getRealHeight(deviceInch, dimensions.width, dimensions.height)
  const landscapeWidth = Math.max(withInCM, heightInCM) / 100
  const landscapeHeight = Math.min(withInCM, heightInCM) / 100
  const uri = useUrl
    ? `https://${BASE_URL}/${assetUrl}?lang=${getLocale()}&widthMeters=${landscapeWidth}&heightMeters=${landscapeHeight}`
    : `https://${BASE_URL}/?lang=${getLocale()}&video=${encodeURIComponent(
        assetUrl,
      )}&widthMeters=${landscapeWidth}&heightMeters=${landscapeHeight}`

  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      Orientation.unlockAllOrientations()
    })
    const unsubsBlur = navigation.addListener('blur', () => {
      Orientation.lockToPortrait()
    })

    return () => {
      unsubsFocus()
      unsubsBlur()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (dimensions.width > dimensions.height && !isRotated) {
      Orientation.lockToLandscape()
      setIsRotated(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions, isRotated])

  console.log({ dimensions })
  console.log({ isRotated })

  return (
    <SafeAreaView style={styles.container}>
      {isRotated ? (
        <WebView
          ref={webViewRef}
          source={{
            uri,
          }}
          allowsInlineMediaPlayback
          // @ts-ignore: package bad type
          ignoreSilentHardwareSwitch
          onMessage={getMessageEventsHandler(webViewRef, onCancel, onComplete, assetUrl)}
          style={{
            backgroundColor: theme.colors.primary,
            marginHorizontal: 0,
            marginVertical: 0,
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#fcfcfc',
            paddingHorizontal: 15,
            height: dimensions.height,
          }}
        >
          <Subheading textAlign="center">
            {translate('screens.VRMet.rotate-device', { defaultValue: 'Pleace rotate your phone' })}
          </Subheading>
          <View style={{ height: 350 }}>
            <RotateInstriction />
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

VRPlayer.propTypes = {
  route: PropTypes.object,
}

export default VRPlayer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'black',
  },
})
