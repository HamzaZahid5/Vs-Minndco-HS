import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useNextActivity from '../../utils/hooks/useNextActivity'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import { USER_PROFILE } from '../../store/selectors'
import { formatAsset } from '../../utils/helpers'
import VRScreen from './VRActivity'
import AudioScreen from './AudioActivity'
import VideoScreen from './VideoActivity'
import ReflectionScreen from './ReflectionActivity'
import { View } from 'react-native'
import useActivityActions from '../../utils/hooks/useActivityActions'
import useVRPlayerCTA, { VRPlayerCTAPropType } from '../../utils/hooks/useVRPlayerCTA'

const ActivityScreen = ({
  navigation,
  route,
}: DefaultScreenPropType<'Activity'> & DefaultScreenRouteType<'Activity'>) => {
  const { nextActivity, nextActivityKey } = useNextActivity(route.params?.activityId)
  const { language, gender } = useSelector(USER_PROFILE)
  const { saveActivityDone } = useActivityActions()
  const dispatch = useDispatch()

  const handleActivityComplete = async (answer?: string) => {
    if (nextActivityKey) {
      saveActivityDone(nextActivityKey, answer)
      navigation.navigate('Main')
    }
  } /*
  Not implemented yet
  useStartPath('daily_activity', false)
  */

  /*
  Zoho not implemented yet
  useEffect(() => {
    const nextActivityTyped = nextActivity as activityType
    if (IS.survey) {
      resetPathTo('Zoho', {
        onCancel: () => {
          navigation.goBack()
        },
        onComplete: handleActivityComplete,
        zohoUrl: ZOHO_SURVEYS[nextActivityTyped.asset].url,
        customData: ZOHO_SURVEYS[nextActivityTyped.asset].customData,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextActivity, IS])*/

  // HELPERS
  useEffect(() => {
    const unsubsFocus = navigation.addListener('focus', () => {
      // @todo trigger this conditionally only if it's needed
      dispatch({ type: 'flags/showProgramHelper', payload: false })
    })

    return () => {
      unsubsFocus()
    }
  }, [navigation, dispatch])

  const openVRPlayer = useVRPlayerCTA({
    resourceId:
      nextActivity && nextActivity.type === 'vr-met' ? formatAsset(nextActivity.asset, language, gender ?? 'f') : '',
    onCancel: () => {
      // eslint-disable-next-line no-console
      console.log('cancel')
      navigation.navigate('Main')
    },
    onComplete: () => {
      handleActivityComplete()
    },
  } as VRPlayerCTAPropType)

  let activityScreen: React.ReactElement | undefined
  if (nextActivity) {
    const asset = formatAsset(nextActivity.asset, language, gender ?? 'f')
    switch (nextActivity.type) {
      case '2d-video':
        activityScreen = (
          <VideoScreen
            onDonePressed={() => {
              handleActivityComplete()
            }}
            onPlayPressed={() => {
              return
            }}
            videoSrc={asset}
            title={nextActivity.name}
            description={nextActivity.description}
            duration={nextActivity.duration}
          />
        )
        break
      case 'audio':
        activityScreen = (
          <AudioScreen
            audioSrc={asset}
            backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
            onDonePressed={() => {
              handleActivityComplete()
            }}
            onPlayPressed={() => {
              return
            }}
            title={nextActivity.name}
            description={nextActivity.description}
            duration={nextActivity.duration}
          />
        )
        break
      case 'vr-met':
        activityScreen = (
          <VRScreen
            backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
            onDonePressed={() => {
              handleActivityComplete()
            }}
            onPlayPressed={() => {
              openVRPlayer()
              return
            }}
            title={nextActivity.name}
            description={nextActivity.description}
            duration={nextActivity.duration}
          />
        )
        break
      case 'reflection':
        activityScreen = (
          <ReflectionScreen
            backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
            onDonePressed={answer => {
              handleActivityComplete(answer)
            }}
            asset={asset}
            title={nextActivity.name}
            description={nextActivity.description}
            duration={nextActivity.duration}
          />
        )
        break
      default:
        activityScreen = (
          <AudioScreen
            audioSrc="https://firebasestorage.googleapis.com/v0/b/mindco-relief-dev.appspot.com/o/contents%2F01_audio_mountain_EN.mp3?alt=media&token=4cbf61bb-3d5a-479b-ade5-cf3ca7ca7f5a"
            backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
            onDonePressed={() => {
              handleActivityComplete()
            }}
            onPlayPressed={() => {
              return
            }}
            title={nextActivity.name}
            description={nextActivity.description}
            duration={nextActivity.duration}
          />
        )
        break
    }
  }
  return activityScreen ? activityScreen : <View style={{ width: '100%', height: '100%' }} />
}

export default ActivityScreen
