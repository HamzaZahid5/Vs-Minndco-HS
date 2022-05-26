import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useStorageDownloadURL } from './../../services/Storage'
import env from '../../../env'
import { RootStackParamList, VR_SESSIONS_STATES_TYPE } from '../../../types'
import { useRef } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { translate } from '../localization'
const BASE_URL = `${env.webVrURL}`

export type VRPlayerCTAPropType = {
  resourceId: string
  onError: (error: string) => void
  onCancel: () => void
  onComplete: () => void
}

const useVRPlayerCTA = ({ resourceId, onCancel = Function, onComplete = Function }: VRPlayerCTAPropType) => {
  const assetUrl = useStorageDownloadURL(resourceId) || ''
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const onCompleteWithAnalytics = () => {
    // AnalyticEvent('video_end', { video_type: 'vr', video_id: resourceId })
    onComplete()
  }

  const openVRPlayerForWeb = async () => {
    const url = `https://${BASE_URL}/?video=${encodeURIComponent(assetUrl)}`
    // AnalyticEvent('video_start', { video_type: 'vr', video_id: resourceId })
    await (() =>
      // if user returns to this tab we consider the player as closed
      // thus, we resolve promise when visibility state returns to "visible"
      new Promise(res => {
        const resolve = res
        window.document.addEventListener('visibilitychange', ev => {
          if (document.visibilityState === 'visible') {
            resolve(true)
          }
        })
        window.open(url, '_blank')?.focus()
      }))()

    // by default, after interact with player we consider the activity as done
    onCompleteWithAnalytics()
  }

  const openInAppVRPlayer = () => {
    navigation.navigate('VRMet', {
      assetUrl,
      onCancel,
      onComplete: onCompleteWithAnalytics,
    })
  }

  const pleaseWaitAndTryAgain = () => alert(translate('commons.messages.gettingContents'))

  const openVRPlayer = Platform.OS === 'ios' || Platform.OS === 'android' ? openInAppVRPlayer : openVRPlayerForWeb

  return assetUrl ? openVRPlayer : pleaseWaitAndTryAgain
}
export default useVRPlayerCTA
