import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useNextActivity from '../../utils/hooks/useNextActivity'
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types'
import { USER_PROFILE } from '../../store/selectors'
import { formatAsset } from '../../utils/helpers'
import AudioScreen from '../ActivityScreen/AudioActivity'
import ReadScreen from '../ActivityScreen/Read'
import { View } from 'react-native'
import useActivityActions from '../../utils/hooks/useActivityActions'
import { useStorageDownloadURL } from '../../services/Storage'
import useVRPlayerCTA, { VRPlayerCTAPropType } from '../../utils/hooks/useVRPlayerCTA'
import { LifesaverAudioType, LifesaverDoType, LifesaverReadType } from '../../utils/playgroundActivities'

const ActivityScreen = ({
  navigation,
  route,
}: DefaultScreenPropType<'PlaygroundActivity'> & DefaultScreenRouteType<'PlaygroundActivity'>) => {
  const [activityScreen, setActivityScreen] = useState<React.ReactElement | undefined>(undefined)
  useEffect(() => {
    if (route.params.type) {
      switch (route.params.type) {
        case 'audio':
          const audParams = route.params as LifesaverAudioType
          setActivityScreen(
            <AudioScreen
              audioSrc={audParams.source}
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={() => {
                return
              }}
              onPlayPressed={() => {
                return
              }}
              title={route.params.title}
              description=""
              duration=""
            />,
          )
          break
        case 'text':
          const textParams = route.params as LifesaverReadType
          setActivityScreen(
            <ReadScreen
              title={textParams.title}
              readPages={textParams.pages}
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={() => {
                return
              }}
            />,
          )
          break
        case 'activity':
          const activityParams = route.params as LifesaverDoType
          setActivityScreen(activityParams.screen)
          break
        default:
          setActivityScreen(
            <ReadScreen
              title="Not Implemented"
              readPages={['Not implemented']}
              backImage="https://marylineg1.sg-host.com/blog/wp-content/uploads/2018/12/matterhorn-1313x875.jpg"
              onDonePressed={() => {
                return
              }}
            />,
          )
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params])

  /* 
  const handleActivityComplete = async (answer?: string) => {
    if (nextActivityKey) {
      saveActivityDone(nextActivityKey, answer)
      navigation.navigate('Main')
    }
  }
*/

  return activityScreen ? activityScreen : <View style={{ width: '100%', height: '100%' }} />
}

export default ActivityScreen
